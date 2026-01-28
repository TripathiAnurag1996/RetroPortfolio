import { memo } from 'react'

const styles = {
  container: {
    padding: '24px',
    fontFamily: 'var(--font-retro)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as const,
  },
  icon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  title: {
    fontFamily: 'var(--font-pixel)',
    fontSize: '12px',
    marginBottom: '8px',
    textTransform: 'uppercase' as const,
  },
  description: {
    fontSize: '16px',
    color: '#666',
  }
}

function DocumentsWindow() {
  return (
    <div style={styles.container}>
      <div style={styles.icon}>📁</div>
      <h2 style={styles.title}>Documents</h2>
      <p style={styles.description}>
        Your documents and files will appear here.
      </p>
    </div>
  )
}

export default memo(DocumentsWindow)
