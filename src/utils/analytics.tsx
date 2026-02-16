// Google Analytics 4 Utility

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initGA = () => {
  if (typeof window === 'undefined') return;

  // Check for cookie consent (placeholder logic)
  const consent = localStorage.getItem('cookie-consent');
  if (consent !== 'accepted') {
    console.log('GA4: Waiting for cookie consent');
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  const win = window as any;
  win.dataLayer = win.dataLayer || [];
  function gtag(...args: any[]) {
    win.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
};

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
