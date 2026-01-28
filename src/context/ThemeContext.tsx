import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { ThemeContextType, BackgroundType } from '../types'

// Storage keys
const THEME_KEY = 'os.theme'
const BACKGROUND_KEY = 'os.wallpaper'

// Default values
const DEFAULT_THEME = 'light' as const
const DEFAULT_BACKGROUND: BackgroundType = 'clouds'

// Context
const ThemeContext = createContext<ThemeContextType | null>(null)

// Provider
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY)
      return saved === 'dark' ? 'dark' : DEFAULT_THEME
    } catch {
      return DEFAULT_THEME
    }
  })
  
  const [background, setBackgroundState] = useState<BackgroundType>(() => {
    try {
      const saved = localStorage.getItem(BACKGROUND_KEY)
      return (saved as BackgroundType) || DEFAULT_BACKGROUND
    } catch {
      return DEFAULT_BACKGROUND
    }
  })
  
  // Persist theme
  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme)
      document.documentElement.setAttribute('data-theme', theme)
    } catch {
      // Storage not available
    }
  }, [theme])
  
  // Persist background
  useEffect(() => {
    try {
      localStorage.setItem(BACKGROUND_KEY, background)
    } catch {
      // Storage not available
    }
  }, [background])
  
  const setTheme = useCallback((newTheme: 'light' | 'dark') => {
    setThemeState(newTheme)
  }, [])
  
  const setBackground = useCallback((newBackground: BackgroundType) => {
    setBackgroundState(newBackground)
  }, [])
  
  const value: ThemeContextType = {
    theme,
    background,
    setTheme,
    setBackground
  }
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

// Hook
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
