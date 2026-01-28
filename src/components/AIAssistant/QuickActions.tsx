import React from 'react';
import styles from './AIAssistant.module.css';
import { PersonaType, personaSuggestions, commonSuggestions } from '../../utils/personaConfig';

interface QuickActionsProps {
  persona: PersonaType | null;
  onSelect: (query: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ persona, onSelect }) => {
  const suggestions = persona ? personaSuggestions[persona] : commonSuggestions;

  return (
    <div className={styles.suggestions}>
      {suggestions.map((s, i) => (
        <button
          key={i}
          className={styles.chip}
          onClick={() => onSelect(s)}
          aria-label={`Ask: ${s}`}
        >
          {s.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
