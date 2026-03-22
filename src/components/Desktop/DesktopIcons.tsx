import { memo, useState, useCallback } from 'react'
import { useWindows } from '../../context/WindowContext'
import { DESKTOP_ICONS } from '../../config/windows'
import { playClickSound } from '../../utils/audio'
import { event } from '../../lib/gtag'
import Icon from '../Icons/Icon'
import styles from './DesktopIcons.module.css'

function DesktopIcons() {
  const { openWindow } = useWindows()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  
  const handleClick = useCallback((id: string) => {
    playClickSound()
    setSelectedId(id)
  }, [])
  
  const handleDoubleClick = useCallback((id: string, windowId: string | undefined, externalUrl: string | undefined) => {
    // Handle external URLs (like resume PDF) - open in new tab
    if (externalUrl) {
      playClickSound()
      window.open(externalUrl, '_blank', 'noopener,noreferrer')
      event('external_link_clicked', {
        category: 'navigation',
        label: id.toUpperCase(),
        source: 'desktop'
      })
      return
    }
    // Handle window opening
    if (windowId) {
      openWindow(windowId)
      event('window_opened', {
        category: 'navigation',
        label: windowId.toUpperCase(),
        source: 'desktop'
      })
    }
  }, [openWindow])
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent, id: string, windowId: string | undefined, externalUrl: string | undefined) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      // Handle external URLs (like resume PDF)
      if (externalUrl) {
        window.open(externalUrl, '_blank', 'noopener,noreferrer')
        event('external_link_clicked', {
          category: 'navigation',
          label: id.toUpperCase(),
          source: 'desktop'
        })
        return
      }
      if (windowId) {
        openWindow(windowId)
        event('window_opened', {
          category: 'navigation',
          label: windowId.toUpperCase(),
          source: 'desktop'
        })
      }
    }
  }, [openWindow])
  
  return (
    <div className={styles.iconsGrid} role="grid" aria-label="Desktop icons">
      {DESKTOP_ICONS.map((icon) => (
        <div
          key={icon.id}
          className={`${styles.icon} ${selectedId === icon.id ? styles.selected : ''}`}
          onClick={() => handleClick(icon.id)}
          onDoubleClick={() => handleDoubleClick(icon.id, icon.windowId, icon.externalUrl)}
          onKeyDown={(e) => handleKeyDown(e, icon.id, icon.windowId, icon.externalUrl)}
          tabIndex={0}
          role="gridcell"
          aria-label={icon.label}
        >
          <div className={styles.iconImage}>
            <Icon name={icon.icon} />
          </div>
          <span className={styles.iconLabel}>{icon.label}</span>
        </div>
      ))}
    </div>
  )
}

export default memo(DesktopIcons)
