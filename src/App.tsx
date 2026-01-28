import { WindowProvider } from './context/WindowContext'
import { ThemeProvider } from './context/ThemeContext'
import Desktop from './components/Desktop/Desktop'

function App() {
  return (
    <ThemeProvider>
      <WindowProvider>
        <Desktop />
      </WindowProvider>
    </ThemeProvider>
  )
}

export default App
