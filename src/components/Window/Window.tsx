import { memo, useCallback, useState, useRef, useEffect } from 'react'
import { useWindows } from '../../context/WindowContext'
import { useDraggable } from '../../hooks/useDraggable'
import { WindowState } from '../../types'
import styles from './Window.module.css'

interface WindowProps {
  window: WindowState
  children: React.ReactNode
  isActive: boolean
}

function Window({ window: windowState, children, isActive }: WindowProps) {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindowSize } = useWindows()
  const [isClosing, setIsClosing] = useState(false)
  const windowRef = useRef<HTMLDivElement>(null)
  
  const { handleMouseDown } = useDraggable({
    windowId: windowState.id
  })
  
  // Handle close with animation
  const handleClose = useCallback(() => {
    setIsClosing(true)
    setTimeout(() => {
      closeWindow(windowState.id)
    }, 150)
  }, [closeWindow, windowState.id])
  
  // Handle minimize
  const handleMinimize = useCallback(() => {
    minimizeWindow(windowState.id)
  }, [minimizeWindow, windowState.id])
  
  // Handle maximize
  const handleMaximize = useCallback(() => {
    maximizeWindow(windowState.id)
  }, [maximizeWindow, windowState.id])
  
  // Handle click to focus
  const handleWindowClick = useCallback(() => {
    if (!isActive) {
      focusWindow(windowState.id)
    }
  }, [focusWindow, windowState.id, isActive])
  
  // Handle resize
  const handleResizeMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const startX = e.clientX
    const startY = e.clientY
    const startWidth = windowState.size.width
    const startHeight = windowState.size.height
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX
      const deltaY = moveEvent.clientY - startY
      
      updateWindowSize(windowState.id, {
        width: Math.max(300, startWidth + deltaX),
        height: Math.max(200, startHeight + deltaY)
      })
    }
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [windowState.id, windowState.size, updateWindowSize])
  
  // Handle keyboard shortcuts (ESC to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isActive && e.key === 'Escape') {
        handleClose()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isActive, handleClose])
  
  // Focus trap for accessibility
  useEffect(() => {
    if (isActive && windowRef.current) {
      const focusableElements = windowRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusableElements.length > 0) {
        focusableElements[0].focus()
      }
    }
  }, [isActive])
  
  // Don't render if minimized
  if (windowState.minimized) {
    return null
  }
  
  const windowStyle: React.CSSProperties = windowState.maximized
    ? {}
    : {
        left: windowState.position.x,
        top: windowState.position.y,
        width: windowState.size.width,
        height: windowState.size.height,
        zIndex: windowState.zIndex
      }
  
  const className = [
    styles.window,
    isClosing && styles.closing,
    windowState.maximized && styles.maximized,
    !isActive && styles.inactive
  ].filter(Boolean).join(' ')
  
  return (
    <div
      ref={windowRef}
      className={className}
      style={windowStyle}
      onClick={handleWindowClick}
      role="dialog"
      aria-labelledby={`window-title-${windowState.id}`}
      aria-modal="false"
    >
      {/* Title Bar */}
      <div 
        className={styles.titleBar}
        onMouseDown={handleMouseDown}
      >
        <div className={styles.trafficLights}>
          <button
            className={`${styles.trafficBtn} ${styles.close}`}
            onClick={handleClose}
            aria-label="Close window"
            title="Close"
          >
            ×
          </button>
          <button
            className={`${styles.trafficBtn} ${styles.minimize}`}
            onClick={handleMinimize}
            aria-label="Minimize window"
            title="Minimize"
          >
            −
          </button>
          <button
            className={`${styles.trafficBtn} ${styles.maximize}`}
            onClick={handleMaximize}
            aria-label="Maximize window"
            title="Maximize"
          >
            +
          </button>
        </div>
        
        <span 
          className={styles.title}
          id={`window-title-${windowState.id}`}
        >
          {windowState.title}
        </span>
      </div>
      
      {/* Content */}
      <div className={styles.content}>
        {children}
      </div>
      
      {/* Resize Handle */}
      {!windowState.maximized && (
        <div 
          className={styles.resizeHandle}
          onMouseDown={handleResizeMouseDown}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

export default memo(Window)
