const fs = require('fs');
const path = require('path');

const tsxPath = path.join(__dirname, '../src/components/AIAssistant/AIAssistant.tsx');
let tsxContent = fs.readFileSync(tsxPath, 'utf8');

const newComponent = `
// TODO: restore AssistantWidget after API key rotation and proxy implementation
const AIAssistant: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: '2-digit', year: 'numeric'
  }).toUpperCase().replace(/,/g, '');

  return (
    <div className={styles.maintenanceContainer}>
      {/* Title Bar */}
      <div className={styles.maintenanceTitleBar}>
        <div className={styles.windowControls}>
          <div className={styles.macDot} style={{ backgroundColor: '#ff5f57' }} />
          <div className={styles.macDot} style={{ backgroundColor: '#febc2e' }} />
          <div className={styles.macDot} style={{ backgroundColor: '#28c840' }} />
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
            <a href="mailto:anurag@anuragtripathi.pro" className={styles.contactLink}>
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

/*
`;

tsxContent = tsxContent.replace('const AIAssistant: React.FC = () => {', newComponent + 'const AIAssistant_OLD: React.FC = () => {');
tsxContent = tsxContent.replace('export default AIAssistant;', '*/');

fs.writeFileSync(tsxPath, tsxContent);
console.log('AIAssistant.tsx updated');

const cssPath = path.join(__dirname, '../src/components/AIAssistant/AIAssistant.module.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

if (!cssContent.includes('.maintenanceContainer')) {
const cssToAdd = `

/* MAINTENANCE SCREEN */
.maintenanceContainer {
  background: #0a0a0a;
  border: 2px solid #333;
  border-radius: 4px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.maintenanceTitleBar {
  background: #1a1a1a;
  border-bottom: 1px solid #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 12px;
}

.windowControls {
  display: flex;
  gap: 6px;
}

.macDot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.titleText {
  font-family: 'VT323', monospace;
  color: #888;
  letter-spacing: 2px;
  font-size: 16px;
}

.dateText {
  font-family: 'Share Tech Mono', monospace;
  color: #888;
  font-size: 12px;
}

.maintenanceBody {
  background: #0a0a0a;
  padding: 24px 28px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
}

.headerBlock {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.warningTitle {
  font-family: 'VT323', monospace;
  font-size: 22px;
  color: #febc2e;
  letter-spacing: 3px;
}

.subtitle {
  font-family: 'Share Tech Mono', monospace;
  font-size: 11px;
  color: #555;
  letter-spacing: 1px;
}

.terminalLines {
  font-family: 'Share Tech Mono', monospace;
  font-size: 13px;
  line-height: 2;
  display: flex;
  flex-direction: column;
}

.label {
  color: #555;
}

.divider {
  border-top: 1px dashed #1f1f1f;
  margin: 4px 0;
}

.progressSection {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.progressLabel {
  font-family: 'Share Tech Mono', monospace;
  font-size: 12px;
  color: #555;
}

.progressTrack {
  flex: 1;
  height: 6px;
  background: #1a1a1a;
  border: 1px solid #333;
  position: relative;
  overflow: hidden;
}

.progressFill {
  height: 100%;
  background: #febc2e;
  animation: progressAnim 2s ease-in-out infinite alternate;
}

@keyframes progressAnim {
  0% { width: 72%; }
  100% { width: 78%; }
}

.progressPercent {
  font-family: 'Share Tech Mono', monospace;
  font-size: 12px;
  color: #febc2e;
}

.progressSubtext {
  font-family: 'Share Tech Mono', monospace;
  font-size: 11px;
  color: #333;
  white-space: pre;
}

.statusLine {
  font-family: 'Share Tech Mono', monospace;
  font-size: 13px;
  color: #00ff41;
  display: flex;
  align-items: center;
  gap: 8px;
}

.blinkingCursor {
  display: inline-block;
  width: 8px;
  height: 14px;
  background: #00ff41;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.contactBlock {
  margin-top: auto;
  font-family: 'Share Tech Mono', monospace;
  font-size: 11px;
  color: #444;
  line-height: 1.8;
}

.contactLink {
  color: #555;
  text-decoration: none;
  border-bottom: 1px dashed #333;
  transition: all 0.2s;
}

.contactLink:hover {
  color: #00ff41;
  border-bottom-color: #00ff41;
}
`;
  fs.appendFileSync(cssPath, cssToAdd);
  console.log('AIAssistant.module.css updated');
}
