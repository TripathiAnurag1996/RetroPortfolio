import { memo, useState, useRef, useCallback } from 'react'

const COLORS = ['#000000', '#FF6B6B', '#4ECDC4', '#FFD93D', '#8B5CF6', '#FF69B4', '#87CEEB', '#32CD32']

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    background: '#f0f0f0',
  },
  toolbar: {
    display: 'flex',
    gap: '4px',
    padding: '8px',
    borderBottom: '1px solid #ccc',
    background: '#e0e0e0',
  },
  colorBtn: {
    width: '24px',
    height: '24px',
    border: '2px solid #999',
    cursor: 'pointer',
    borderRadius: '2px',
  },
  activeColor: {
    border: '2px solid #000',
    boxShadow: '0 0 0 2px #fff',
  },
  brushSize: {
    marginLeft: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: 'var(--font-retro)',
    fontSize: '14px',
  },
  slider: {
    width: '80px',
  },
  clearBtn: {
    marginLeft: 'auto',
    padding: '4px 12px',
    background: '#fff',
    border: '1px solid #999',
    cursor: 'pointer',
    fontFamily: 'var(--font-pixel)',
    fontSize: '8px',
    textTransform: 'uppercase' as const,
  },
  canvasWrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'repeating-linear-gradient(45deg, #e8e8e8, #e8e8e8 10px, #f8f8f8 10px, #f8f8f8 20px)',
    padding: '16px',
  },
  canvas: {
    background: '#fff',
    border: '1px solid #999',
    cursor: 'crosshair',
    boxShadow: '2px 2px 8px rgba(0,0,0,0.2)',
  }
}

function PaintWindow() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(4)
  const lastPos = useRef({ x: 0, y: 0 })
  
  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      lastPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }
  }, [])
  
  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return
    
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return
    
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = brushSize
    ctx.lineCap = 'round'
    ctx.moveTo(lastPos.current.x, lastPos.current.y)
    ctx.lineTo(x, y)
    ctx.stroke()
    
    lastPos.current = { x, y }
  }, [isDrawing, color, brushSize])
  
  const stopDrawing = useCallback(() => {
    setIsDrawing(false)
  }, [])
  
  const clearCanvas = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (ctx && canvasRef.current) {
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
  }, [])
  
  return (
    <div style={styles.container}>
      <div style={styles.toolbar}>
        {COLORS.map((c) => (
          <button
            key={c}
            style={{
              ...styles.colorBtn,
              background: c,
              ...(color === c ? styles.activeColor : {})
            }}
            onClick={() => setColor(c)}
            aria-label={`Color ${c}`}
          />
        ))}
        
        <div style={styles.brushSize}>
          <span>Size:</span>
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            style={styles.slider}
          />
          <span>{brushSize}px</span>
        </div>
        
        <button style={styles.clearBtn} onClick={clearCanvas}>
          Clear
        </button>
      </div>
      
      <div style={styles.canvasWrapper}>
        <canvas
          ref={canvasRef}
          width={400}
          height={250}
          style={styles.canvas}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>
    </div>
  )
}

export default memo(PaintWindow)
