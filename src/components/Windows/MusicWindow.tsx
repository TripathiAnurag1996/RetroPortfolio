import { memo, useState, useRef, useEffect, useCallback } from 'react'
import styles from './MusicWindow.module.css'

import Icon from '../Icons/Icon'

// Format time in MM:SS
function formatTime(seconds: number): string {
  if (isNaN(seconds) || !isFinite(seconds)) return '00:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

function MusicWindow() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(75)
  const [status, setStatus] = useState<'stopped' | 'playing' | 'paused'>('stopped')

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio('/song.m4a')
    audio.volume = volume / 100
    audioRef.current = audio

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setStatus('stopped')
      setCurrentTime(0)
      audio.currentTime = 0
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  // Update volume when slider changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  const handlePlay = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
        setStatus('paused')
      } else {
        audioRef.current.play()
        setIsPlaying(true)
        setStatus('playing')
      }
    }
  }, [isPlaying])

  const handleStop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
      setCurrentTime(0)
      setStatus('stopped')
    }
  }, [])

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const percentage = clickX / rect.width
      const newTime = percentage * duration
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }, [duration])

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className={styles.player}>
      {/* Cassette Tape Header */}
      <div className={styles.cassetteHeader}>
        <Icon name="music" size={80} />
      </div>

      {/* LCD Display */}
      <div className={styles.lcdDisplay}>
        <div className={styles.nowPlaying}>NOW PLAYING</div>
        <div className={styles.trackTitle}>ABHI NA JAO.M4A</div>
        <div className={styles.timeDisplay}>
          <span className={styles.timeCurrent}>{formatTime(currentTime)}</span>
          <span className={styles.timeSeparator}>/</span>
          <span className={styles.timeTotal}>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressContainer}>
        <div 
          ref={progressRef}
          className={styles.progressBar} 
          onClick={handleProgressClick}
        >
          <div 
            className={styles.progressFill} 
            style={{ width: `${progressPercentage}%` }}
          />
          <div 
            className={styles.progressHandle}
            style={{ left: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Playback Controls */}
      <div className={styles.controls}>
        <button className={styles.controlBtn} disabled title="Previous (Single Track)">
          ⏮
        </button>
        <button 
          className={`${styles.controlBtn} ${styles.playBtn} ${isPlaying ? styles.playing : ''}`}
          onClick={handlePlay}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button 
          className={styles.controlBtn}
          onClick={handleStop}
          title="Stop"
        >
          ⏹
        </button>
        <button className={styles.controlBtn} disabled title="Next (Single Track)">
          ⏭
        </button>
      </div>

      {/* Volume Control */}
      <div className={styles.volumeContainer}>
        <span className={styles.volumeLabel}>VOLUME</span>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className={styles.volumeSlider}
        />
        <span className={styles.volumeValue}>{volume}%</span>
      </div>

      {/* Status Bar */}
      <div className={styles.statusBar}>
        <span>
          <span className={`${styles.statusIcon} ${styles[status]}`} />
          {status.toUpperCase()}
        </span>
        <span>RETRO PLAYER V1.0</span>
      </div>
    </div>
  )
}

export default memo(MusicWindow)
