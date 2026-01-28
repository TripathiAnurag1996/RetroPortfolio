// Window State Types
export interface WindowState {
  id: string
  title: string
  icon: string
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
  minimized: boolean
  maximized: boolean
}

export interface WindowContextType {
  windows: WindowState[]
  activeWindowId: string | null
  openWindow: (id: string) => void
  closeWindow: (id: string) => void
  focusWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  restoreWindow: (id: string) => void
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void
  updateWindowSize: (id: string, size: { width: number; height: number }) => void
}

// Theme Types
export type BackgroundType = 
  | 'warm-neutral' 
  | 'cool-gray' 
  | 'lavender' 
  | 'forest' 
  | 'sunset' 
  | 'clouds' 
  | 'street' 
  | 'beach'
  | 'meadow'
  | 'night'
  | 'retro-room'
  | 'pixel-sky'
  | 'vaporwave'
  | 'crt-noise'
  | 'minimal'

export interface ThemeContextType {
  theme: 'light' | 'dark'
  background: BackgroundType
  setTheme: (theme: 'light' | 'dark') => void
  setBackground: (background: BackgroundType) => void
}

// Desktop Icon Types
export interface DesktopIconData {
  id: string
  label: string
  icon: string
  windowId?: string
  externalUrl?: string
  position: { row: number; col: number }
}

// Menu Types
export interface MenuItem {
  label: string
  action?: () => void
  submenu?: MenuItem[]
  divider?: boolean
}
