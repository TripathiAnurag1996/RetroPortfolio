import { createContext, useContext, useReducer, useCallback, ReactNode } from 'react'
import { WindowState, WindowContextType } from '../types'
import { WINDOW_CONFIGS } from '../config/windows'
import { playClickSound } from '../utils/audio'

// Constants
const MAX_WINDOWS = 8
const CASCADE_OFFSET = 30
const MIN_WINDOW_SIZE = { width: 300, height: 200 }

// Initial state
interface State {
  windows: WindowState[]
  activeWindowId: string | null
  maxZIndex: number
}

const initialState: State = {
  windows: [],
  activeWindowId: null,
  maxZIndex: 100
}

// Actions
type Action =
  | { type: 'OPEN_WINDOW'; payload: { id: string } }
  | { type: 'CLOSE_WINDOW'; payload: { id: string } }
  | { type: 'FOCUS_WINDOW'; payload: { id: string } }
  | { type: 'MINIMIZE_WINDOW'; payload: { id: string } }
  | { type: 'MAXIMIZE_WINDOW'; payload: { id: string } }
  | { type: 'RESTORE_WINDOW'; payload: { id: string } }
  | { type: 'UPDATE_POSITION'; payload: { id: string; position: { x: number; y: number } } }
  | { type: 'UPDATE_SIZE'; payload: { id: string; size: { width: number; height: number } } }

// Calculate cascade or centered position
function calculatePosition(
  windowIndex: number, 
  windowSize: { width: number; height: number },
  viewport: { width: number; height: number },
  center: boolean = false
) {
  const menubarHeight = 28
  const padding = 20
  const bottomSafeSpace = 90 // Guaranteed space for dock
  
  if (center) {
    const x = Math.max(0, (viewport.width - windowSize.width) / 2)
    // For vertical, we want it perfectly centered in the workspace (between menubar and dock)
    const workspaceHeight = viewport.height - menubarHeight - bottomSafeSpace
    const y = Math.max(menubarHeight, menubarHeight + (workspaceHeight - windowSize.height) / 2)
    return { x, y }
  }

  const baseX = Math.max(padding, (viewport.width - 500) / 2)
  const baseY = Math.max(menubarHeight + padding, (viewport.height - 400) / 2)
  
  return {
    x: baseX + (windowIndex % 5) * CASCADE_OFFSET,
    y: baseY + (windowIndex % 5) * CASCADE_OFFSET
  }
}

