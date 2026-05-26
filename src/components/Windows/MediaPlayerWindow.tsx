import { memo, useState } from 'react'
import styles from './MediaPlayerWindow.module.css'

const LIBRARY = [
  {
    category: 'PRODUCT DEMOS',
    videos: [
      { id: 'piqque', title: 'Piqque Product Demo', embedUrl: 'https://www.youtube.com/embed/D296pGc68-8?autoplay=1' },
      { id: 'promptive', title: 'Promptive Sentry Demo', embedUrl: 'https://www.youtube.com/embed/0UAapL8cxiM?autoplay=1' }
    ]
  }
]

function MediaPlayerWindow() {
  const [currentVideoId, setCurrentVideoId] = useState('piqque')
  
  // Find current video safely
  let currentVideo = null
  for (const group of LIBRARY) {
    const found = group.videos.find(v => v.id === currentVideoId)
    if (found) {
      currentVideo = found
      break
    }
  }

  // Fallback in case of invalid ID
  if (!currentVideo) {
    currentVideo = LIBRARY[0].videos[0]
  }

  return (
    <div className={styles.container}>
      <div className={styles.playerSection}>
        <div className={styles.videoWrapper}>
          <iframe 
            src={currentVideo.embedUrl} 
            title={currentVideo.title}
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
        <div className={styles.nowPlaying}>
          <span>NOW PLAYING: </span>
          <span className={styles.title}>{currentVideo.title.toUpperCase()}</span>
        </div>
      </div>
      
      <div className={styles.playlistSection}>
        <div className={styles.playlistHeader}>LIBRARY</div>
        <div className={styles.playlistItems}>
          {LIBRARY.map((group, groupIdx) => (
            <div key={groupIdx} className={styles.categoryGroup}>
              <div className={styles.categoryTitle}>{group.category}</div>
              {group.videos.map((video, videoIdx) => (
                <button 
                  key={video.id}
                  className={`${styles.playlistItem} ${video.id === currentVideoId ? styles.active : ''}`}
                  onClick={() => setCurrentVideoId(video.id)}
                >
                  <span className={styles.itemNumber}>{(videoIdx + 1).toString().padStart(2, '0')}</span>
                  <span className={styles.itemTitle}>{video.title.toUpperCase()}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default memo(MediaPlayerWindow)
