import React, { useEffect, useRef, useState, useCallback } from 'react';
import styles from './SnakeGameWindow.module.css';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const GRID_SIZE = 20; // 20x20 grid
const CELL_SIZE = 16; // Reduced from 20 to fit smaller window
const INITIAL_SPEED = 150; // ms per frame
const SPEED_INCREMENT = 10; // Speed up every 5 points

const SnakeGameWindow: React.FC = () => {
  // Disable body scroll when game is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Position[]>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]);
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('snakeHighScore') || '0');
    }
    return 0;
  });
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  // Generate random food position
  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (
      currentSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)
    );
    return newFood;
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        setGameStarted(true);
        setIsPaused(false);
      }

      if (e.key === ' ') {
        e.preventDefault();
        if (gameStarted && !gameOver) {
          setIsPaused((prev) => !prev);
        }
      }

      if (e.key === 'Enter' && gameOver) {
        handleRestart();
      }

      if (gameOver || isPaused) return;

      switch (e.key) {
        case 'ArrowUp':
          setDirection((prev) => (prev !== 'DOWN' ? 'UP' : prev));
          break;
        case 'ArrowDown':
          setDirection((prev) => (prev !== 'UP' ? 'DOWN' : prev));
          break;
        case 'ArrowLeft':
          setDirection((prev) => (prev !== 'RIGHT' ? 'LEFT' : prev));
          break;
        case 'ArrowRight':
          setDirection((prev) => (prev !== 'LEFT' ? 'RIGHT' : prev));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameOver, isPaused, gameStarted, direction]); // Added direction for safety but not strictly needed for the internal logic

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver || isPaused) return;

    const gameLoop = setInterval(() => {
      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] };

        // Move head based on direction
        switch (direction) {
          case 'UP':
            head.y -= 1;
            break;
          case 'DOWN':
            head.y += 1;
            break;
          case 'LEFT':
            head.x -= 1;
            break;
          case 'RIGHT':
            head.x += 1;
            break;
        }

        // Check wall collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setGameOver(true);
          return prevSnake;
        }

        // Check self collision
        if (prevSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setScore((prev) => {
            const newScore = prev + 1;
            if (newScore > highScore) {
              setHighScore(newScore);
              if (typeof window !== 'undefined') {
                localStorage.setItem('snakeHighScore', newScore.toString());
              }
            }
            // Speed up every 5 points
            if (newScore % 5 === 0) {
              setSpeed((prevSpeed) => Math.max(50, prevSpeed - SPEED_INCREMENT));
            }
            return newScore;
          });
          setFood(generateFood(newSnake));
          return newSnake; // Don't remove tail (snake grows)
        }

        // Remove tail (normal movement)
        newSnake.pop();
        return newSnake;
      });
    }, speed);

    return () => clearInterval(gameLoop);
  }, [direction, food, gameOver, isPaused, gameStarted, speed, generateFood, highScore]);

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid (optional, subtle lines)
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#00ff00' : '#00cc00'; // Head brighter
      ctx.fillRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );
    });

    // Draw food
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(
      food.x * CELL_SIZE + 1,
      food.y * CELL_SIZE + 1,
      CELL_SIZE - 2,
      CELL_SIZE - 2
    );
  }, [snake, food]);

  const handleRestart = () => {
    setSnake([
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ]);
    setDirection('RIGHT');
    setFood({ x: 15, y: 15 });
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    setGameStarted(false);
    setSpeed(INITIAL_SPEED);
  };

  return (
    <div className={styles.gameContainer}>
      <div className={styles.gameHeader}>
        <div className={styles.scoreBoard}>
          <div className={styles.scoreItem}>
            <span className={styles.label}>SCORE:</span>
            <span className={styles.value}>{score.toString().padStart(3, '0')}</span>
          </div>
          <div className={styles.scoreItem}>
            <span className={styles.label}>HIGH:</span>
            <span className={styles.value}>{highScore.toString().padStart(3, '0')}</span>
          </div>
        </div>
      </div>

      <div className={styles.gameArea}>
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * CELL_SIZE}
          height={GRID_SIZE * CELL_SIZE}
          className={styles.gameCanvas}
        />

        {!gameStarted && !gameOver && (
          <div className={styles.overlay}>
            <div className={styles.message}>
              <div className={styles.title}>🐍 SNAKE GAME</div>
              <div className={styles.instructions}>
                USE ARROW KEYS TO MOVE
                <br />
                PRESS ANY ARROW KEY TO START
                <br />
                SPACEBAR TO PAUSE
              </div>
            </div>
          </div>
        )}

        {isPaused && (
          <div className={styles.overlay}>
            <div className={styles.message}>
              <div className={styles.title}>⏸ PAUSED</div>
              <div className={styles.instructions}>PRESS SPACEBAR TO RESUME</div>
            </div>
          </div>
        )}

        {gameOver && (
          <div className={styles.overlay}>
            <div className={styles.message}>
              <div className={styles.title}>💀 GAME OVER</div>
              <div className={styles.finalScore}>SCORE: {score}</div>
              {score === highScore && score > 0 && (
                <div className={styles.newRecord}>🏆 NEW HIGH SCORE!</div>
              )}
              <div className={styles.instructions}>
                PRESS ENTER TO RESTART
                <br />
                OR CLICK RESTART BUTTON
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.controls}>
        <button
          onClick={() => setIsPaused((prev) => !prev)}
          disabled={gameOver || !gameStarted}
          className={styles.button}
        >
          {isPaused ? '▶️ RESUME' : '⏸ PAUSE'}
        </button>
        <button onClick={handleRestart} className={styles.button}>
          🔄 RESTART
        </button>
      </div>
    </div>
  );
};

export default SnakeGameWindow;
