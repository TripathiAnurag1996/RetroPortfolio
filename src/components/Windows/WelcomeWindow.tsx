import { memo } from 'react'
import OptimizedImage from '../Common/OptimizedImage'
import styles from './WelcomeWindow.module.css'

function WelcomeWindow() {
  const welcomeMessage = `I’m Anurag Tripathi — AI Product Manager & Builder. 
This is my Retro OS Portfolio where you can explore my LLM-powered projects, product strategy, and resume by clicking the icons below. 👋`

  return (
    <div className={styles.welcome}>
      {/* Small icon bar at the very top of content like reference */}
      <div className={styles.iconBar}>
        <span className={styles.folderIcon}>📁</span>
      </div>

      {/* Top section: A bold text heading */}
      <div className={styles.headingArea}>
        <h1 className={styles.heading}>SYSTEM OVERVIEW</h1>
      </div>

      {/* Image section (hero block) */}
      <div className={styles.imageSection}>
        <OptimizedImage 
          src="/WELCOME_RETRO.png" 
          alt="Welcome Hero" 
          className={styles.heroImage}
          width={450}
          height={300}
          priority={true}
        />
      </div>

      {/* Bottom text area section */}
      <div className={styles.messageSection}>
        <div className={styles.textAreaBox}>
          <p className={styles.introText}>{welcomeMessage}</p>
          
          <div className={styles.featureGuide}>
            <h2 className={styles.guideTitle}>What’s inside:</h2>
            <ul className={styles.featureList}>
              <li>
                <strong>🤖 AI OS ASSISTANT:</strong> 
                Quick access chat for help and portfolio navigation.
              </li>
              <li>
                <strong>🧠 AI DEMOS:</strong> 
                Explore live AI product insights and analyzer tools.
              </li>
              <li>
                <strong>🎮 RETRO GAMES:</strong> 
                Classic Snack game and more for some nostalgic fun.
              </li>
              <li>
                <strong>🎵 MUSIC PLAYER:</strong> 
                Retro jams to listen to while you browse.
              </li>
              <li>
                <strong>🖌️ PAINT:</strong> 
                A fully functional pixel-art drawing application.
              </li>
              <li>
                <strong>🌐 INTERNET:</strong> 
                Authentic 90s browser experience.
              </li>
              <li>
                <strong>📖 GUESTBOOK:</strong> 
                Leave a message and connect with me!
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer row (Status Bar style) */}
      <footer className={styles.footer}>
        <div className={styles.charCount}>
          © 2026 Anurag Tripathi
        </div>
        <div className={styles.builtWith}>
          Built with ❤️ ⚡
        </div>
        <div className={styles.viewOnly}>
          Runs on Nostalgia 🕹️
        </div>
      </footer>
    </div>
  )
}

export default memo(WelcomeWindow)
