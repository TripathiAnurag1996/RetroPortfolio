import { memo } from 'react';
import { playClickSound } from '../../../utils/audio';

function BrowserHome() {
  const navigate = (url: string) => {
    playClickSound();
    window.dispatchEvent(new CustomEvent('browser-navigate', { detail: url }));
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100%', 
      backgroundColor: 'var(--color-window-bg)', 
      backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 3px)',
      padding: '20px', 
      textAlign: 'center' 
    }}>
      <h1 style={{ fontFamily: 'var(--font-pixel)', fontSize: '20px', marginBottom: '12px', color: 'var(--color-text)', textTransform: 'uppercase', lineHeight: '1.4' }}>
        ANURAG OS — Where do you want to go today?
      </h1>
      <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '12px', color: 'var(--color-text-light)', marginBottom: '48px', textTransform: 'uppercase' }}>
        3 products · 1000+ users · 60+ countries
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', width: '100%', maxWidth: '800px' }}>
        {[
          { id: 'promptive-sentry', label: 'Promptive Sentry (Chrome)', icon: '🌐' },
          { id: 'promptive-sentry-ide', label: 'Promptive Sentry for IDE', icon: '💻' },
          { id: 'piqque', label: 'Piqque (Desktop App)', icon: '🖥️' }
        ].map(item => (
          <div 
            key={item.id}
            onClick={() => navigate(`anurag-os://${item.id}`)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px 20px',
              backgroundColor: 'var(--color-window-bg)',
              border: '2px solid var(--border-dark)',
              cursor: 'pointer',
              fontFamily: 'var(--font-pixel)',
              fontSize: '12px',
              color: 'var(--color-text)',
              textTransform: 'uppercase',
              boxShadow: '3px 3px 0px var(--border-darker)',
              height: '180px',
              transition: 'none'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-window-bg)';
              e.currentTarget.style.borderColor = 'var(--border-dark)';
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-menubar-bg)';
              e.currentTarget.style.borderColor = 'var(--color-accent)';
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
            <span style={{ fontSize: '32px', marginBottom: '16px' }}>{item.icon}</span>
            <span style={{ textAlign: 'center', lineHeight: '1.6' }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(BrowserHome);
