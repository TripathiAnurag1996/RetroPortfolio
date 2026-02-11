import React from 'react';
import styles from './HelpWindow.module.css';

const HELP_DATA = {
  services: [
    'PRODUCT MANAGEMENT (AI / TECH)',
    'STARTUP CONSULTATION',
    'PRODUCT CONSULTATION',
    'MENTORSHIP',
    'FOR HIRING'
  ],
  email: 'ANURAG.AKT@GMAIL.COM',
  socials: [
    { label: 'L', name: 'LINKEDIN.COM/IN/ANURAGTRIPATHI-PM', url: 'https://www.linkedin.com/in/anuragtripathi-pm/' }
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
                rel="noopener noreferrer" 
                className={styles.socialLink}
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
