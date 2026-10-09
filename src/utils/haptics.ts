import { HapticType, SwitchAudioProfile } from '../types';

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export class HapticEngine {
  private static vibrationEnabled = true;
  private static soundEnabled = true;
  private static audioProfile: SwitchAudioProfile = 'linear-creamy';
  private static volume = 0.45;

  public static setVibrationEnabled(enabled: boolean) {
    this.vibrationEnabled = enabled;
  }

  public static isVibrationEnabled(): boolean {
    return this.vibrationEnabled;
  }

  public static setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public static isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  public static setAudioProfile(profile: SwitchAudioProfile) {
    this.audioProfile = profile;
  }

  public static getAudioProfile(): SwitchAudioProfile {
    return this.audioProfile;
  }

  public static setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public static getVolume(): number {
    return this.volume;
  }

  public static trigger(type: HapticType = 'light') {
    // 1. Hardware vibration
    if (this.vibrationEnabled && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        switch (type) {
          case 'light':
            navigator.vibrate(12);
            break;
          case 'medium':
            navigator.vibrate(22);
            break;
          case 'heavy':
            navigator.vibrate(40);
            break;
          case 'selection':
            navigator.vibrate(8);
            break;
          case 'success':
            navigator.vibrate([18, 30, 25]);
            break;
          case 'error':
            navigator.vibrate([35, 40, 35, 40]);
            break;
          case 'clack':
            navigator.vibrate(16);
            break;
        }
      } catch {
        // Ignore vibration errors on unsupported environments
      }
    }

    // 2. Synthesized physical tactile sound
    if (this.soundEnabled && this.audioProfile !== 'mute') {
      this.playAcousticClack(type);
    }
  }

  private static playAcousticClack(type: HapticType) {
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const gainNode = ctx.createGain();
      gainNode.connect(ctx.destination);

      let masterGain = this.volume;
      if (type === 'light' || type === 'selection') masterGain *= 0.6;
      if (type === 'heavy' || type === 'success') masterGain *= 1.2;

      if (this.audioProfile === 'blue-clicky') {
        // High click + bottom-out clack
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.025);

        gainNode.gain.setValueAtTime(masterGain * 0.7, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

        osc.connect(gainNode);
        osc.start(now);
        osc.stop(now + 0.035);

        // Click transient noise
        this.addNoiseTransient(ctx, now, masterGain * 0.4, 0.015, 3500);
      } else if (this.audioProfile === 'magnetic-hall') {
        // Deep dampened magnetic thock
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(380, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.04);

        gainNode.gain.setValueAtTime(masterGain * 0.8, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

        osc.connect(gainNode);
        osc.start(now);
        osc.stop(now + 0.045);

        this.addNoiseTransient(ctx, now, masterGain * 0.25, 0.02, 1200);
      } else {
        // 'linear-creamy' (default): satisfying factory lubricated thock
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.035);

        gainNode.gain.setValueAtTime(masterGain * 0.75, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gainNode);
        osc.start(now);
        osc.stop(now + 0.04);

        this.addNoiseTransient(ctx, now, masterGain * 0.35, 0.02, 2200);
      }
    } catch {
      // Audio playback failsafe
    }
  }

  private static addNoiseTransient(
    ctx: AudioContext, 
    time: number, 
    vol: number, 
    duration: number, 
    bandFreq: number
  ) {
    try {
      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = bandFreq;
      filter.Q.value = 3.0;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(vol, time);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      whiteNoise.start(time);
      whiteNoise.stop(time + duration);
    } catch {
      // Ignore
    }
  }
}
