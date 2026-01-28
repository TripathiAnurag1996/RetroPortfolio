import { memo, useCallback } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { BackgroundType } from '../../types'
import styles from './SettingsWindow.module.css'

const BACKGROUNDS: { id: BackgroundType; label: string }[] = [
  { id: 'clouds', label: 'CLOUDS' },
  { id: 'street', label: 'STREET' },
  { id: 'beach', label: 'BEACH' },
  { id: 'meadow', label: 'MEADOW' },
  { id: 'night', label: 'NIGHT' },
  { id: 'retro-room', label: 'RETRO ROOM' },
  { id: 'pixel-sky', label: 'PIXEL SKY' },
  { id: 'vaporwave', label: 'VAPORWAVE' },
  { id: 'crt-noise', label: 'CRT NOISE' },
  { id: 'minimal', label: 'MINIMAL' },
  { id: 'warm-neutral', label: 'WARM NEUTRAL' },
  { id: 'cool-gray', label: 'COOL GRAY' },
  { id: 'lavender', label: 'LAVENDER' },
  { id: 'forest', label: 'FOREST' },
]

function SettingsWindow() {
  const { theme, background, setTheme, setBackground } = useTheme()
  
  const handleThemeChange = useCallback((newTheme: 'light' | 'dark') => {
    setTheme(newTheme)
  }, [setTheme])
  
  const handleBackgroundChange = useCallback((bg: BackgroundType) => {
    setBackground(bg)
  }, [setBackground])
  
  return (
    <div className={styles.settings}>
      {/* Appearance Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Appearance</h2>
        <div className={styles.toggleGroup} role="radiogroup" aria-label="Theme selection">
          <button
            className={`${styles.toggleBtn} ${theme === 'light' ? styles.active : ''}`}
            onClick={() => handleThemeChange('light')}
            role="radio"
            aria-checked={theme === 'light'}
          >
            <span className={styles.toggleIcon}>☀</span>
            Light
          </button>
          <button
            className={`${styles.toggleBtn} ${theme === 'dark' ? styles.active : ''}`}
            onClick={() => handleThemeChange('dark')}
            role="radio"
            aria-checked={theme === 'dark'}
          >
            <span className={styles.toggleIcon}>☾</span>
            Dark
          </button>
        </div>
      </section>
      
      {/* Background Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Background</h2>
        <div 
          className={styles.backgroundGrid}
          role="radiogroup"
          aria-label="Background selection"
        >
          {BACKGROUNDS.map((bg) => (
            <button
              key={bg.id}
              className={`${styles.backgroundOption} ${background === bg.id ? styles.selected : ''}`}
              onClick={() => handleBackgroundChange(bg.id)}
              role="radio"
              aria-checked={background === bg.id}
              aria-label={bg.label}
              title={bg.label}
            >
              <div className={styles.bgPreview} data-bg={bg.id} />
              <span className={styles.bgLabel}>{bg.label}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

export default memo(SettingsWindow)
