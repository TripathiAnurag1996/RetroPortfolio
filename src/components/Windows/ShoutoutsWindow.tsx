import { memo, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  THIRD_PARTY_ITEMS,
  FOUNDER_ITEMS,
  PLATFORM_COUNTS,
  TOTAL_CREATOR_POSTS,
  UNIQUE_CREATOR_COUNT,
  UNIQUE_PLATFORM_COUNT,
  getGroupedCreators,
  MentionItem,
  CreatorGroup
} from '../../data/wallOfFame';
import {
  SHOUTOUTS_PRODUCT_TAGLINE,
  PROMPTIVE_SENTRY_CHROME_STORE_URL
} from '../../config/shoutouts';
import { playClickSound } from '../../utils/audio';
import { useWindows } from '../../context/WindowContext';
import { trackClarityEvent } from '../../lib/clarity';
import styles from './ShoutoutsWindow.module.css';

type TabKey = 'ALL' | 'REELS' | 'YOUTUBE' | 'ARTICLES' | 'FOUNDER';

// Fixed palette for creator initials tile
const INITIALS_PALETTE = [
  '#2b4c7e', // deep blue
  '#53356c', // deep purple
  '#2a6041', // forest green
  '#804126', // warm brick
  '#68491c', // antique brass
  '#205d67', // deep teal
  '#742a3a', // wine
  '#3d4852'  // slate
];

function getCreatorColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % INITIALS_PALETTE.length;
  return INITIALS_PALETTE[index];
}

