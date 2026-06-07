import { memo, useState, useCallback } from 'react'
import { useWindows } from '../../context/WindowContext'
import { DESKTOP_ICONS } from '../../config/windows'
import { playClickSound } from '../../utils/audio'
import { event } from '../../lib/gtag'
import Icon from '../Icons/Icon'
import styles from './DesktopIcons.module.css'

declare const clarity: (action: string, key?: string, value?: string) => void;

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
      if (id === 'resume' && typeof clarity !== "undefined") { clarity("event", "resume_viewed"); }
      playClickSound()
      window.open(externalUrl, '_blank', 'noopener,noreferrer')
      
      if (id === 'resume') {
        event('resume_downloaded', {
          category: 'conversion',
          label: 'resume_cta',
          source: 'desktop_icon'
        })
        // TODO: Mark resume_downloaded as Key Event in GA4 dashboard
      } else if (id === 'linkedin' || id === 'github' || id === 'twitter' || id === 'x') {
        event('social_profile_clicked', {
          category: 'engagement',
          label: id,
          source: 'desktop'
        })
      } else {
        event('external_link_clicked', {
          category: 'navigation',
          label: id.toUpperCase(),
          source: 'desktop'
        })
      }
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
        if (id === 'resume' && typeof clarity !== "undefined") { clarity("event", "resume_viewed"); }
        window.open(externalUrl, '_blank', 'noopener,noreferrer')
        
        if (id === 'resume') {
          event('resume_downloaded', {
            category: 'conversion',
            label: 'resume_cta',
            source: 'desktop_icon'
          })
          // TODO: Mark resume_downloaded as Key Event in GA4 dashboard
        } else if (id === 'linkedin' || id === 'github' || id === 'twitter' || id === 'x') {
          event('social_profile_clicked', {
            category: 'engagement',
            label: id,
            source: 'desktop'
          })
        } else {
          event('external_link_clicked', {
            category: 'navigation',
            label: id.toUpperCase(),
            source: 'desktop'
          })
        }
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
