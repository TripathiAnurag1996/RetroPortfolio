import { memo } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts'
import { useWindows } from '../../context/WindowContext'
import { useEffect } from 'react'
import MenuBar from '../MenuBar/MenuBar'
import Taskbar from '../Taskbar/Taskbar'
import DesktopIcons from './DesktopIcons'
import WindowManager from '../Window/WindowManager'
import SearchBar from '../AIAssistant/SearchBar'
import styles from './Desktop.module.css'

function Desktop() {
  const { background } = useTheme()
  const { openWindow } = useWindows()
  
  // Enable keyboard shortcuts
  useKeyboardShortcuts()

  // Auto-open Welcome window
  useEffect(() => {
    // Delay was tied to better UX and animation timing
    const timer = setTimeout(() => {
      openWindow('welcome')
    }, 150)
    return () => clearTimeout(timer)
  }, [openWindow])
  
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
          <div className={styles.stickyTitle}>COMING SOON</div>
          <div className={styles.stickyList}>
            <div className={styles.stickyItem}>
              <span className={styles.stickyItemName}>▸ Piqque — Ambient AI Assistant</span>
              <span className={styles.stickyItemDesc}>
                Private Beta · Launching as proprietary software soon
                <br />
                <span 
                  onClick={() => openWindow('mediaplayer')}
                  style={{ cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }}
                >
                  Watch the demo!!
                </span>
              </span>
            </div>
            <div className={styles.stickyDivider}></div>
            <div className={styles.stickyItem}>
              <span className={styles.stickyItemName}>▸ Flavin — Agentic Browser</span>
              <span className={styles.stickyItemDesc}>Currently in planning · Something big is brewing</span>
            </div>
          </div>
          <div className={styles.stickyFooter}>— Xenriq Systems</div>
        </div>
        
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
