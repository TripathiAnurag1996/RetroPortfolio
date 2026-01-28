import { memo } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts'
import { useWindows } from '../../context/WindowContext'
import { useEffect } from 'react'
import MenuBar from '../MenuBar/MenuBar'
import Taskbar from '../Taskbar/Taskbar'
import DesktopIcons from './DesktopIcons'
import WindowManager from '../Window/WindowManager'
import styles from './Desktop.module.css'

function Desktop() {
  const { background } = useTheme()
  const { openWindow } = useWindows()
  
  // Enable keyboard shortcuts
  useKeyboardShortcuts()

  // Auto-open Welcome window
  useEffect(() => {
    // Small delay for better UX and animation
    const timer = setTimeout(() => {
      openWindow('welcome')
    }, 800)
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
      
      {/* Desktop Content */}
      <div className={styles.desktopContent}>
        {/* Desktop Icons */}
        <div className={styles.iconsArea}>
          <DesktopIcons />
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
