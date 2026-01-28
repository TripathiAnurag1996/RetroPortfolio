import React, { useState, useEffect, useRef } from 'react';
import styles from './AIAssistant.module.css';
import PersonaSelector from './PersonaSelector';
import QuickActions from './QuickActions';
import { PersonaType } from '../../utils/personaConfig';
import { getAIResponse } from '../../utils/aiService';
import { playClickSound, playMessageSound } from '../../utils/audio';

const AIAssistant: React.FC = () => {
  const [persona, setPersona] = useState<PersonaType | null>(() => {
    return localStorage.getItem('visitorPersona') as PersonaType | null;
  });
  const [isSelectingPersona, setIsSelectingPersona] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<{q: string, a: string}[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const responseEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    responseEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [response, isLoading, history]);

  // Handle queries passed from the SearchBar
  useEffect(() => {
    const handleCustomEvent = (e: any) => {
      const q = e.detail;
      if (q && persona) {
        handleQuery(q);
      }
    };

    window.addEventListener('ai_assistant_query', handleCustomEvent);
    
    // Check for pending query on mount
    const pendingQuery = sessionStorage.getItem('ai_query');
    if (pendingQuery && persona) {
      sessionStorage.removeItem('ai_query');
      handleQuery(pendingQuery);
    }

    return () => window.removeEventListener('ai_assistant_query', handleCustomEvent);
  }, [persona]);

  // Auto-focus input when component becomes visible or persona is selected
  useEffect(() => {
    if (persona && !isLoading) {
      // Small delay to ensure the window is rendered and transition completes
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [persona, isLoading]);

  const handleQuery = async (q: string) => {
    if (!q.trim() || !persona) return;
    
    setIsLoading(true);
    setError(null);
    setQuery(q);
    playClickSound();

    try {
      const aiResponse = await getAIResponse(q, persona);
      setResponse(aiResponse);
      setHistory(prev => [{q, a: aiResponse}, ...prev].slice(0, 5));
      playMessageSound();
    } catch (err: any) {
      console.error(err);
      if (err.message.includes('rate limit')) {
        setError('⚠️ Too many questions! Even AI needs a break. Try again in a moment.');
      } else {
        setError('❌ Connection lost to the AI mainframe. Check your internet and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePersonaSelect = (p: PersonaType) => {
    setPersona(p);
    setIsSelectingPersona(false);
    localStorage.setItem('visitorPersona', p);
    playClickSound();
    
    // Check if there was a pending query
    const pendingQuery = sessionStorage.getItem('ai_query');
    if (pendingQuery) {
      sessionStorage.removeItem('ai_query');
      handleQuery(pendingQuery);
    }
  };

  if (!persona || isSelectingPersona) {
    return (
      <div className={styles.assistantContainer}>
        <PersonaSelector 
          onSelect={handlePersonaSelect} 
          onCancel={persona ? () => setIsSelectingPersona(false) : undefined}
        />
      </div>
    );
  }

  return (
    <div className={styles.assistantContainer}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', padding: '2px 4px', borderBottom: '1px solid #808080' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span className={styles.searchLabel}>PERSONA:</span>
          <span className={styles.personaBadge} onClick={() => setIsSelectingPersona(true)} title="Change Persona">
            {persona.toUpperCase().replace('_', ' ')}
          </span>
        </div>
      </div>

      <div className={styles.searchBarWrapper}>
        <label htmlFor="ai-search" className={styles.searchLabel}>ASK:</label>
        <form onSubmit={(e) => { e.preventDefault(); handleQuery(query); }} style={{ display: 'flex', gap: '4px' }}>
          <input
            id="ai-search"
            ref={inputRef}
            type="text"
            className={styles.searchInput}
            placeholder="Type your question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className={styles.chip} style={{ padding: '0 8px', minWidth: '50px' }}>RUN</button>
        </form>
      </div>

      <div className={styles.responseArea}>
        {isLoading ? (
          <div className={styles.loading}>
            <img src="/icons/hourglass.png" alt="" className={styles.hourglass} style={{ width: '16px', height: '16px' }} />
            <span>PROCESSING REQUEST...</span>
          </div>
        ) : error ? (
          <div style={{ color: '#800000', fontWeight: 'bold' }}>{error}</div>
        ) : response ? (
          <div>
            <div style={{ whiteSpace: 'pre-wrap' }}>{response}</div>
          </div>
        ) : (
          <div style={{ color: '#404040', textAlign: 'center', marginTop: '30px' }}>
            System ready. Select a topic below or type a query to begin.
          </div>
        )}
        <div ref={responseEndRef} />
      </div>

      <div style={{ padding: '4px 0' }}>
        <QuickActions persona={persona} onSelect={handleQuery} />
      </div>

      <div className={styles.responseFooter} style={{ borderTop: '1px solid #808080', paddingTop: '4px' }}>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flex: 1 }}>
          <span className={styles.searchLabel} style={{ fontSize: '9px' }}>HIST:</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            {history.map((h, i) => (
              <div 
                key={i} 
                className={styles.historyIcon} 
                onClick={() => { setQuery(h.q); setResponse(h.a); }}
                title={h.q}
                role="button"
                aria-label={`Previous query: ${h.q}`}
                style={{ fontSize: '12px', border: '1px solid #808080', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}
              >
                ?
              </div>
            ))}
          </div>
          {history.length > 0 && (
            <button 
              onClick={() => { setHistory([]); setResponse(''); setQuery(''); }}
              className={styles.chip}
              style={{ padding: '0 4px', fontSize: '9px', height: '14px' }}
            >
              CLR
            </button>
          )}
        </div>
        <div style={{ fontSize: '10px', opacity: 0.6 }}>{new Date().toLocaleTimeString()}</div>
      </div>
    </div>
  );
};

export default AIAssistant;
