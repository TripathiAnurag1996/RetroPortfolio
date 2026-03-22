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

// Smart Deduplication: Per-event-type + label timestamp guard
const eventDebounceMap = new Map<string, number>();
const DEBOUNCE_MS = 1000;

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

  try {
    const payload = {
      page_path: url,
      env: import.meta.env.MODE,
      user_type: currentUserContext.user_type,
      session_id: SESSION_ID,
      event_version: 'v1',
    };

    if (IS_DEBUG) {
      console.log(`[GA4] Pageview tracked: ${url}`, payload);
    }

    if (typeof window !== 'undefined') {
      if ((window as any).gtag) {
        if (IS_PROD) {
          (window as any).gtag('config', GA_TRACKING_ID, payload);
        }
      } else if (IS_DEBUG) {
        console.warn('[GA4] gtag not available for pageview');
      }
    }
  } catch (err) {
    if (IS_DEBUG) console.error('[GA4] Pageview tracking failed', err);
  }
};

/**
 * Track a custom event with automatic context and smart deduplication
 */
export const event = (
  action: string,
  { category, label, value, source, ...rest }: {
    category: 'navigation' | 'engagement' | 'ai' | 'portfolio' | 'system';
    label: string;
    value?: number;
    source?: string;
    [key: string]: any;
  }
) => {
  if (!GA_TRACKING_ID) return;

  try {
    // Smart Deduplication Guard (Per action + label)
    const debounceKey = `${action}_${label}`;
    const now = Date.now();
    const lastTime = eventDebounceMap.get(debounceKey) || 0;
    
    if (now - lastTime < DEBOUNCE_MS) {
      if (IS_DEBUG) {
        console.log(`[GA4] Event debounced: ${action} (${label})`);
      }
      return;
    }
    
    eventDebounceMap.set(debounceKey, now);

    const payload = {
      event_category: category,
      event_label: label,
      value: value,
      source: source,
      env: import.meta.env.MODE,
      user_type: currentUserContext.user_type,
      session_id: SESSION_ID,
      event_version: 'v1',
      ...rest,
    };

    if (IS_DEBUG) {
      console.log(`[GA4] Event tracked: ${action}`, payload);
    }

    if (typeof window !== 'undefined') {
      if ((window as any).gtag) {
        if (IS_PROD) {
          (window as any).gtag('event', action, payload);
        }
      } else if (IS_DEBUG) {
        console.warn(`[GA4] gtag not available for event: ${action}`);
      }
    }
  } catch (err) {
    if (IS_DEBUG) console.error('[GA4] Event tracking failed', err);
  }
};

/**
 * Track technical errors
 */
export const trackError = (message: string, type = 'runtime_error', fatal = false) => {
  event('error_occurred', { 
    category: 'system', 
    label: type,
    error_message: message,
    location: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
    fatal 
  });
};
