/**
 * Microsoft Clarity Safe Tracking & Queue Helper
 *
 * Utilizes the window.clarity queue shim defined in index.html.
 * Calls can be safely made before or after the remote script loads.
 */

declare global {
  interface Window {
    clarity?: (action: string, ...args: any[]) => void;
  }
}

/**
 * Safely send a custom event to Microsoft Clarity
 */
export const trackClarityEvent = (eventName: string, value?: string) => {
  if (typeof window !== 'undefined') {
    window.clarity = window.clarity || function() {
      (window.clarity as any).q = (window.clarity as any).q || [];
      (window.clarity as any).q.push(arguments);
    };

    if (value !== undefined) {
      window.clarity('event', eventName, value);
    } else {
      window.clarity('event', eventName);
    }
  }
};

/**
 * Safely set Clarity custom dimension / session tags (e.g. active window)
 */
export const setClarityTag = (key: string, value: string) => {
  if (typeof window !== 'undefined') {
    window.clarity = window.clarity || function() {
      (window.clarity as any).q = (window.clarity as any).q || [];
      (window.clarity as any).q.push(arguments);
    };
    window.clarity('set', key, value);
  }
};
