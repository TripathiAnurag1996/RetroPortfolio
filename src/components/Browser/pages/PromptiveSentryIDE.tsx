import { memo } from 'react';
import { anuragContext } from '../../../utils/knowledgeBase';

function PromptiveSentryIDE() {
  const product = anuragContext.products[1];

  return (
    <div style={{ 
      padding: '32px 20px', 
      backgroundColor: 'var(--color-window-bg)', 
      backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 3px)',
      minHeight: '100%', 
      fontFamily: 'var(--font-retro)', 
      color: 'var(--color-text)' 
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header Bar */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', borderBottom: '2px solid var(--border-dark)', paddingBottom: '16px', marginBottom: '24px' }}>
          <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '14px', color: 'var(--color-text)' }}>VS Code Marketplace</span>
          <span style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-window-bg)', padding: '4px 8px', fontFamily: 'var(--font-pixel)', fontSize: '10px', textTransform: 'uppercase', borderRadius: '2px' }}>✓ Verified Publisher</span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-pixel)', fontSize: '24px', fontWeight: 'normal', marginBottom: '8px', color: 'var(--color-text)', textTransform: 'uppercase', lineHeight: '1.4' }}>{product.name}</h1>
        <p style={{ fontSize: '22px', color: 'var(--color-text-muted)', marginBottom: '16px', fontStyle: 'normal', fontWeight: 400 }}>{product.tagline}</p>

        {/* Stats Row */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {[
            product.status.split('—')[1].split(',')[0].trim().replace(/\b\w/g, l => l.toUpperCase()), 
            '1 Week Post-Launch', 
            'Zero Setup', 
            'Zero API Keys'
          ].map((stat, i) => (
            <div key={i} style={{ padding: '4px 10px', fontSize: '16px', border: '2px solid var(--border-dark)', color: 'var(--color-text)', backgroundColor: 'var(--color-window-bg)' }}>
              {stat}
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button 
          onClick={() => window.open(product.url, '_blank')}
          style={{ 
            backgroundColor: 'var(--color-accent)', 
            color: 'var(--color-window-bg)', 
            border: '2px solid var(--color-accent-hover)', 
            padding: '12px 24px', 
            fontFamily: 'var(--font-pixel)', 
            fontSize: '14px', 
            textTransform: 'uppercase', 
            cursor: 'pointer', 
            marginBottom: '24px', 
            boxShadow: '3px 3px 0px var(--border-darker)', 
            transition: 'none' 
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '3px 3px 0px var(--border-darker)';
            e.currentTarget.style.transform = 'translate(0px, 0px)';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.boxShadow = '1px 1px 0px var(--border-darker)';
            e.currentTarget.style.transform = 'translate(2px, 2px)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.boxShadow = '3px 3px 0px var(--border-darker)';
            e.currentTarget.style.transform = 'translate(0px, 0px)';
          }}
        >
          Install Free
        </button>

        {/* Context Pipeline Animation */}
        <h2 style={{ fontFamily: 'var(--font-pixel)', fontSize: '14px', marginBottom: '20px', color: 'var(--color-text)', textTransform: 'uppercase', borderBottom: '2px solid var(--border-dark)', paddingBottom: '8px' }}>Context Pipeline</h2>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          marginBottom: '48px', 
          overflowX: 'auto', 
          padding: '24px 16px', 
          backgroundColor: 'var(--color-text)', 
          border: '2px solid var(--border-dark)',
          color: 'var(--color-text-muted)',
          fontFamily: 'var(--font-retro)'
        }}>
          {['[Active File]', '→', '[Imports]', '→', '[Open Tabs]', '→', '[Terminal Errors]', '→', '[Git History]', '→', '[Diffs]', '→', '[Tech Stack]', '→', '[Enhanced Prompt]'].map((node, i) => (
            <span key={i} className={`pipeline-node-${i}`} style={{ whiteSpace: 'nowrap', animation: `highlightNode 1.5s step-end forwards ${i * 0.2}s`, opacity: 0.5, fontSize: '16px' }}>
              {node}
            </span>
          ))}
        </div>

        <style>{`
          @keyframes highlightNode {
            0% { opacity: 0.5; background: transparent; color: var(--color-window-bg); }
            50% { opacity: 1; background: var(--color-accent); color: var(--color-window-bg); }
            100% { opacity: 0.8; background: transparent; color: var(--color-window-frame); }
          }
        `}</style>

        {/* Compatibility */}
        <h2 style={{ fontFamily: 'var(--font-pixel)', fontSize: '14px', marginBottom: '20px', color: 'var(--color-text)', textTransform: 'uppercase', borderBottom: '2px solid var(--border-dark)', paddingBottom: '8px' }}>Compatibility</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '48px' }}>
          {product.compatibility?.map((editor, i) => (
            <span key={i} style={{ backgroundColor: 'var(--color-window-bg)', color: 'var(--color-text)', padding: '4px 8px', fontSize: '14px', border: '1px solid var(--border-dark)' }}>
              {editor}
            </span>
          ))}
        </div>

        {/* Features */}
        <h2 style={{ fontFamily: 'var(--font-pixel)', fontSize: '14px', marginBottom: '12px', color: 'var(--color-text)', textTransform: 'uppercase', borderBottom: '2px solid var(--border-dark)', paddingBottom: '8px' }}>Features</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingBottom: '32px' }}>
          {product.techStack.map((tech, i) => (
            <span key={i} style={{ backgroundColor: 'var(--color-window-bg)', color: 'var(--color-text-muted)', padding: '4px 8px', fontSize: '14px', border: '1px solid var(--border-dark)' }}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(PromptiveSentryIDE);
