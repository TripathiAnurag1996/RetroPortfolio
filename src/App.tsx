import { HelmetProvider } from 'react-helmet-async'
import { WindowProvider } from './context/WindowContext'
import { ThemeProvider } from './context/ThemeContext'
import Desktop from './components/Desktop/Desktop'
import SEO from './components/SEO/SEO'
import CookieConsent from './components/Common/CookieConsent'

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <WindowProvider>
          <SEO />
          <Desktop />
          <CookieConsent />
        </WindowProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
