import { useState, useEffect, useCallback } from 'react'

type LayoutMode = 'desktop' | 'tablet' | 'mobile'

interface ResponsiveState {
  layoutMode: LayoutMode
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  width: number
  height: number
}

const BREAKPOINTS = {
  mobile: 767,
  tablet: 1023
}

function getLayoutMode(width: number): LayoutMode {
  if (width <= BREAKPOINTS.mobile) return 'mobile'
  if (width <= BREAKPOINTS.tablet) return 'tablet'
  return 'desktop'
}

export function useResponsive(): ResponsiveState {
  const [state, setState] = useState<ResponsiveState>(() => {
    const width = window.innerWidth
    const height = window.innerHeight
    const layoutMode = getLayoutMode(width)
    
    return {
      layoutMode,
      isMobile: layoutMode === 'mobile',
      isTablet: layoutMode === 'tablet',
      isDesktop: layoutMode === 'desktop',
      width,
      height
    }
  })
  
  const handleResize = useCallback(() => {
    const width = window.innerWidth
    const height = window.innerHeight
    const layoutMode = getLayoutMode(width)
    
    setState({
      layoutMode,
      isMobile: layoutMode === 'mobile',
      isTablet: layoutMode === 'tablet',
      isDesktop: layoutMode === 'desktop',
      width,
      height
    })
  }, [])
  
  useEffect(() => {
    let timeoutId: number
    
    const debouncedResize = () => {
      clearTimeout(timeoutId)
      timeoutId = window.setTimeout(handleResize, 100)
    }
    
    window.addEventListener('resize', debouncedResize)
    return () => {
      window.removeEventListener('resize', debouncedResize)
      clearTimeout(timeoutId)
    }
  }, [handleResize])
  
  return state
}
