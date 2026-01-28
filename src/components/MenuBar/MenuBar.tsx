import { memo, useState, useEffect, useRef } from 'react'
import { useWindows } from '../../context/WindowContext'
import { MENU_ITEMS, WINDOW_CONFIGS } from '../../config/windows'
import { playClickSound } from '../../utils/audio'
import styles from './MenuBar.module.css'

function MenuBar() {
  const { activeWindowId, openWindow } = useWindows()
  const [time, setTime] = useState(new Date())
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  
  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Update clock every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 60000)
    
    return () => clearInterval(timer)
  }, [])
  
  // Format time
  const formatTime = (date: Date) => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    
    const day = days[date.getDay()]
    const month = months[date.getMonth()]
    const dateNum = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const hour12 = hours % 12 || 12
    
    return `${day} ${month} ${dateNum} ${hour12}:${minutes} ${ampm}`
  }
  
  // Get active window title - show ANURAG when no window is open
  const getAppName = () => {
    if (!activeWindowId) return 'ANURAG'
    const config = WINDOW_CONFIGS[activeWindowId]
    return config?.title || 'ANURAG'
  }

  const handleMenuClick = (label: string) => {
    if (label === 'HELP') {
      playClickSound()
      setOpenDropdown(openDropdown === 'HELP' ? null : 'HELP')
    }
  }

  const handleHelpAction = (action: string) => {
    if (action === 'ANURAG HELP') {
      playClickSound()
      openWindow('help')
    }
    setOpenDropdown(null)
  }
  
  return (
    <nav className={styles.menuBar} role="menubar" aria-label="Main menu">
      <div className={styles.leftSection}>
        <div className={styles.appName}>
          <span className={styles.appIcon}>🏠</span>
          <span>{getAppName()}</span>
        </div>
        
        <div className={styles.menuItems} role="menu" ref={menuRef}>
          {MENU_ITEMS.map((item) => (
            <div key={item.label} className={styles.menuItemWrapper}>
              <button
                className={`${styles.menuItem} ${openDropdown === item.label ? styles.active : ''}`}
                role="menuitem"
                tabIndex={0}
                onClick={() => handleMenuClick(item.label)}
              >
                {item.label}
              </button>
              
              {item.label === 'HELP' && openDropdown === 'HELP' && (
                <div className={styles.dropdown}>
                  <button 
                    className={`${styles.dropdownItem} ${styles.disabled}`}
                    disabled
                  >
                    SEARCH
                  </button>
                  <button 
                    className={styles.dropdownItem}
                    onClick={() => handleHelpAction('ANURAG HELP')}
                  >
                    ANURAG HELP
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.rightSection}>
        <time className={styles.clock} dateTime={time.toISOString()}>
          {formatTime(time)}
        </time>
      </div>
    </nav>
  )
}

export default memo(MenuBar)
