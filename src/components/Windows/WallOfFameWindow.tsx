import { memo, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  THIRD_PARTY_ITEMS,
  FOUNDER_ITEMS,
  PLATFORM_COUNTS,
  TOTAL_CREATOR_POSTS,
  UNIQUE_PLATFORM_COUNT,
  getGroupedCreators,
  MentionItem,
  CreatorGroup
} from '../../data/wallOfFame';
import { playClickSound } from '../../utils/audio';
import { useWindows } from '../../context/WindowContext';
import styles from './WallOfFameWindow.module.css';

type TabKey = 'ALL' | 'REELS' | 'YOUTUBE' | 'ARTICLES' | 'FOUNDER';

function WallOfFameWindow() {
  const { activeWindowId } = useWindows();
  const isWindowActive = activeWindowId === 'wall-of-fame';

  const [activeTab, setActiveTab] = useState<TabKey>('ALL');
  const [selectedPost, setSelectedPost] = useState<MentionItem>(THIRD_PARTY_ITEMS[0]);
  const [embedMounted, setEmbedMounted] = useState(false);
  const [embedTimedOut, setEmbedTimedOut] = useState(false);
  const [expandedCreators, setExpandedCreators] = useState<Record<string, boolean>>({});
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);

  // Filter items based on active tab
  const currentItems = useMemo(() => {
    switch (activeTab) {
      case 'ALL':
        return THIRD_PARTY_ITEMS;
      case 'REELS':
        return THIRD_PARTY_ITEMS.filter(i => i.platform === 'instagram');
      case 'YOUTUBE':
        return THIRD_PARTY_ITEMS.filter(i => i.platform === 'youtube');
      case 'ARTICLES':
        return THIRD_PARTY_ITEMS.filter(i => i.platform === 'devto' || i.platform === 'medium' || i.platform === 'blog' || i.platform === 'x');
      case 'FOUNDER':
        return FOUNDER_ITEMS;
      default:
        return THIRD_PARTY_ITEMS;
    }
  }, [activeTab]);

  // Grouped creators for the current tab
  const groupedCreators: CreatorGroup[] = useMemo(() => {
    return getGroupedCreators(currentItems);
  }, [currentItems]);

  // Flattened items for keyboard navigation
  const flatSelectableItems: MentionItem[] = useMemo(() => {
    const list: MentionItem[] = [];
    for (const group of groupedCreators) {
      if (group.count > 1 && expandedCreators[group.creator]) {
        list.push(...group.items);
      } else {
        list.push(group.primaryItem);
      }
    }
    return list;
  }, [groupedCreators, expandedCreators]);

  // Ensure an item is always selected when tab changes
  useEffect(() => {
    if (currentItems.length > 0) {
      const isAlreadyInTab = currentItems.some(i => i.id === selectedPost.id);
      if (!isAlreadyInTab) {
        setSelectedPost(currentItems[0]);
        setEmbedMounted(false);
        setEmbedTimedOut(false);
      }
    }
  }, [currentItems, selectedPost.id]);

  // Instagram 4s fallback timeout monitor
  const timeoutRef = useRef<number | null>(null);
  useEffect(() => {
    setEmbedTimedOut(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (embedMounted && selectedPost.platform === 'instagram') {
      timeoutRef.current = window.setTimeout(() => {
        setEmbedTimedOut(true);
      }, 4000);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [embedMounted, selectedPost.id, selectedPost.platform]);

  // Switch post selection
  const handleSelectPost = useCallback((item: MentionItem) => {
    playClickSound();
    setSelectedPost(item);
    setEmbedMounted(false);
    setEmbedTimedOut(false);
    setIsMobileDetailOpen(true);
  }, []);

  // Handle Tab Switch
  const handleTabChange = useCallback((tab: TabKey) => {
    playClickSound();
    setActiveTab(tab);
    setEmbedMounted(false);
    setEmbedTimedOut(false);
  }, []);

  // Toggle multiple posts by creator
  const toggleCreatorExpand = useCallback((creator: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    setExpandedCreators(prev => ({
      ...prev,
      [creator]: !prev[creator]
    }));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isWindowActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const currentIndex = flatSelectableItems.findIndex(i => i.id === selectedPost.id);
        if (currentIndex === -1) return;

        let nextIndex = currentIndex;
        if (e.key === 'ArrowDown') {
          nextIndex = (currentIndex + 1) % flatSelectableItems.length;
        } else {
          nextIndex = (currentIndex - 1 + flatSelectableItems.length) % flatSelectableItems.length;
        }

        const nextItem = flatSelectableItems[nextIndex];
        if (nextItem) {
          playClickSound();
          setSelectedPost(nextItem);
          setEmbedMounted(false);
          setEmbedTimedOut(false);
        }
      } else if (e.key === 'Enter') {
        if (!embedMounted && (selectedPost.platform === 'instagram' || selectedPost.platform === 'youtube')) {
          e.preventDefault();
          playClickSound();
          setEmbedMounted(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isWindowActive, flatSelectableItems, selectedPost, embedMounted]);

  // Helper for platform badge class
  const getBadgeClass = (platform: string) => {
    switch (platform) {
      case 'instagram': return styles['badge-instagram'];
      case 'youtube': return styles['badge-youtube'];
      case 'x': return styles['badge-x'];
      case 'producthunt': return styles['badge-producthunt'];
      default: return styles['badge-article'];
    }
  };

  return (
    <div className={`${styles.container} ${isMobileDetailOpen ? styles.mobileDetailActive : ''}`}>
      {/* Top Tabs */}
      <nav className={styles.tabBar} role="tablist" aria-label="Wall of Fame Tabs">
        <button
          className={`${styles.tabBtn} ${activeTab === 'ALL' ? styles.active : ''}`}
          onClick={() => handleTabChange('ALL')}
          role="tab"
          aria-selected={activeTab === 'ALL'}
        >
          <span>ALL</span>
          <span className={styles.tabCount}>{TOTAL_CREATOR_POSTS}</span>
        </button>

        <button
          className={`${styles.tabBtn} ${activeTab === 'REELS' ? styles.active : ''}`}
          onClick={() => handleTabChange('REELS')}
          role="tab"
          aria-selected={activeTab === 'REELS'}
        >
          <span>REELS</span>
          <span className={styles.tabCount}>{PLATFORM_COUNTS.instagram}</span>
        </button>

        <button
          className={`${styles.tabBtn} ${activeTab === 'YOUTUBE' ? styles.active : ''}`}
          onClick={() => handleTabChange('YOUTUBE')}
          role="tab"
          aria-selected={activeTab === 'YOUTUBE'}
        >
          <span>YOUTUBE</span>
          <span className={styles.tabCount}>{PLATFORM_COUNTS.youtube}</span>
        </button>

        <button
          className={`${styles.tabBtn} ${activeTab === 'ARTICLES' ? styles.active : ''}`}
          onClick={() => handleTabChange('ARTICLES')}
          role="tab"
          aria-selected={activeTab === 'ARTICLES'}
        >
          <span>ARTICLES</span>
          <span className={styles.tabCount}>{PLATFORM_COUNTS.articles}</span>
        </button>

        <div className={styles.tabDivider} />

        <button
          className={`${styles.tabBtn} ${activeTab === 'FOUNDER' ? styles.active : ''}`}
          onClick={() => handleTabChange('FOUNDER')}
          role="tab"
          aria-selected={activeTab === 'FOUNDER'}
        >
          <span>FOUNDER</span>
          <span className={styles.tabCount}>{PLATFORM_COUNTS.founder}</span>
        </button>
      </nav>

      {/* Main 2-Pane Content */}
      <div className={styles.mainContent}>
        {/* Left Pane: Phone Frame */}
        <section className={styles.playerPane} aria-label="Media Player Frame">
          {/* Mobile Back Button */}
          <button 
            className={styles.mobileBackBtn}
            onClick={() => setIsMobileDetailOpen(false)}
            aria-label="Back to mentions list"
          >
            ← Back to Directory
          </button>

          <div className={styles.phoneFrame}>
            <div className={styles.phoneTopNotch}>
              <div className={styles.phoneSpeaker} />
              <div className={styles.phoneCamera} />
            </div>

            <div className={styles.phoneScreen}>
              {/* Invisible Shield while unfocused/dragging */}
              {!isWindowActive && <div className={styles.dragShield} />}

              {/* Render Embed or Preview Card */}
              {embedMounted && selectedPost.embedUrl ? (
                <div className={styles.iframeWrapper}>
                  <iframe
                    key={selectedPost.id}
                    src={selectedPost.embedUrl}
                    title={`${selectedPost.creator} - ${selectedPost.kind}`}
                    className={styles.phoneIframe}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                  {embedTimedOut && (
                    <div className={styles.fallbackBanner}>
                      <span>Embed taking long? </span>
                      <a 
                        href={selectedPost.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: '#ffffff', textDecoration: 'underline', fontWeight: 'bold' }}
                      >
                        Open on Instagram ↗
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.previewCard}>
                  <span className={`${styles.previewPlatformBadge} ${getBadgeClass(selectedPost.platform)}`}>
                    {selectedPost.kind.toUpperCase()}
                  </span>
                  <div className={styles.previewRank}>Rank #{selectedPost.rank}</div>
                  <div className={styles.previewCreator}>{selectedPost.creator}</div>

                  {(selectedPost.platform === 'instagram' || selectedPost.platform === 'youtube') ? (
                    <button
                      className={styles.playActionBtn}
                      onClick={() => {
                        playClickSound();
                        setEmbedMounted(true);
                      }}
                      aria-label="Click to play preview embed"
                    >
                      ▶ Play Preview
                    </button>
                  ) : (
                    <div style={{ fontSize: '13px', color: '#aaaaaa', margin: '8px 0' }}>
                      Article / external post
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Under-Phone Post Actions */}
          <div className={styles.playerFooter}>
            <a
              href={selectedPost.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.openOriginalBtn}
            >
              <span>Open Original ({selectedPost.platform.toUpperCase()}) ↗</span>
            </a>
          </div>
        </section>

        {/* Right Pane: Directory List */}
        <section className={styles.directoryPane} aria-label="Creators Directory">
          <div className={styles.directoryHeader}>
            <span>CREATOR</span>
            <span>TYPE / RANK</span>
          </div>

          <div className={styles.listScroll} role="listbox">
            {groupedCreators.map(group => {
              const isGroupActive = group.items.some(i => i.id === selectedPost.id);
              const isExpanded = !!expandedCreators[group.creator];

              return (
                <div key={group.creator} className={styles.creatorGroupCard}>
                  <div
                    className={`${styles.groupRow} ${isGroupActive ? styles.activeItem : ''}`}
                    onClick={() => handleSelectPost(group.primaryItem)}
                    role="option"
                    aria-selected={isGroupActive}
                    tabIndex={0}
                  >
                    <span className={styles.rankTag}>#{group.primaryItem.rank}</span>
                    <div className={styles.creatorInfo}>
                      <span className={styles.creatorName}>{group.creator}</span>
                      <span className={styles.creatorSub}>{group.primaryItem.platform}</span>
                    </div>

                    <div className={styles.badgesGroup}>
                      {group.count > 1 && (
                        <button
                          className={styles.multiBadge}
                          onClick={(e) => toggleCreatorExpand(group.creator, e)}
                          title={`${group.count} mentions`}
                          aria-label={`Toggle ${group.count} mentions`}
                        >
                          x{group.count} {isExpanded ? '▲' : '▼'}
                        </button>
                      )}

                      <span className={`${styles.kindBadge} ${getBadgeClass(group.primaryItem.platform)}`}>
                        {group.primaryItem.kind.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Multi-post expansion */}
                  {group.count > 1 && isExpanded && (
                    <div className={styles.subItemsList}>
                      {group.items.map((subItem, sIdx) => {
                        const isSubActive = subItem.id === selectedPost.id;
                        return (
                          <div
                            key={subItem.id}
                            className={`${styles.subItemRow} ${isSubActive ? styles.activeSubItem : ''}`}
                            onClick={() => handleSelectPost(subItem)}
                          >
                            <span>Post {sIdx + 1} (Rank #{subItem.rank})</span>
                            <span className={`${styles.kindBadge} ${getBadgeClass(subItem.platform)}`}>
                              {subItem.kind.toUpperCase()}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Bottom Status Bar */}
      <footer className={styles.statusBar}>
        <div className={styles.statusLeft}>
          <span>{TOTAL_CREATOR_POSTS} creator posts</span>
          <span>·</span>
          <span>{UNIQUE_PLATFORM_COUNT} platforms</span>
        </div>
        <div className={styles.statusHelp}>
          Use ↑/↓ keys to browse · Enter to play
        </div>
      </footer>
    </div>
  );
}

export default memo(WallOfFameWindow);
