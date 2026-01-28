import { memo, lazy, Suspense } from 'react'
import { useWindows } from '../../context/WindowContext'
import Window from './Window'

// Lazy load window content
const AboutWindow = lazy(() => import('../Windows/AboutWindow'))
const SettingsWindow = lazy(() => import('../Windows/SettingsWindow'))
const MyComputerWindow = lazy(() => import('../Windows/MyComputerWindow'))
const DocumentsWindow = lazy(() => import('../Windows/DocumentsWindow'))
const MusicWindow = lazy(() => import('../Windows/MusicWindow'))
const GuestbookWindow = lazy(() => import('../Windows/GuestbookWindow'))
const PaintWindow = lazy(() => import('../Windows/PaintWindow'))
const WelcomeWindow = lazy(() => import('../Windows/WelcomeWindow'))
const SnakeGameWindow = lazy(() => import('../Windows/SnakeGameWindow'))
const HelpWindow = lazy(() => import('../Windows/HelpWindow'))
const AIAssistant = lazy(() => import('../AIAssistant/AIAssistant'))
const ProductAnalyzer = lazy(() => import('../AIDemos/ProductAnalyzer'))
const Browser = lazy(() => import('../Browser/Browser'))

// Loading spinner
function WindowLoadingSpinner() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      fontFamily: 'var(--font-retro)',
      fontSize: '18px',
      color: '#666'
    }}>
      Loading...
    </div>
  )
}

// Window content mapping
const windowComponents: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  'about': AboutWindow,
  'settings': SettingsWindow,
  'my-computer': MyComputerWindow,
  'documents': DocumentsWindow,
  'music': MusicWindow,
  'guestbook': GuestbookWindow,
  'paint': PaintWindow,
  'welcome': WelcomeWindow,
  'snakegame': SnakeGameWindow,
  'help': HelpWindow,
  'assistant': AIAssistant,
  'demo': ProductAnalyzer,
  'browser': Browser
}

function WindowManager() {
  const { windows, activeWindowId } = useWindows()
  
  return (
    <>
      {windows.map((windowState) => {
        const ContentComponent = windowComponents[windowState.id]
        
        if (!ContentComponent) {
          return null
        }
        
        return (
          <Window 
            key={windowState.id}
            window={windowState}
            isActive={activeWindowId === windowState.id}
          >
            <Suspense fallback={<WindowLoadingSpinner />}>
              <ContentComponent />
            </Suspense>
          </Window>
        )
      })}
    </>
  )
}

export default memo(WindowManager)
