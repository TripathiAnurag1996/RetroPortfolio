import { memo } from 'react';
import { anuragContext } from '../../../utils/knowledgeBase';
import { useWindows } from '../../../context/WindowContext';

function Piqque() {
  const product = anuragContext.products[2];
  const { openWindow } = useWindows();

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
          <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '14px', color: 'var(--color-text)' }}>Xenriq Systems</span>
          <span style={{ backgroundColor: 'var(--color-btn-minimize)', color: 'var(--color-text)', padding: '4px 8px', fontFamily: 'var(--font-pixel)', fontSize: '10px', textTransform: 'uppercase', borderRadius: '2px' }}>Private Beta</span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-pixel)', fontSize: '28px', fontWeight: 'normal', marginBottom: '16px', color: 'var(--color-text)', textTransform: 'uppercase', lineHeight: '1.4' }}>{product.name}</h1>
        
        {/* Hero Quote */}
        <div style={{ textAlign: 'center', margin: '0 0 16px 0', padding: '16px 20px', backgroundColor: 'var(--color-window-bg)', borderTop: '1px solid var(--border-dark)' }}>
          <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '32px', color: 'var(--color-accent)', display: 'block', marginBottom: '8px' }}>"</span>
          <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '14px', color: 'var(--color-text)', lineHeight: '1.6', textTransform: 'uppercase' }}>
            {product.tagline}
          </p>
        </div>

        {/* Metrics Row */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['< 200ms Latency', 'On-Device HIPAA Mode', 'No Subscription', 'Multi-Model AI'].map((stat, i) => (
            <div key={i} style={{ padding: '4px 10px', fontSize: '16px', border: '2px solid var(--border-dark)', color: 'var(--color-text)', backgroundColor: 'var(--color-window-bg)' }}>
              {stat}
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
          <button 
            onClick={() => openWindow('mediaplayer')}
            style={{ 
              backgroundColor: 'var(--color-accent)', 
              color: 'var(--color-window-bg)', 
              border: '2px solid var(--color-accent-hover)', 
              padding: '12px 24px', 
              fontFamily: 'var(--font-pixel)', 
              fontSize: '14px', 
              textTransform: 'uppercase', 
              cursor: 'pointer', 
              marginBottom: '12px', 
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
            Watch the Product Demo
          </button>
          <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Multi-model: Claude · Gemini · GPT-4o</span>
        </div>

        {/* Features */}
        <h2 style={{ fontFamily: 'var(--font-pixel)', fontSize: '14px', marginBottom: '12px', color: 'var(--color-text)', textTransform: 'uppercase', borderBottom: '2px solid var(--border-dark)', paddingBottom: '8px' }}>Features</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
          {product.features.map((feature, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ color: 'var(--color-accent)', fontWeight: 'bold', fontSize: '18px' }}>✓</span>
              <span style={{ color: 'var(--color-text)', lineHeight: '1.6', fontSize: '18px' }}>{feature}</span>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <h2 style={{ fontFamily: 'var(--font-pixel)', fontSize: '14px', marginBottom: '12px', color: 'var(--color-text)', textTransform: 'uppercase', borderBottom: '2px solid var(--border-dark)', paddingBottom: '8px' }}>Tech Stack</h2>
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

export default memo(Piqque);