function getInitials(name: string): string {
  const clean = name.replace(/[^a-zA-Z0-9\s]/g, '').trim();
  if (!clean) return 'CR';
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatChannelNumber(index: number): string {
  const num = index + 1;
  return `CH ${num.toString().padStart(2, '0')}`;
}

// Build autoplay embed url with unmute / loop params
function buildAutoplayEmbedUrl(item: MentionItem): string {
  if (!item.embedUrl) return '';

  if (item.platform === 'youtube') {
    // Check if embed url already has parameters
    const separator = item.embedUrl.includes('?') ? '&' : '?';
    return `${item.embedUrl}${separator}autoplay=1&mute=1&loop=1&playsinline=1&enablejsapi=1`;
  }

  // Instagram embeds: load /embed/ directly
  return item.embedUrl;
}

function ShoutoutsWindow() {
  const { activeWindowId, windows } = useWindows();
  const isWindowActive = activeWindowId === 'shoutouts' || activeWindowId === 'wall-of-fame';

  // Check if window is minimized or closed
  const currentWindowState = useMemo(() => {
    return windows.find(w => w.id === 'shoutouts' || w.id === 'wall-of-fame');
  }, [windows]);
  const isMinimized = currentWindowState?.minimized ?? false;

  const [activeTab, setActiveTab] = useState<TabKey>('ALL');
  const [selectedGroupIndex, setSelectedGroupIndex] = useState<number>(0);
  const [selectedPostIndexInGroup, setSelectedPostIndexInGroup] = useState<number>(0);

  // Debounced post state for iframe loading
  const [debouncedPost, setDebouncedPost] = useState<MentionItem>(THIRD_PARTY_ITEMS[0]);
  const [isSlowLoading, setIsSlowLoading] = useState(false);
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const slowTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  const activeGroup: CreatorGroup | undefined = groupedCreators[selectedGroupIndex] || groupedCreators[0];
  const activePost: MentionItem | undefined = activeGroup?.items[selectedPostIndexInGroup] || activeGroup?.primaryItem || currentItems[0];

  // Debounce iframe mounting by 300ms
  useEffect(() => {
    if (!activePost) return;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (slowTimerRef.current) {
      clearTimeout(slowTimerRef.current);
    }
    setIsSlowLoading(false);

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedPost(activePost);
      // Start 4s slow-loading hint timer
      slowTimerRef.current = setTimeout(() => {
        setIsSlowLoading(true);
      }, 4000);
    }, 300);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
    };
  }, [activePost]);

  // Handle Tab Switch
  const handleTabChange = useCallback((tab: TabKey) => {
    playClickSound();
    setActiveTab(tab);
    setSelectedGroupIndex(0);
    setSelectedPostIndexInGroup(0);
  }, []);

  // Handle group card click
  const handleSelectGroup = useCallback((index: number) => {
    playClickSound();
    setSelectedGroupIndex(index);
    setSelectedPostIndexInGroup(0);
    setIsMobileDetailOpen(true);
  }, []);

  // Handle switching between posts of the same creator
  const handleSelectPostInGroup = useCallback((postIndex: number) => {
    playClickSound();
    setSelectedPostIndexInGroup(postIndex);
  }, []);

  // Keyboard navigation (↑/↓ across groups, ←/→ across multi-posts)
  useEffect(() => {
    if (!isWindowActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        playClickSound();
        if (e.key === 'ArrowDown') {
          setSelectedGroupIndex(prev => (prev + 1) % groupedCreators.length);
        } else {
          setSelectedGroupIndex(prev => (prev - 1 + groupedCreators.length) % groupedCreators.length);
        }
        setSelectedPostIndexInGroup(0);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        if (activeGroup && activeGroup.count > 1) {
          e.preventDefault();
          playClickSound();
          if (e.key === 'ArrowRight') {
            setSelectedPostIndexInGroup(prev => (prev + 1) % activeGroup.count);
          } else {
            setSelectedPostIndexInGroup(prev => (prev - 1 + activeGroup.count) % activeGroup.count);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isWindowActive, groupedCreators.length, activeGroup]);

  // Platform tag class helper
  const getPlatformClass = (platform: string) => {
    switch (platform) {
      case 'instagram': return styles.tagInstagram;
      case 'youtube': return styles.tagYoutube;
      case 'x': return styles.tagX;
      default: return styles.tagArticle;
    }
  };

  const iframeSrc = useMemo(() => {
    if (!debouncedPost || isMinimized) return '';
    return buildAutoplayEmbedUrl(debouncedPost);
  }, [debouncedPost, isMinimized]);

  return (
    <div className={`${styles.container} ${isMobileDetailOpen ? styles.mobileDetailActive : ''}`}>
      {/* Top Tabs */}
      <nav className={styles.tabBar} role="tablist" aria-label="Shoutouts Categories">
        <div className={styles.tabRow}>
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
        </div>
      </nav>

      {/* Main 2-Pane Content */}
      <div className={styles.mainContent}>
        {/* Left Pane: Player & Product Header */}
        <section className={styles.playerPane} aria-label="Phone Player">
          {/* Mobile Back Button (Bevelled button) */}
          <button 
            className={styles.mobileBackBtn}
            onClick={() => setIsMobileDetailOpen(false)}
            aria-label="Back to Directory"
          >
            ← Back to Directory
          </button>

          {/* Product Tagline Header */}
          <div className={styles.productHeader}>
            <span className={styles.productTagline}>{SHOUTOUTS_PRODUCT_TAGLINE}</span>
          </div>

          {/* Phone Frame */}
          <div className={styles.phoneFrame}>
            <div className={styles.phoneTopNotch}>
              <div className={styles.phoneSpeaker} />
              <div className={styles.phoneCamera} />
            </div>

            <div className={styles.phoneScreen}>
              {/* Invisible Shield while unfocused/dragging */}
              {!isWindowActive && <div className={styles.dragShield} />}

              {/* Autoplay Embed Iframe */}
              {iframeSrc ? (
                <div className={styles.iframeWrapper}>
                  <iframe
                    key={debouncedPost.id}
                    src={iframeSrc}
                    title={`${debouncedPost.creator} - ${debouncedPost.kind}`}
                    className={styles.phoneIframe}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                  {isSlowLoading && (
                    <div className={styles.slowLoadingBanner}>
                      <span>Taking longer than expected? </span>
                      <a
                        href={debouncedPost.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.slowLoadingLink}
                      >
                        Open on {debouncedPost.platform.toUpperCase()} ↗
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.loadingPlaceholder}>
                  <span>Loading embed...</span>
                </div>
              )}
            </div>
          </div>

          {/* Multi-Post Switcher Dots (under phone) */}
          {activeGroup && activeGroup.count > 1 && (
            <div className={styles.multiPostSwitcher} role="group" aria-label="Switch creator posts">
              <button
                className={styles.switchArrowBtn}
                onClick={() => {
                  const prev = (selectedPostIndexInGroup - 1 + activeGroup.count) % activeGroup.count;
                  handleSelectPostInGroup(prev);
                }}
                aria-label="Previous post"
              >
                ◀
              </button>
              <div className={styles.dotsList}>
                {activeGroup.items.map((item, idx) => (
                  <button
                    key={item.id}
                    className={`${styles.dotItem} ${selectedPostIndexInGroup === idx ? styles.activeDot : ''}`}
                    onClick={() => handleSelectPostInGroup(idx)}
                    aria-label={`Post ${idx + 1} of ${activeGroup.count}`}
                  />
                ))}
              </div>
              <span className={styles.dotsCounter}>
                {selectedPostIndexInGroup + 1}/{activeGroup.count}
              </span>
              <button
                className={styles.switchArrowBtn}
                onClick={() => {
                  const next = (selectedPostIndexInGroup + 1) % activeGroup.count;
                  handleSelectPostInGroup(next);
                }}
                aria-label="Next post"
              >
                ▶
              </button>
            </div>
          )}

          {/* Under-Phone Action Links */}
          <div className={styles.playerFooter}>
            <a
              href={activePost?.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.openOriginalBtn}
              onClick={() => {
                trackClarityEvent("shoutout_open_original", activePost?.creator || "unknown");
              }}
            >
              <span>Watch on {activePost?.platform?.toUpperCase()} ↗</span>
            </a>

            {/* Direct Link to Promptive Sentry */}
            <a
              href={PROMPTIVE_SENTRY_CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.getChromeBtn}
              onClick={() => {
                trackClarityEvent("get_promptive_sentry_clicked", "shoutouts_footer");
              }}
            >
              <span>★ GET PROMPTIVE SENTRY (CHROME STORE) ↗</span>
            </a>
          </div>
        </section>

        {/* Right Pane: 2-Column Card Grid Directory */}
        <section className={styles.directoryPane} aria-label="Directory">
          <div className={styles.directoryHeader}>
            <span>CREATORS DIRECTORY</span>
            <span>{groupedCreators.length} CHANNELS</span>
          </div>

          <div className={styles.gridScroll} role="listbox">
            <div className={styles.cardsGrid}>
              {groupedCreators.map((group, gIdx) => {
                const isSelected = selectedGroupIndex === gIdx;
                const initials = getInitials(group.creator);
                const tileBg = getCreatorColor(group.creator);
                const channelLabel = formatChannelNumber(gIdx);
                const primaryPlatform = group.primaryItem.platform;

                return (
                  <div
                    key={group.creator}
                    className={`${styles.creatorCard} ${isSelected ? styles.cardSelected : ''}`}
                    onClick={() => handleSelectGroup(gIdx)}
                    role="option"
                    aria-selected={isSelected}
                    tabIndex={0}
                  >
                    {/* Initials Tile */}
                    <div className={styles.initialsTile} style={{ backgroundColor: tileBg }}>
                      {initials}
                    </div>

                    {/* Card Content */}
                    <div className={styles.cardContent}>
                      <div className={styles.cardTopRow}>
                        <span className={styles.channelNumber}>{channelLabel}</span>
                        {group.count > 1 && (
                          <span className={styles.postCountBadge}>
                            {group.count} posts
                          </span>
                        )}
                      </div>
                      <div className={styles.cardCreatorName} title={group.creator}>
                        {group.creator}
                      </div>
                      <div className={styles.cardBottomRow}>
                        <span className={`${styles.platformTag} ${getPlatformClass(primaryPlatform)}`}>
                          {primaryPlatform.toUpperCase()}
                        </span>
                        <span className={styles.kindLabel}>
                          {group.primaryItem.kind.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Status Bar: Unique creators first */}
      <footer className={styles.statusBar}>
        <div className={styles.statusLeft}>
          <span className={styles.statusMetric}>
            <strong>{UNIQUE_CREATOR_COUNT}</strong> creators
          </span>
          <span className={styles.statusBullet}>·</span>
          <span className={styles.statusMetric}>
            <strong>{TOTAL_CREATOR_POSTS}</strong> posts
          </span>
          <span className={styles.statusBullet}>·</span>
          <span className={styles.statusMetric}>
            <strong>{UNIQUE_PLATFORM_COUNT}</strong> platforms
          </span>
          <span className={styles.statusBullet}>·</span>
          <span className={styles.statusMetric}>
            <strong>12M+</strong> reach
          </span>
        </div>
        <div className={styles.statusHelp}>
          Use ↑/↓ to browse channels · ←/→ to switch posts
        </div>
      </footer>
    </div>
  );
}

export default memo(ShoutoutsWindow);
