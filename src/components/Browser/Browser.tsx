import React, { useState, useRef } from 'react';
import styles from './Browser.module.css';

const Browser: React.FC = () => {
  const [url, setUrl] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    // Simple URL validation/formatting
    let formattedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      formattedUrl = `https://${url}`;
    }
    
    setCurrentUrl(formattedUrl);
    setIsLoading(true);
  };

  const handleReload = () => {
    if (currentUrl) {
      // Small trick to force reload iframe
      const tempUrl = currentUrl;
      setCurrentUrl('');
      setTimeout(() => setCurrentUrl(tempUrl), 10);
    }
  };

  return (
    <div className={styles.browserContainer}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <button className={styles.navButton} title="Back" disabled>
          &#9664;
        </button>
        <button className={styles.navButton} title="Forward" disabled>
          &#9654;
        </button>
        <button className={styles.navButton} onClick={handleReload} title="Reload" disabled={!currentUrl}>
          &#8635;
        </button>
        
        <form className={styles.addressBarWrapper} onSubmit={handleNavigate}>
          <input 
            type="text" 
            className={styles.addressInput}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to browse..."
          />
        </form>
      </div>

      {/* Main Content Area */}
      <div className={styles.contentArea}>
        {currentUrl ? (
          <iframe
            ref={iframeRef}
            src={currentUrl}
            className={styles.iframe}
            onLoad={() => setIsLoading(false)}
            title="Sandboxed Browser"
            /* 
               Strict sandboxing:
               - allow-scripts: allow the page to run JS
               - allow-same-origin: allow the page to maintain its origin (needed for many sites)
               - allow-forms: allow form submission
               - allow-popups: (Omitted as per request)
               - allow-downloads: (Omitted as per request)
            */
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        ) : (
          <div className={styles.placeholder}>
            <div className={styles.placeholderIcon}>&#127760;</div>
            <div className={styles.placeholderText}>No page loaded.</div>
            <div className={styles.placeholderSubtext}>Enter a URL or let the system open one.</div>
          </div>
        )}
        
        {isLoading && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: '#000080',
            animation: 'loadingProgress 2s infinite linear'
          }} />
        )}
      </div>
      
      <style >{`
        @keyframes loadingProgress {
          0% { left: -40%; width: 40%; }
          100% { left: 100%; width: 40%; }
        }
      `}</style>
    </div>
  );
};

export default Browser;
