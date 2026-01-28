import { useCallback } from 'react'
import { useWindows } from '../context/WindowContext'

interface UseDraggableOptions {
  windowId: string
  onDragStart?: () => void
  onDragEnd?: () => void
}

export function useDraggable({ windowId, onDragStart, onDragEnd }: UseDraggableOptions) {
  const { updateWindowPosition, focusWindow, windows } = useWindows()
  
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    
    const windowState = windows.find(w => w.id === windowId)
    if (!windowState || windowState.maximized) return
    
    focusWindow(windowId)
    onDragStart?.()
    
    const startX = e.clientX
    const startY = e.clientY
    const startPos = { ...windowState.position }
    
    let animationFrameId: number | null = null
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (animationFrameId) return
      
      animationFrameId = requestAnimationFrame(() => {
        const deltaX = moveEvent.clientX - startX
        const deltaY = moveEvent.clientY - startY
        
        // Calculate new position with boundary constraints
        const viewportWidth = globalThis.window.innerWidth
        const viewportHeight = globalThis.window.innerHeight
        
        const newX = Math.max(0, Math.min(
          viewportWidth - 100,
          startPos.x + deltaX
        ))
        const newY = Math.max(0, Math.min(
          viewportHeight - 50,
          startPos.y + deltaY
        ))
        
        updateWindowPosition(windowId, { x: newX, y: newY })
        animationFrameId = null
      })
    }
    
    const handleMouseUp = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      onDragEnd?.()
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [windowId, windows, updateWindowPosition, focusWindow, onDragStart, onDragEnd])
  
  return { handleMouseDown }
}
