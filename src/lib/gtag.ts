export const GA_TRACKING_ID = import.meta.env.VITE_GA_ID;
export const IS_PROD = import.meta.env.MODE === 'production';
export const IS_DEBUG = import.meta.env.VITE_GA_DEBUG === 'true' || import.meta.env.DEV;

// Simple random ID generator (UUID fallback)
const generateId = () => {
  try {
    return crypto.randomUUID();
  } catch {
    return Math.random().toString(36).substring(2, 15);
  }
};

// Persistent session context
export const SESSION_ID = typeof window !== 'undefined' 
  ? (sessionStorage.getItem('ga_session_id') || (() => {
      const id = generateId();
      sessionStorage.setItem('ga_session_id', id);
      return id;
    })())
  : '';

type UserContext = {
  user_id?: string;
  user_type: 'guest' | 'logged_in';
};

// Default user context
let currentUserContext: UserContext = {
  user_type: 'guest',
};

// Funnel state (volatile, per-instance)
let applyStartedTime: number | null = null;

/**
 * Update user context (e.g. after login/logout)
 */
export const setUserContext = (context: Partial<UserContext>) => {
  currentUserContext = { ...currentUserContext, ...context };
  
  if (typeof window !== 'undefined' && (window as any).gtag && GA_TRACKING_ID) {
    (window as any).gtag('set', 'user_properties', {
      user_id: currentUserContext.user_id,
      user_type: currentUserContext.user_type,
      session_id: SESSION_ID,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (!GA_TRACKING_ID) return;

  const payload = {
    page_path: url,
    env: import.meta.env.MODE,
    user_type: currentUserContext.user_type,
    session_id: SESSION_ID,
  };

  if (IS_DEBUG) {
    console.log(`[GA4] Pageview tracked: ${url}`, payload);
  }

  if (typeof window !== 'undefined' && (window as any).gtag) {
    if (IS_PROD) {
      (window as any).gtag('config', GA_TRACKING_ID, payload);
    }
  } else if (import.meta.env.DEV) {
    console.warn('[GA4] gtag is not defined. Possible ad-blocker?');
  }
};

/**
 * Track a custom event with automatic context
 */
export const event = (
  action: string,
  { category, label, value, ...rest }: {
    category?: string;
    label?: string;
    value?: number;
    [key: string]: any;
  } = {}
) => {
  if (!GA_TRACKING_ID) return;

  const payload = {
    event_category: category,
    event_label: label,
    value: value,
    env: import.meta.env.MODE,
    user_type: currentUserContext.user_type,
    session_id: SESSION_ID,
    ...rest,
  };

  if (IS_DEBUG) {
    console.log(`[GA4] Event tracked: ${action}`, payload);
  }

  if (typeof window !== 'undefined' && (window as any).gtag) {
    if (IS_PROD) {
      (window as any).gtag('event', action, payload);
    }
  }
};

// --- Funnel & Attribution Event Helpers ---

type AttributionProps = {
  job_id: string;
  job_title: string;
  source: 'linkedin' | 'platform' | 'manual' | string;
};

/**
 * 1. User clicks the apply button (Funnel Start)
 */
export const trackApplyClicked = ({ job_id, job_title, source }: AttributionProps) => {
  event('apply_clicked', { 
    category: 'conversions', 
    label: job_title,
    job_id,
    source
  });
};

/**
 * 2. User starts filling out the application form (Funnel Step)
 */
export const trackApplyStarted = ({ job_id, job_title, source }: AttributionProps) => {
  applyStartedTime = Date.now();
  event('apply_started', { 
    category: 'conversions', 
    label: job_title,
    job_id,
    source
  });
};

/**
 * 3. User successfully completes the application (Conversion)
 */
export const trackApplyCompleted = ({ job_id, job_title, source }: AttributionProps) => {
  const timeToApply = applyStartedTime ? Math.round((Date.now() - applyStartedTime) / 1000) : undefined;
  
  event('apply_completed', { 
    category: 'conversions', 
    label: job_title,
    job_id,
    source,
    time_to_apply: timeToApply // value in seconds
  });
};

export const trackResumeUploaded = (fileName: string) => {
  event('resume_uploaded', { category: 'conversions', label: fileName });
};

export const trackAutofillTriggered = (formId: string) => {
  event('autofill_triggered', { category: 'productivity', label: formId });
};

/**
 * Track technical errors with funnel context
 */
export const trackError = (message: string, type = 'runtime_error', step?: string, fatal = false) => {
  event('error_occurred', { 
    category: 'system', 
    error_message: message,
    error_type: type,
    funnel_step: step,
    location: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
    fatal 
  });
};
