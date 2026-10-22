import { memo, useState, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts'
import { useWindows } from '../../context/WindowContext'
import MenuBar from '../MenuBar/MenuBar'
import Taskbar from '../Taskbar/Taskbar'
import DesktopIcons from './DesktopIcons'
import WindowManager from '../Window/WindowManager'
import SearchBar from '../AIAssistant/SearchBar'
import styles from './Desktop.module.css'

function Desktop() {
  const { background } = useTheme()
  const { openWindow } = useWindows()
  const [showBalloon, setShowBalloon] = useState(false)
  
  // Enable keyboard shortcuts
  useKeyboardShortcuts()

  // Deep-link hash listener: #as-seen-on (supports #wall-of-fame for backward compatibility)
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.toLowerCase()
      if (hash === '#as-seen-on' || hash === '#wall-of-fame' || hash === '#shoutouts') {
        openWindow('shoutouts')
      }
    }
    checkHash()
    window.addEventListener('hashchange', checkHash)
    return () => window.removeEventListener('hashchange', checkHash)
  }, [openWindow])

  // Auto-open Welcome window
  useEffect(() => {
    // Delay was tied to better UX and animation timing
    const timer = setTimeout(() => {
      openWindow('welcome')
    }, 150)
    return () => clearTimeout(timer)
  }, [openWindow])

  // Notification balloon: show once per session after 2 seconds
  useEffect(() => {
    try {
      const alreadyShown = sessionStorage.getItem('shoutouts_balloon_seen')
      if (!alreadyShown) {
        const timer = setTimeout(() => {
          setShowBalloon(true)
        }, 2000)
        return () => clearTimeout(timer)
      }
    } catch {
      // ignore storage errors
    }
  }, [])

  const handleOpenShoutoutsFromBalloon = () => {
    try {
      sessionStorage.setItem('shoutouts_balloon_seen', 'true')
      localStorage.setItem('shoutouts_opened', 'true')
    } catch {
      // ignore
    }
    setShowBalloon(false)
    openWindow('shoutouts')
  }

  const handleDismissBalloon = (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      sessionStorage.setItem('shoutouts_balloon_seen', 'true')
    } catch {
      // ignore
    }
    setShowBalloon(false)
  }
  
  return (
    <div className={styles.desktop}>
      {/* Background Layer */}
      <div 
        className={styles.background} 
        data-bg={background}
        role="presentation"
        aria-hidden="true"
      />
      
      {/* Menu Bar */}
      <MenuBar />

      {/* OS Assistant Trigger (Positioned top-right via CSS) */}
      <SearchBar />
      
      {/* Desktop Content */}
      <div className={styles.desktopContent}>
        {/* Desktop Icons */}
        <div className={styles.iconsArea}>
          <DesktopIcons />
        </div>

        {/* Decorative Sticky Note */}
        <div className={styles.stickyNote}>
          <div className={styles.pushPin}></div>
          <div className={styles.stickyTitle}>HIGHLIGHTS & UPDATES</div>
          <div className={styles.stickyList}>
            <div className={styles.stickyItem}>
              <span className={styles.stickyItemName} style={{ color: '#000080', fontWeight: 'bold' }}>
                ★ SHOUTOUTS
              </span>
              <span className={styles.stickyItemDesc}>
                56 creator mentions across 5 platforms.
                <br />
                <span 
                  onClick={() => openWindow('shoutouts')}
                  style={{ cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold', color: '#000080' }}
                >
                  Browse shoutouts &rarr;
                </span>
              </span>
            </div>
            <div className={styles.stickyDivider}></div>
            <div className={styles.stickyItem}>
              <span className={styles.stickyItemName}>▸ Jilipy: AI Side Panel for Chrome</span>
              <span className={styles.stickyItemDesc}>
                Pre-launch
                <br />
                Summarize and ask questions on any webpage, YouTube video or PDF. Get notes, translations and diagrams. Trust-first, with clear usage limits and no ads.
              </span>
            </div>
            <div className={styles.stickyDivider}></div>
            <div className={styles.stickyItem}>
              <span className={styles.stickyItemName}>▸ Piqque — Ambient AI</span>
              <span className={styles.stickyItemDesc}>
                Private Beta · Proprietary software
                <br />
                <span 
                  onClick={() => openWindow('mediaplayer')}
                  style={{ cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }}
                >
                  Watch demo!!
                </span>
              </span>
            </div>
          </div>
          <div className={styles.stickyFooter}>— Xenriq Systems</div>
        </div>

        {/* Retro System Notification Balloon (above taskbar) */}
        {showBalloon && (
          <div className={styles.systemBalloon} onClick={handleOpenShoutoutsFromBalloon} role="alert">
            <button className={styles.balloonClose} onClick={handleDismissBalloon} aria-label="Dismiss notification">
              &times;
            </button>
            <div className={styles.balloonHeader}>
              <span className={styles.balloonIcon}>★</span>
              <span className={styles.balloonTitle}>New in Anurag OS</span>
            </div>
            <div className={styles.balloonBody}>
              <strong>Shoutouts is live!</strong>
              <p>56 creators covered Promptive Sentry across Instagram, YouTube, and X.</p>
              <span className={styles.balloonCta}>Click here to explore &rarr;</span>
            </div>
          </div>
        )}
        
        {/* Windows Container */}
        <div className={styles.windowsContainer}>
          <WindowManager />
        </div>
      </div>
      
      {/* Taskbar */}
      <Taskbar />
    </div>
  )
}

export default memo(Desktop)
