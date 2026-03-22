import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import * as gtag from '../lib/gtag';

const GoogleAnalytics = () => {
  const location = useLocation();
  const lastPathname = useRef<string | null>(null);
  const scriptInjected = useRef(false);

  useEffect(() => {
    const GA_ID = gtag.GA_TRACKING_ID;

    if (!GA_ID) return;

    // 1. Inject Script (Only Once)
    const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA_ID}"]`);
    
    if (!scriptInjected.current && !existingScript) {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      script.async = true;
      document.head.appendChild(script);

      const inlineScript = document.createElement('script');
      inlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}', {
          page_path: window.location.pathname,
        });
      `;
      document.head.appendChild(inlineScript);
      
      scriptInjected.current = true;
      
      if (gtag.IS_DEBUG) {
        console.log('[GA4] Analytics initialized');
      }
    }
  }, []);

  useEffect(() => {
    // 2. Track Pageviews on Route Change (Strict Mode & Duplicate Prevention)
    if (location.pathname !== lastPathname.current) {
      gtag.pageview(location.pathname);
      lastPathname.current = location.pathname;
    }
  }, [location.pathname]);

  return null;
};

export default GoogleAnalytics;
