import React from 'react';
import styles from './AIAssistant.module.css';
import { PersonaType } from '../../utils/personaConfig';

interface PersonaSelectorProps {
  onSelect: (persona: PersonaType) => void;
  onCancel?: () => void;
}

const personas: { type: PersonaType; label: string; icon: string }[] = [
  { type: 'recruiter', label: 'RECRUITER / HR', icon: '' },
  { type: 'hiring_manager', label: 'HIRING MANAGER', icon: '' },
  { type: 'founder', label: 'FOUNDER / STARTUP', icon: '' },
  { type: 'engineer', label: 'ENGINEER / TECHNICAL', icon: '' },
  { type: 'student', label: 'STUDENT / LEARNING', icon: '' },
  { type: 'browsing', label: 'JUST BROWSING', icon: '' },
];

const PersonaSelector: React.FC<PersonaSelectorProps> = ({ onSelect, onCancel }) => {
  return (
    <div className={styles.personaDialog}>
      <div className={styles.dialogHeader}>
        <span>SYSTEM IDENTITY SELECTOR</span>
        {onCancel && (
          <button className={styles.closeBtn} onClick={onCancel} title="Cancel">×</button>
        )}
      </div>
      <p className={styles.searchLabel} style={{ marginBottom: '16px', color: '#000080' }}>
        SELECT SOURCE IDENTITY FOR QUERY CONTEXT:
      </p>
      <div className={styles.personaList}>
        {personas.map((p) => (
          <button
            key={p.type}
            className={styles.personaBtn}
            onClick={() => onSelect(p.type)}
          >
            {p.label.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PersonaSelector;
