import React from 'react';
import styles from './HelpWindow.module.css';
import { event } from '../../lib/gtag';

const HELP_DATA = {
  services: [
    'PRODUCT MANAGEMENT (AI / TECH)',
    'STARTUP CONSULTATION',
    'PRODUCT CONSULTATION',
    'MENTORSHIP',
    'FOR HIRING'
  ],
  email: 'ANURAG@ANURAGTRIPATHI.PRO',
  socials: [
    { label: 'L', name: 'LINKEDIN.COM/IN/ANURAGTRIPATHI-PM', url: 'https://www.linkedin.com/in/anuragtripathi-pm/' },
    { label: 'X', name: 'X.COM/ANURAGSHIPS', url: 'https://x.com/anuragships' }
  ]
};

const HelpWindow: React.FC = () => {
  return (
    <div className={styles.helpContainer}>
      <section className={styles.section}>
        <h2 className={styles.title}>NEED HELP WITH</h2>
        <ul className={styles.list}>
          {HELP_DATA.services.map((service, index) => (
            <li key={index} className={styles.listItem}>
              {service}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <div className={styles.emailWrapper}>
          <span className={styles.emailIcon}>✉</span>
          <a 
            href={`mailto:${HELP_DATA.email}`} 
            className={styles.emailLink}
            onClick={() => event('contact_initiated', { category: 'conversion', label: 'mailto_click', source: 'contact_window' })}
          >
            {HELP_DATA.email}
          </a>
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.socialLabel}>OR CONTACT ME ON MY SOCIALS:</p>
        <div className={styles.socialList}>
          {HELP_DATA.socials.map((social, index) => (
            <div key={index} className={styles.socialItem}>
              <span className={styles.socialPlatform}>{social.label}:</span>
              <a 
                href={social.url} 
                target="_blank" 
                rel="me noopener noreferrer" 
                className={styles.socialLink}
                onClick={() => event('social_profile_clicked', { category: 'engagement', label: social.label === 'X' ? 'twitter' : 'linkedin', source: 'contact_window' })}
              >
                {social.name}
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HelpWindow;
