import { useEffect, useCallback } from 'react'
import { useWindows } from '../context/WindowContext'

export function useKeyboardShortcuts() {
  const { windows, activeWindowId, closeWindow, minimizeWindow, maximizeWindow } = useWindows()
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Escape - close active window
    if (e.key === 'Escape' && activeWindowId) {
      e.preventDefault()
      closeWindow(activeWindowId)
      return
    }
    
    // Ctrl/Cmd + M - minimize active window
    if ((e.ctrlKey || e.metaKey) && e.key === 'm' && activeWindowId) {
      e.preventDefault()
      minimizeWindow(activeWindowId)
      return
    }
    
    // F11 - toggle maximize
    if (e.key === 'F11' && activeWindowId) {
      e.preventDefault()
      maximizeWindow(activeWindowId)
      return
    }
    
    // Alt + Tab - cycle windows
    if (e.altKey && e.key === 'Tab' && windows.length > 1) {
      e.preventDefault()
      const currentIndex = windows.findIndex(w => w.id === activeWindowId)
      const nextIndex = (currentIndex + 1) % windows.length
      const nextWindow = windows[nextIndex]
      if (nextWindow) {
        // Focus handled by window click
      }
    }
  }, [activeWindowId, windows, closeWindow, minimizeWindow, maximizeWindow])
  
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}
