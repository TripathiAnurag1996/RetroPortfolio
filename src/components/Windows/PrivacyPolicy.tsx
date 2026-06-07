import { memo } from 'react'

const PrivacyPolicy = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'var(--font-retro)', lineHeight: '1.6' }}>
      <h2>Privacy Policy</h2>
      <p>Last Updated: June 07, 2026</p>
      
      <h3>1. Data Collection</h3>
      <p>
        This portfolio uses Google Analytics 4 (GA4) to understand visitor behavior and improve the user experience. 
        Only anonymized data is collected, such as page views, time on site, and general geographic location.
      </p>

      <h3>2. Cookies</h3>
      <p>
        Google Analytics 4 and Microsoft Clarity are loaded ONLY 
        after explicit cookie consent is granted. No tracking scripts 
        execute before consent.
      </p>

      <h3>3. Session Recording (Microsoft Clarity)</h3>
      <p>
        This site uses Microsoft Clarity for session recording and heatmap analytics. 
        Clarity may record mouse movements, clicks, and scrolling behaviour. Input fields 
        containing personal information are masked and not recorded. Clarity data is 
        processed by Microsoft. You can opt out via your cookie preferences.
      </p>

      <h3>4. Guestbook Data</h3>
      <p>
        Messages submitted via the Guestbook window are stored for the purpose of 
        displaying visitor interactions. Do not include sensitive personal information 
        in guestbook submissions.
      </p>

      <h3>5. External Links</h3>
      <p>
        This site contains links to external platforms like LinkedIn and GitHub. 
        We are not responsible for the privacy practices of those third-party sites.
      </p>

      <h3>6. Contact</h3>
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
