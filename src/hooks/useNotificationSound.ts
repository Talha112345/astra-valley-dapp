import { useCallback } from 'react';

type SoundType = 'success' | 'error' | 'levelup' | 'purchase' | 'stake' | 'claim';

export const useNotificationSound = () => {
  const playSound = useCallback((type: SoundType) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Different sounds for different events
    switch (type) {
      case 'success':
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
        break;

      case 'error':
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(100, audioContext.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
        break;

      case 'levelup':
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
        oscillator.frequency.setValueAtTime(1046.5, audioContext.currentTime + 0.3); // C6
        gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.6);
        break;

      case 'purchase':
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4
        oscillator.frequency.setValueAtTime(554.37, audioContext.currentTime + 0.05); // C#5
        gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.15);
        break;

      case 'stake':
        oscillator.frequency.setValueAtTime(329.63, audioContext.currentTime); // E4
        oscillator.frequency.setValueAtTime(392, audioContext.currentTime + 0.1); // G4
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.25);
        break;

      case 'claim':
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.08); // G5
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime + 0.16); // A5
        gainNode.gain.setValueAtTime(0.35, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
        break;
    }
  }, []);

  return { playSound };
};
