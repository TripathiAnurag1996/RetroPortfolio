import { memo, useCallback } from 'react'
import { useWindows } from '../../context/WindowContext'
import { TASKBAR_ICONS } from '../../config/windows'
import { playClickSound } from '../../utils/audio'
import Icon from '../Icons/Icon'
import SearchBar from '../AIAssistant/SearchBar'
import styles from './Taskbar.module.css'

function Taskbar() {
  const { openWindow, windows, activeWindowId } = useWindows()
  
  const handleClick = useCallback((windowId: string) => {
    playClickSound()
    openWindow(windowId)
  }, [openWindow])
  
  const isWindowOpen = (windowId: string) => {
    return windows.some(w => w.id === windowId)
  }
  
  const isActive = (windowId: string) => {
    return activeWindowId === windowId
  }
  
  return (
    <>
      <nav className={styles.taskbar} role="navigation" aria-label="Taskbar">
        {/* Centered Dock */}
        <div className={styles.dockContainer}>
          <div className={styles.taskbarIcons}>
            {TASKBAR_ICONS.map((item) => (
              <button
                key={item.id}
                className={`${styles.taskbarIcon} ${isWindowOpen(item.windowId) ? styles.active : ''}`}
                onClick={() => handleClick(item.windowId)}
                aria-label={`Open ${item.id}`}
                aria-pressed={isActive(item.windowId)}
                title={item.id.toUpperCase()}
              >
                <div className={styles.iconWrapper}>
                  <Icon name={item.icon} size={20} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom-Right Assistant Button */}
        <div className={styles.systemTray}>
          <SearchBar />
        </div>
      </nav>
    </>
  )
}

export default memo(Taskbar)
