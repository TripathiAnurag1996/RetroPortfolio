import React, { useState, useEffect, useRef } from 'react';
import styles from './AIDemos.module.css';
import { getProductAnalysis } from '../../utils/aiService';
import { PersonaType } from '../../utils/personaConfig';
import { playClickSound, playMessageSound } from '../../utils/audio';

const SCENARIOS = [
  {
    id: 'checkout_dropoff',
    title: 'Checkout Friction Analysis',
    defaultQuery: 'Users drop off heavily between product page and checkout. What could be going wrong?'
  }
];

const ProductAnalyzer: React.FC = () => {
  const [query, setQuery] = useState(SCENARIOS[0].defaultQuery);
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [log, setLog] = useState<string[]>(['System ready.', 'Awaiting user input...']);
  const [selectedPersona, setSelectedPersona] = useState<PersonaType>('recruiter');
  const [showReasoning, setShowReasoning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    setLog(prev => [...prev.slice(-10), `> ${msg}`]);
  };

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [log]);

  const handleRun = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setResponse('');
    setLog(['Initiating analysis...', 'Fetching product signals...']);
    playClickSound();

    try {
      addLog('Evaluating user friction...');
      const result = await getProductAnalysis(query, selectedPersona);
      
      addLog('Synthesizing insights...');
      setTimeout(() => {
        setResponse(result);
        setIsLoading(false);
        addLog('Analysis complete.');
        playMessageSound();
      }, 1000); // Artificial delay for retro feel
    } catch (err: any) {
      console.error(err);
      setError('ANALYSIS FAILED: CONNECTION LOST');
      setIsLoading(false);
      addLog('FATAL ERROR: SIGTERM');
    }
  };

  // Re-run analysis when persona changes if we already have a response
  useEffect(() => {
    if (response && !isLoading) {
      handleRun();
    }
  }, [selectedPersona]);

  return (
    <div className={styles.demoContainer}>
      <div className={styles.layout}>
        {/* Left Panel: Input */}
        <div className={`${styles.panel} ${styles.inputPanel}`}>
          <div className={styles.panelTitle}>Input Control</div>
          <div className={styles.scenarioTitle}>Product Scenario</div>
          <textarea 
            className={styles.inputArea}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
          />
          <button 
            className={styles.runBtn} 
            onClick={handleRun}
            disabled={isLoading}
          >
            {isLoading ? 'ANALYZING...' : 'RUN ANALYSIS'}
          </button>
        </div>

        {/* Center Panel: System State */}
        <div className={styles.statePanel}>
          <div className={styles.panelTitle} style={{ color: '#00ff00', borderBottomColor: '#00ff00' }}>System Log</div>
          {log.map((line, i) => (
            <div key={i} className={styles.logLine}>{line}</div>
          ))}
          {isLoading && <div className={styles.cursor} />}
          <div ref={logEndRef} />
        </div>

        {/* Right Panel: AI Output */}
        <div className={`${styles.panel} ${styles.outputPanel}`}>
          <div className={styles.panelTitle}>Strategy Output</div>
          <div className={styles.personaTabs}>
            {(['recruiter', 'engineer', 'founder'] as PersonaType[]).map(p => (
              <div 
                key={p} 
                className={`${styles.tab} ${selectedPersona === p ? styles.tabActive : ''}`}
                onClick={() => setSelectedPersona(p)}
              >
                {p.toUpperCase()}
              </div>
            ))}
          </div>
          <div className={styles.outputArea}>
            <div className={styles.outputLabel}>Example AI-driven product analysis</div>
            
            {error ? (
              <div style={{ color: '#800000', fontWeight: 'bold' }}>{error}</div>
            ) : response ? (
              <>
                <div style={{ whiteSpace: 'pre-wrap' }}>{response}</div>
                <div className={styles.reasoning}>
                  <div 
                    className={styles.reasoningTitle}
                    onClick={() => setShowReasoning(!showReasoning)}
                  >
                    {showReasoning ? '▾' : '▸'} Why this output?
                  </div>
                  {showReasoning && (
                    <div className={styles.reasoningContent}>
                      This model prioritizes high-confidence product signals based on the provided scenario. 
                      The tone and focus are dynamically re-framed based on your selected persona (e.g., technical feasibility vs business impact).
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div style={{ color: '#808080', textAlign: 'center', marginTop: '40px' }}>
                Awaiting signal... Click RUN to start.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Credibility Layer: Other AI Products */}
      <div className={styles.credibilitySection}>
        <div className={styles.panelTitle}>Other AI Product Demos (Available on Request)</div>
        <div className={styles.productGrid}>
          <div className={styles.productItem}>
            <strong>AI Knowledge Assistant (Mini-RAG)</strong>
            <span>Grounded QA system using a controlled knowledge base to prevent hallucinations.</span>
          </div>
          <div className={styles.productItem}>
            <strong>AI Personalization Engine</strong>
            <span>Behavior-driven recommendations designed to improve engagement and repeat usage.</span>
          </div>
          <div className={styles.productItem}>
            <strong>LLM-Assisted Help System</strong>
            <span>AI-powered support with evaluation signals (CTR, fallback rate) for continuous improvement.</span>
          </div>
        </div>
        <div className={styles.footerNote}>
          * Live demos are selectively enabled to keep the experience focused.
        </div>
      </div>
    </div>
  );
};

export default ProductAnalyzer;