// Reducer
function windowReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'OPEN_WINDOW': {
      const { id } = action.payload
      
      // Check if window already exists
      const existingWindow = state.windows.find(w => w.id === id)
      if (existingWindow) {
        // Focus existing window
        return {
          ...state,
          windows: state.windows.map(w => 
            w.id === id 
              ? { ...w, minimized: false, zIndex: state.maxZIndex + 1 }
              : w
          ),
          activeWindowId: id,
          maxZIndex: state.maxZIndex + 1
        }
      }
      
      // Close oldest if at max
      let windows = [...state.windows]
      if (windows.length >= MAX_WINDOWS) {
        windows = windows.slice(1)
      }
      
      // Get window config
      const config = WINDOW_CONFIGS[id]
      if (!config) return state
      
      // Calculate position
      const viewport = { width: window.innerWidth, height: window.innerHeight }
      const windowSize = config.defaultSize || { width: 450, height: 350 }
      const isWelcome = id === 'welcome'
      const position = calculatePosition(windows.length, windowSize, viewport, isWelcome)
      
      const newWindow: WindowState = {
        id,
        title: config.title,
        icon: config.icon,
        position,
        size: windowSize,
        zIndex: state.maxZIndex + 1,
        minimized: false,
        maximized: false
      }
      
      return {
        ...state,
        windows: [...windows, newWindow],
        activeWindowId: id,
        maxZIndex: state.maxZIndex + 1
      }
    }
    
    case 'CLOSE_WINDOW': {
      const { id } = action.payload
      const newWindows = state.windows.filter(w => w.id !== id)
      const newActiveId = state.activeWindowId === id 
        ? (newWindows.length > 0 ? newWindows[newWindows.length - 1].id : null)
        : state.activeWindowId
      
      return {
        ...state,
        windows: newWindows,
        activeWindowId: newActiveId
      }
    }
    
    case 'FOCUS_WINDOW': {
      const { id } = action.payload
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === id ? { ...w, zIndex: state.maxZIndex + 1 } : w
        ),
        activeWindowId: id,
        maxZIndex: state.maxZIndex + 1
      }
    }
    
    case 'MINIMIZE_WINDOW': {
      const { id } = action.payload
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === id ? { ...w, minimized: true } : w
        ),
        activeWindowId: state.activeWindowId === id ? null : state.activeWindowId
      }
    }
    
    case 'MAXIMIZE_WINDOW': {
      const { id } = action.payload
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === id ? { ...w, maximized: !w.maximized, zIndex: state.maxZIndex + 1 } : w
        ),
        activeWindowId: id,
        maxZIndex: state.maxZIndex + 1
      }
    }
    
    case 'RESTORE_WINDOW': {
      const { id } = action.payload
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === id ? { ...w, minimized: false, maximized: false, zIndex: state.maxZIndex + 1 } : w
        ),
        activeWindowId: id,
        maxZIndex: state.maxZIndex + 1
      }
    }
    
    case 'UPDATE_POSITION': {
      const { id, position } = action.payload
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === id ? { ...w, position } : w
        )
      }
    }
    
    case 'UPDATE_SIZE': {
      const { id, size } = action.payload
      // Enforce minimum size
      const constrainedSize = {
        width: Math.max(MIN_WINDOW_SIZE.width, size.width),
        height: Math.max(MIN_WINDOW_SIZE.height, size.height)
      }
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === id ? { ...w, size: constrainedSize } : w
        )
      }
    }
    
    default:
      return state
  }
}

// Context
const WindowContext = createContext<WindowContextType | null>(null)

// Provider
export function WindowProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(windowReducer, initialState)
  
  const openWindow = useCallback((id: string) => {
    playClickSound()
    dispatch({ type: 'OPEN_WINDOW', payload: { id } })
  }, [])
  
  const closeWindow = useCallback((id: string) => {
    dispatch({ type: 'CLOSE_WINDOW', payload: { id } })
  }, [])
  
  const focusWindow = useCallback((id: string) => {
    dispatch({ type: 'FOCUS_WINDOW', payload: { id } })
  }, [])
  
  const minimizeWindow = useCallback((id: string) => {
    dispatch({ type: 'MINIMIZE_WINDOW', payload: { id } })
  }, [])
  
  const maximizeWindow = useCallback((id: string) => {
    dispatch({ type: 'MAXIMIZE_WINDOW', payload: { id } })
  }, [])
  
  const restoreWindow = useCallback((id: string) => {
    dispatch({ type: 'RESTORE_WINDOW', payload: { id } })
  }, [])
  
  const updateWindowPosition = useCallback((id: string, position: { x: number; y: number }) => {
    dispatch({ type: 'UPDATE_POSITION', payload: { id, position } })
  }, [])
  
  const updateWindowSize = useCallback((id: string, size: { width: number; height: number }) => {
    dispatch({ type: 'UPDATE_SIZE', payload: { id, size } })
  }, [])
  
  const value: WindowContextType = {
    windows: state.windows,
    activeWindowId: state.activeWindowId,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    updateWindowPosition,
    updateWindowSize
  }
  
  return (
    <WindowContext.Provider value={value}>
      {children}
    </WindowContext.Provider>
  )
}

// Hook
export function useWindows() {
  const context = useContext(WindowContext)
  if (!context) {
    throw new Error('useWindows must be used within a WindowProvider')
  }
  return context
}
