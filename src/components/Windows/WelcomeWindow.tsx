import { memo } from 'react'
import OptimizedImage from '../Common/OptimizedImage'
import styles from './WelcomeWindow.module.css'

function WelcomeWindow() {


  return (
    <div className={styles.welcome}>
      {/* Top section: Folder icon and bold text heading */}
      <div className={styles.headingArea}>
        <span className={styles.folderIcon}>📁</span>
        <h2 className={styles.heading}>SYSTEM OVERVIEW</h2>
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
          <div className={styles.introText}>
            <p className={styles.paragraph}>
              <strong>SYSTEM BOOT COMPLETE... Welcome, Guest!</strong>
            </p>
            <p className={styles.paragraph}>
              I’m Anurag Tripathi — an <strong>AI Product Manager & Founder</strong> building zero-to-one LLM products.
            </p>
            <p className={styles.paragraph}>
              You've just logged into my interactive Retro OS. Don't just read my resume; play with the apps, explore live AI demos, and uncover the product strategies hidden in the system below.
            </p>
            <p className={styles.paragraph}>
              Look around... who knows what Easter eggs you might find? 🕹️✨
            </p>
          </div>
          
          <div className={styles.featureGuide}>
            <h2 className={styles.guideTitle}>What’s inside:</h2>
            <div className={styles.featureGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureCardHeader}>
                  <span className={styles.featureCardIcon}>🤖</span> AI OS ASSISTANT
                </div>
                <div className={styles.featureCardDesc}>Quick access chat for help and portfolio navigation.</div>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureCardHeader}>
                  <span className={styles.featureCardIcon}>🧠</span> AI DEMOS
                </div>
                <div className={styles.featureCardDesc}>Explore live AI product insights and analyzer tools.</div>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureCardHeader}>
                  <span className={styles.featureCardIcon}>🎮</span> RETRO GAMES
                </div>
                <div className={styles.featureCardDesc}>Classic Snack game and more for some nostalgic fun.</div>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureCardHeader}>
                  <span className={styles.featureCardIcon}>🎵</span> MUSIC PLAYER
                </div>
                <div className={styles.featureCardDesc}>Retro jams to listen to while you browse.</div>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureCardHeader}>
                  <span className={styles.featureCardIcon}>🖌️</span> PAINT
                </div>
                <div className={styles.featureCardDesc}>A fully functional pixel-art drawing application.</div>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureCardHeader}>
                  <span className={styles.featureCardIcon}>🌐</span> INTERNET
                </div>
                <div className={styles.featureCardDesc}>Authentic 90s browser experience.</div>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureCardHeader}>
                  <span className={styles.featureCardIcon}>📖</span> GUESTBOOK
                </div>
                <div className={styles.featureCardDesc}>Leave a message and connect with me!</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer row (Status Bar style) */}
      <footer className={styles.footer}>
        <div className={styles.charCount}>
          © 2026 Anurag Tripathi
        </div>
        <div className={styles.builtWith}>
          Built with ❤️
        </div>
        <div className={styles.viewOnly}>
          Runs on Nostalgia 🕹️
        </div>
      </footer>
    </div>
  )
}

export default memo(WelcomeWindow)
