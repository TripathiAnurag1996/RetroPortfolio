import { memo, useState } from 'react'

const styles = {
  container: {
    padding: '24px',
    fontFamily: 'var(--font-retro)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  title: {
    fontFamily: 'var(--font-pixel)',
    fontSize: '12px',
    marginBottom: '16px',
    textTransform: 'uppercase' as const,
  },
  entries: {
    flex: 1,
    overflowY: 'auto' as const,
    marginBottom: '16px',
  },
  entry: {
    padding: '12px',
    background: '#F5F5F5',
    borderRadius: '4px',
    marginBottom: '8px',
  },
  entryName: {
    fontFamily: 'var(--font-pixel)',
    fontSize: '9px',
    marginBottom: '4px',
  },
  entryMessage: {
    fontSize: '14px',
    color: '#333',
  },
  entryDate: {
    fontSize: '12px',
    color: '#999',
    marginTop: '4px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  input: {
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontFamily: 'var(--font-retro)',
    fontSize: '14px',
  },
  textarea: {
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontFamily: 'var(--font-retro)',
    fontSize: '14px',
    minHeight: '60px',
    resize: 'vertical' as const,
  },
  button: {
    padding: '8px 16px',
    background: '#4ECDC4',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
    fontFamily: 'var(--font-pixel)',
    fontSize: '10px',
    cursor: 'pointer',
    textTransform: 'uppercase' as const,
  }
}

const INITIAL_ENTRIES = [
  { name: 'Visitor', message: 'Cool retro portfolio! Love the aesthetic.', date: '2024-01-15' },
  { name: 'Designer', message: 'This brings back memories of Windows 95!', date: '2024-01-10' },
]

function GuestbookWindow() {
  const [entries, setEntries] = useState(INITIAL_ENTRIES)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && message) {
      setEntries([
        { name, message, date: new Date().toISOString().split('T')[0] },
        ...entries
      ])
      setName('')
      setMessage('')
    }
  }
  
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📝 Sign the Guestbook</h2>
      
      <div style={styles.entries}>
        {entries.map((entry, index) => (
          <div key={index} style={styles.entry}>
            <div style={styles.entryName}>{entry.name}</div>
            <div style={styles.entryMessage}>{entry.message}</div>
            <div style={styles.entryDate}>{entry.date}</div>
          </div>
        ))}
      </div>
      
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          style={styles.input}
          type="text"
          placeholder="Your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          style={styles.textarea}
          placeholder="Leave a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" style={styles.button}>
          Sign Guestbook
        </button>
      </form>
    </div>
  )
}

export default memo(GuestbookWindow)
