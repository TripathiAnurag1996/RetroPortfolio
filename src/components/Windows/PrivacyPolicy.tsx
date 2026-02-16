import { memo } from 'react'

const PrivacyPolicy = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'var(--font-retro)', lineHeight: '1.6' }}>
      <h1>Privacy Policy</h1>
      <p>Last Updated: February 2026</p>
      
      <h3>1. Data Collection</h3>
      <p>
        This portfolio uses Google Analytics 4 (GA4) to understand visitor behavior and improve the user experience. 
        Only anonymized data is collected, such as page views, time on site, and general geographic location.
      </p>

      <h3>2. Cookies</h3>
      <p>
        Cookies are used by GA4 only if you provide explicit consent via the cookie banner. 
        You can withdraw your consent at any time by clearing your browser cookies.
      </p>

      <h3>3. External Links</h3>
      <p>
        This site contains links to external platforms like LinkedIn and GitHub. 
        We are not responsible for the privacy practices of those third-party sites.
      </p>

      <h3>4. Contact</h3>
      <p>
        If you have any questions regarding your privacy, feel free to contact me via LinkedIn.
      </p>

      <div style={{ marginTop: '40px', borderTop: '2px solid #000', paddingTop: '10px', fontSize: '12px' }}>
        © 2026 Anurag Tripathi. Built with privacy in mind.
      </div>
    </div>
  )
}

export default memo(PrivacyPolicy)
