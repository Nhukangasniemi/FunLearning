"use client";

// Sound and Speech Synthesis Manager for Kids Learning App
// Uses native Web Audio API (for zero-latency sound effects) and Web Speech API (for natural English voice)

class SoundManager {
  private audioCtx: AudioContext | null = null;
  public speechEnabled: boolean = true;
  public sfxEnabled: boolean = true;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  public isSpeaking: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.initAudioContext();
      this.initSpeechVoices();
    }
  }

  private initAudioContext() {
    try {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    } catch (e) {
      console.warn("Web Audio not supported:", e);
    }
  }

  public ensureContextRunning() {
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  private initSpeechVoices() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const findVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return;

      const preferred = [
        "Google US English",
        "Samantha",
        "Victoria",
        "Karen",
        "Zira",
        "Microsoft Zira",
        "Google UK English Female",
        "en-US",
        "en-GB",
      ];

      for (const name of preferred) {
        const found = voices.find(
          (v) => v.name.includes(name) || v.lang.startsWith(name)
        );
        if (found) {
          this.selectedVoice = found;
          break;
        }
      }

      if (!this.selectedVoice) {
        this.selectedVoice =
          voices.find((v) => v.lang.startsWith("en")) || voices[0];
      }
    };

    findVoice();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = findVoice;
    }
  }

  // --- Sound Effects using Web Audio API synthesis ---

  public playPop() {
    if (!this.sfxEnabled || !this.audioCtx) return;
    this.ensureContextRunning();

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const now = this.audioCtx.currentTime;

    osc.type = "sine";
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.08);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  public playMunch() {
    if (!this.sfxEnabled || !this.audioCtx) return;
    this.ensureContextRunning();

    const createBite = (startTime: number, freq: number) => {
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, startTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.4, startTime + 0.09);

      gain.gain.setValueAtTime(0.3, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.09);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.09);
    };

    const now = this.audioCtx.currentTime;
    createBite(now, 260);
    createBite(now + 0.11, 210);
    createBite(now + 0.22, 180);
  }

  public playChime() {
    if (!this.sfxEnabled || !this.audioCtx) return;
    this.ensureContextRunning();

    const now = this.audioCtx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio

    notes.forEach((freq, idx) => {
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const startTime = now + idx * 0.08;

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.35);
    });
  }

  public playSuccessFanfare() {
    if (!this.sfxEnabled || !this.audioCtx) return;
    this.ensureContextRunning();

    const now = this.audioCtx.currentTime;
    const chord = [523.25, 659.25, 783.99]; // C Major
    const endChords = [587.33, 880.0, 1046.5]; // Bright flourish

    chord.forEach((freq) => {
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    });

    endChords.forEach((freq) => {
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + 0.26);

      gain.gain.setValueAtTime(0.22, now + 0.26);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now + 0.26);
      osc.stop(now + 0.7);
    });
  }

  public playError() {
    if (!this.sfxEnabled || !this.audioCtx) return;
    this.ensureContextRunning();

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.2);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  // --- Web Speech API (English Voice Narration) ---

  public speak(text: string, onEndCallback: (() => void) | null = null) {
    if (typeof window === "undefined") return;
    if (!this.speechEnabled || !("speechSynthesis" in window)) {
      if (onEndCallback) onEndCallback();
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.88; // Slightly slower, clear for young English learners
      utterance.pitch = 1.15; // Friendly, cheerful tone
      utterance.lang = "en-US";

      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
      }

      utterance.onstart = () => {
        this.isSpeaking = true;
        document.body.classList.add("is-speaking");
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        document.body.classList.remove("is-speaking");
        if (onEndCallback) onEndCallback();
      };

      utterance.onerror = () => {
        this.isSpeaking = false;
        document.body.classList.remove("is-speaking");
        if (onEndCallback) onEndCallback();
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis error:", e);
      if (onEndCallback) onEndCallback();
    }
  }

  public stopSpeech() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    if (typeof document !== "undefined") {
      document.body.classList.remove("is-speaking");
    }
  }

  public toggleSound(): boolean {
    this.sfxEnabled = !this.sfxEnabled;
    this.speechEnabled = this.sfxEnabled;
    if (!this.speechEnabled) {
      this.stopSpeech();
    }
    return this.sfxEnabled;
  }
}

let instance: SoundManager | null = null;

export function getSoundManager(): SoundManager {
  if (!instance) {
    instance = new SoundManager();
  }
  return instance;
}

export const soundManager = typeof window !== "undefined" ? getSoundManager() : ({} as SoundManager);

