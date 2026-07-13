import { useState, useEffect } from 'react'

import styles from './CookieConsent.module.css'

const CookieConsent = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShow(true)
    } else if (consent === 'accepted') {
      // GA is handled by GoogleAnalytics component listening to cookieConsentGranted
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    window.dispatchEvent(new Event('cookieConsentGranted'));
    setShow(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className={styles.banner}>
      <p className={styles.text}>
        We use cookies to improve your experience. By continuing, you agree to our 
        <button className={styles.link} onClick={() => { /* open privacy window logic if needed */ }}>Privacy Policy</button>.
      </p>
      <div className={styles.actions}>
        <button className={styles.accept} onClick={handleAccept}>Accept</button>
        <button className={styles.decline} onClick={handleDecline}>Decline</button>
      </div>
    </div>
  )
}

export default CookieConsent
