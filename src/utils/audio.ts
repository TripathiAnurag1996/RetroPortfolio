/**
 * Utility to play a retro UI click sound.
 * Uses synthesized audio as a fallback if the mp3 file is missing.
 */

let audioContext: AudioContext | null = null;

export const playClickSound = async () => {
  if (typeof window === 'undefined') return;

  try {
    // Attempt to play from file first
    const audio = new Audio('/sounds/click.mp3');
    audio.volume = 0.4;
    
    // Catch error if file is missing or blocked by autoplay
    await audio.play().catch(() => {
      // Fallback to synthesized sound if file fails
      playSynthesizedClick();
    });
  } catch (err) {
    playSynthesizedClick();
  }
};

const playSynthesizedClick = () => {
  if (typeof window === 'undefined') return;

  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.05);

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.05);
};

export const playMessageSound = async () => {
  if (typeof window === 'undefined') return;

  try {
    const audio = new Audio('/sounds/message.mp3');
    audio.volume = 0.4;
    await audio.play().catch(() => {
      // Fallback: Two beeps
      playSynthesizedBeep(600, 0.1);
      setTimeout(() => playSynthesizedBeep(800, 0.1), 150);
    });
  } catch (err) {
    playSynthesizedBeep(600, 0.1);
    setTimeout(() => playSynthesizedBeep(800, 0.1), 150);
  }
};

const playSynthesizedBeep = (freq: number, duration: number) => {
  if (typeof window === 'undefined') return;

  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioContext.state === 'suspended') audioContext.resume();
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
};

