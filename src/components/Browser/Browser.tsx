import React, { useState, useEffect } from 'react';
import styles from './Browser.module.css';
import BrowserHome from './pages/BrowserHome';
import PromptiveSentry from './pages/PromptiveSentry';
import PromptiveSentryIDE from './pages/PromptiveSentryIDE';

declare const clarity: (action: string, key?: string, value?: string) => void;
import Piqque from './pages/Piqque';

interface Tab {
  id: string;
  title: string;
  url: string;
  currentUrl: string;
  isLoading: boolean;
  history: string[];
}

const DEFAULT_TABS: Tab[] = [
  {
    id: 'tab-1',
    title: 'Home',
    url: 'anurag-os://home',
    currentUrl: 'anurag-os://home',
    isLoading: false,
    history: [],
  },
  {
    id: 'tab-2',
    title: 'Promptive Sentry',
    url: 'anurag-os://promptive-sentry',
    currentUrl: 'anurag-os://promptive-sentry',
    isLoading: false,
    history: [],
  },
  {
    id: 'tab-3',
    title: 'Promptive Sentry IDE',
    url: 'anurag-os://promptive-sentry-ide',
    currentUrl: 'anurag-os://promptive-sentry-ide',
    isLoading: false,
    history: [],
  }
];

const Browser: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>(DEFAULT_TABS);
  const [activeTabId, setActiveTabId] = useState<string>(DEFAULT_TABS[0].id);

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  useEffect(() => {
    const handleBrowserNavigate = (e: CustomEvent) => {
      const targetUrl = e.detail;
      if (typeof targetUrl === 'string') {
        setTabs(prev => prev.map(t => {
          if (t.id === activeTabId) {
            return {
              ...t,
              history: [...t.history, t.currentUrl].filter(Boolean),
              url: targetUrl,
              currentUrl: targetUrl,
              isLoading: !targetUrl.startsWith('anurag-os://'),
            };
          }
          return t;
        }));
      }
    };
    
    window.addEventListener('browser-navigate', handleBrowserNavigate as EventListener);
    return () => window.removeEventListener('browser-navigate', handleBrowserNavigate as EventListener);
  }, [activeTabId]);

  const updateActiveTab = (updates: Partial<Tab>) => {
    setTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, ...updates } : t));
  };

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTab || !activeTab.url) return;
    
    let formattedUrl = activeTab.url;
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://') && !formattedUrl.startsWith('anurag-os://')) {
      formattedUrl = `https://${formattedUrl}`;
    }
    
    const newHistory = [...activeTab.history];
    if (activeTab.currentUrl) {
      newHistory.push(activeTab.currentUrl);
    }
    
    updateActiveTab({ currentUrl: formattedUrl, history: newHistory, isLoading: !formattedUrl.startsWith('anurag-os://') });
  };

  const handleBack = () => {
    if (!activeTab || !activeTab.history || activeTab.history.length === 0) return;
    const previousUrl = activeTab.history[activeTab.history.length - 1];
    updateActiveTab({
      url: previousUrl,
      currentUrl: previousUrl,
      history: activeTab.history.slice(0, -1),
      isLoading: !previousUrl.startsWith('anurag-os://')
    });
  };

  const handleReload = () => {
    if (activeTab && activeTab.currentUrl) {
      const tempUrl = activeTab.currentUrl;
      updateActiveTab({ currentUrl: '' });
      setTimeout(() => updateActiveTab({ currentUrl: tempUrl, isLoading: true }), 10);
    }
  };

  const handleUrlChange = (newUrl: string) => {
    updateActiveTab({ url: newUrl });
  };

  const handleAddNewTab = () => {
    const newId = `tab-${Date.now()}`;
    setTabs(prev => [...prev, {
      id: newId,
      title: 'New Tab',
      url: 'anurag-os://home',
      currentUrl: 'anurag-os://home',
      isLoading: false,
      history: []
    }]);
    setActiveTabId(newId);
  };

  const handleCloseTab = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setTabs(prev => {
      const filtered = prev.filter(t => t.id !== id);
      if (filtered.length === 0) {
        // Create an empty tab if closing the last one
        const newId = `tab-${Date.now()}`;
        setActiveTabId(newId);
        return [{ id: newId, title: 'New Tab', url: 'anurag-os://home', currentUrl: 'anurag-os://home', isLoading: false, history: [] }];
      }
      if (activeTabId === id) {
        // If closing the active tab, switch to the last available one
        setActiveTabId(filtered[filtered.length - 1].id);
      }
      return filtered;
    });
  };

  const isEmbeddable = (url: string) => {
    if (url.startsWith('anurag-os://')) return true;
    try {
      const urlObj = new URL(url);
      const blockedDomains = [
        'chromewebstore.google.com',
        'open-vsx.org',
        'github.com',
        'linkedin.com',
        'x.com',
        'twitter.com',
        'google.com'
      ];
      return !blockedDomains.some(domain => urlObj.hostname.includes(domain));
    } catch {
      return true;
    }
  };

  const getExternalUrl = (url: string): string | null => {
    if (!url.startsWith('anurag-os://')) return url;
    if (url === 'anurag-os://promptive-sentry') return 'https://chromewebstore.google.com/detail/promptive-sentry/ikbkijdgnelcijmdkcaaoabmobagakim';
    if (url === 'anurag-os://promptive-sentry-ide') return 'https://open-vsx.org/extension/xenriq/promptive-sentry-ide/';
    if (url === 'anurag-os://piqque') return 'https://www.linkedin.com/in/anuragtripathi-pm/';
    return null;
  };

  return (
    <div className={styles.browserContainer}>
      {/* Tab Bar */}
      <div className={styles.tabBar}>
        {tabs.map((tab) => (
          <div 
            key={tab.id}
            className={`${styles.tab} ${tab.id === activeTabId ? styles.tabActive : styles.tabInactive}`}
            onClick={() => setActiveTabId(tab.id)}
          >
            <div className={styles.tabTitle}>{tab.title}</div>
            <div 
              className={styles.tabClose} 
              onClick={(e) => handleCloseTab(e, tab.id)}
              title="Close Tab"
            >
              x
            </div>
          </div>
        ))}
        <div className={styles.newTabButton} onClick={handleAddNewTab} title="New Tab">+</div>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <button className={styles.navButton} onClick={handleBack} title="Back" disabled={!activeTab?.history?.length}>
          &#9664;
        </button>
        <button className={styles.navButton} title="Forward" disabled>
          &#9654;
        </button>
        <button className={styles.navButton} onClick={handleReload} title="Reload" disabled={!activeTab?.currentUrl}>
          &#8635;
        </button>
        
        <form className={styles.addressBarWrapper} onSubmit={handleNavigate}>
          <input 
            type="text" 
            className={styles.addressInput}
            value={activeTab?.url || ''}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="Enter URL to browse..."
          />
        </form>

        {activeTab?.currentUrl && getExternalUrl(activeTab.currentUrl) && (
          <button 
            className={styles.navButton} 
            style={{ width: 'auto', padding: '0 8px', marginLeft: '4px' }}
            onClick={() => {
              if (typeof clarity !== "undefined") { clarity("event", "product_link_clicked"); }
              window.open(getExternalUrl(activeTab.currentUrl)!, '_blank');
            }}
            title="Open in Native Browser"
          >
            Open External
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className={styles.contentArea}>
        {tabs.map((tab) => {
          if (!tab.currentUrl) {
            return (
              <div key={tab.id} className={styles.placeholder} style={{ display: tab.id === activeTabId ? 'flex' : 'none' }}>
                <div className={styles.placeholderIcon}>&#127760;</div>
                <div className={styles.placeholderText}>No page loaded.</div>
                <div className={styles.placeholderSubtext}>Enter a URL or let the system open one.</div>
              </div>
            );
          }

          if (!isEmbeddable(tab.currentUrl)) {
            const isChrome = tab.currentUrl.includes('chromewebstore');
            const isVSCode = tab.currentUrl.includes('open-vsx') || tab.currentUrl.includes('visualstudio');
            const storeName = isChrome ? 'Chrome Web Store' : isVSCode ? 'VS Code Marketplace' : 'External Site';
            const icon = isChrome ? '🌍' : isVSCode ? '💻' : '🔗';

            return (
              <div key={tab.id} className={styles.placeholder} style={{ display: tab.id === activeTabId ? 'flex' : 'none', background: '#f5f5f5' }}>
                <div className={styles.placeholderIcon} style={{ fontSize: '64px', opacity: 1 }}>{icon}</div>
                <div className={styles.placeholderText} style={{ marginTop: '16px', fontSize: '18px', color: '#000080' }}>
                  {storeName}
                </div>
                <div className={styles.placeholderSubtext} style={{ maxWidth: '400px', lineHeight: '1.5', marginTop: '12px' }}>
                  This extension is hosted securely on the {storeName}. Click below to view the details and install it!
                </div>
                <button 
                  onClick={() => {
                    if (typeof clarity !== "undefined") { clarity("event", "product_link_clicked"); }
                    window.open(tab.currentUrl, '_blank');
                  }}
                  style={{
                    marginTop: '24px',
                    padding: '10px 20px',
                    background: '#c0c0c0',
                    borderLeft: '2px solid #ffffff',
                    borderTop: '2px solid #ffffff',
                    borderRight: '2px solid #808080',
                    borderBottom: '2px solid #808080',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.borderLeft = '2px solid #808080';
                    e.currentTarget.style.borderTop = '2px solid #808080';
                    e.currentTarget.style.borderRight = '2px solid #ffffff';
                    e.currentTarget.style.borderBottom = '2px solid #ffffff';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.borderLeft = '2px solid #ffffff';
                    e.currentTarget.style.borderTop = '2px solid #ffffff';
                    e.currentTarget.style.borderRight = '2px solid #808080';
                    e.currentTarget.style.borderBottom = '2px solid #808080';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderLeft = '2px solid #ffffff';
                    e.currentTarget.style.borderTop = '2px solid #ffffff';
                    e.currentTarget.style.borderRight = '2px solid #808080';
                    e.currentTarget.style.borderBottom = '2px solid #808080';
                  }}
                >
                  <span style={{ fontSize: '16px' }}>🚀</span> View on {storeName}
                </button>
              </div>
            );
          }

          if (tab.currentUrl.startsWith('anurag-os://')) {
            const path = tab.currentUrl.replace('anurag-os://', '');
            return (
              <div key={tab.id} style={{ display: tab.id === activeTabId ? 'block' : 'none', height: '100%', overflowY: 'auto' }}>
                {path === 'promptive-sentry' && <PromptiveSentry />}
                {path === 'promptive-sentry-ide' && <PromptiveSentryIDE />}
                {path === 'piqque' && <Piqque />}
                {path !== 'promptive-sentry' && path !== 'promptive-sentry-ide' && path !== 'piqque' && <BrowserHome />}
              </div>
            );
          }

          return (
            <iframe
              key={tab.id}
              src={tab.currentUrl}
              className={styles.iframe}
              style={{ display: tab.id === activeTabId ? 'block' : 'none' }}
              onLoad={() => {
                setTabs(prev => prev.map(t => t.id === tab.id ? { ...t, isLoading: false } : t));
              }}
              title={`Browser Tab ${tab.title}`}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          );
        })}
        
        {activeTab?.isLoading && activeTab?.currentUrl && isEmbeddable(activeTab.currentUrl) && (
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
