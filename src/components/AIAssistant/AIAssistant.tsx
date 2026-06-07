import React from 'react';
import styles from './AIAssistant.module.css';
import { event } from '../../lib/gtag';
import { useDraggable } from '../../hooks/useDraggable';
import { useWindows } from '../../context/WindowContext';


// TODO: restore AssistantWidget after API key rotation and proxy implementation
const AIAssistant: React.FC = () => {
  const { handleMouseDown } = useDraggable({ windowId: 'assistant' });
  const { closeWindow, minimizeWindow, maximizeWindow } = useWindows();

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: '2-digit', year: 'numeric'
  }).toUpperCase().replace(/,/g, '');

  return (
    <div className={styles.maintenanceContainer}>
      {/* Title Bar */}
      <div className={styles.maintenanceTitleBar} onMouseDown={handleMouseDown}>
        <div className={styles.windowControls}>
          <div className={styles.macDot} style={{ backgroundColor: '#ff5f57', cursor: 'pointer' }} onClick={() => closeWindow('assistant')} />
          <div className={styles.macDot} style={{ backgroundColor: '#febc2e', cursor: 'pointer' }} onClick={() => minimizeWindow('assistant')} />
          <div className={styles.macDot} style={{ backgroundColor: '#28c840', cursor: 'pointer' }} onClick={() => maximizeWindow('assistant')} />
        </div>
        <div className={styles.titleText}>ANURAG OS — SYSTEM TERMINAL</div>
        <div className={styles.dateText}>{currentDate}</div>
      </div>

      {/* Body */}
      <div className={styles.maintenanceBody}>
        <div className={styles.headerBlock}>
          <div className={styles.warningTitle}>⚠ SYSTEM MAINTENANCE</div>
          <div className={styles.subtitle}>// MODULE: ANURAG_OS_ASSISTANT | STATUS: OFFLINE</div>
        </div>

        <div className={styles.terminalLines}>
          <div><span className={styles.label}>{'> PROCESS     :'}</span> <span style={{ color: '#ff5f57' }}>SUSPENDED</span></div>
          <div><span className={styles.label}>{'> MODULE      :'}</span> <span style={{ color: '#00ff41' }}>anurag_os_assistant.exe</span></div>
          <div><span className={styles.label}>{'> REASON      :'}</span> <span style={{ color: '#febc2e' }}>scheduled core upgrades in progress</span></div>
          <div><span className={styles.label}>{'> ETA         :'}</span> <span style={{ color: '#00ff41' }}>SOON™</span></div>
        </div>

        <div className={styles.divider} />

        <div className={styles.progressSection}>
          <div className={styles.progressLabel}>restoration progress</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} />
            </div>
            <div className={styles.progressPercent}>~75%</div>
          </div>
          <div className={styles.progressSubtext}>
            [ ███████████████░░░░░ ] upgrading neural pathways...
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.statusLine}>
          <span>{'> system will resume normal operations shortly'}</span>
          <span className={styles.blinkingCursor} />
        </div>

        <div className={styles.contactBlock}>
          <div>{'> have a query in the meantime?'}</div>
          <div>
            {'> write to '}
            <a 
              href="mailto:anurag@anuragtripathi.pro" 
              className={styles.contactLink}
              onClick={() => event('contact_initiated', { category: 'conversion', label: 'mailto_click', source: 'contact_window' })}
            >
              anurag@anuragtripathi.pro
            </a>
            {' — he reads every mail.'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
