import React, { useEffect, useCallback } from 'react';
import styles from './AIAssistant.module.css';
import { useWindows } from '../../context/WindowContext';

const OSAssistantTrigger: React.FC = () => {
  const { openWindow } = useWindows();

  const handleTrigger = useCallback(() => {
    openWindow('assistant');
  }, [openWindow]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      handleTrigger();
    }
  }, [handleTrigger]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div 
      className={styles.trayItem}
      onClick={handleTrigger}
      title="Anurag OS Assistant — ask about work, decisions, and products (Ctrl+K)"
      role="button"
      aria-label="Anurag OS Assistant"
    >
      <span className={styles.trayLabel}>ANURAG OS ASSISTANT</span>
    </div>
  );
};

export default OSAssistantTrigger;
