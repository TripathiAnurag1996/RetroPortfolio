import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import * as gtag from '../lib/gtag';

const GoogleAnalytics = () => {
  const location = useLocation();
  const lastPathname = useRef<string | null>(null);
  const scriptInjected = useRef(false);

  const initGA4 = () => {
    const GA_ID = gtag.GA_TRACKING_ID;

    if (!GA_ID) return;

    const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA_ID}"]`);
    
    if (!scriptInjected.current && !existingScript) {
      const consent = localStorage.getItem('cookie-consent');
      const isGranted = consent === 'accepted';

      // 1. Consent Mode v2 Default Configuration (Analytics denied by default unless explicitly accepted)
      const inlineScript = document.createElement('script');
      inlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'default', {
          'analytics_storage': '${isGranted ? 'granted' : 'denied'}',
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied'
        });
        gtag('js', new Date());
        gtag('config', '${GA_ID}', {
          page_path: window.location.pathname,
        });
      `;
      document.head.appendChild(inlineScript);

      // 2. Inject Google Tag Script
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      script.async = true;
      document.head.appendChild(script);
      
      scriptInjected.current = true;
      
      if (gtag.IS_DEBUG) {
        console.log(`[GA4] Analytics tag initialized with analytics_storage: ${isGranted ? 'granted' : 'denied'}`);
      }
    }
  };

  useEffect(() => {
    initGA4();

    const handleConsentGranted = () => {
      gtag.updateConsent(true);
    };

    const handleConsentDeclined = () => {
      gtag.updateConsent(false);
    };

    window.addEventListener('cookieConsentGranted', handleConsentGranted);
    window.addEventListener('cookieConsentDeclined', handleConsentDeclined);

    return () => {
      window.removeEventListener('cookieConsentGranted', handleConsentGranted);
      window.removeEventListener('cookieConsentDeclined', handleConsentDeclined);
    };
  }, []);

  useEffect(() => {
    // Track Pageviews on Route Change (excluding initial mount which is handled by gtag('config'))
    if (lastPathname.current !== null && location.pathname !== lastPathname.current) {
      gtag.pageview(location.pathname);
    }
    lastPathname.current = location.pathname;
  }, [location.pathname]);

  return null;
};

export default GoogleAnalytics;
