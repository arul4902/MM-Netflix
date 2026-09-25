/**
 * CINEMATIC ROMANTIC AUDIO ENGINE
 * Web Audio API Piano/Pad Synthesizer + Native Audio Tracks Switcher
 * Visual Waveform Generator & Background Pulse Sync
 */

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.currentTrackIndex = 0;
    this.volume = 0.75;
    this.mediaElement = null;
    this.analyser = null;
    this.synthInterval = null;
    this.synthChordIndex = 0;
    this.isMuted = false;
    this.listeners = new Set();
    this.dataArray = null;

    this.tracks = [
      {
        id: "rendu-kallu",
        title: "Rendu Kallu Chalavamma (Official Love Soundtrack)",
        artist: "Meghana & Bunnyy's Theme Song",
        type: "audio",
        src: "./assets/media/rendu_kallu_soundtrack.mp3",
        duration: "3:40"
      },
      {
        id: "piano-theme",
        title: "Our Story — Cinematic Ambient Piano",
        artist: "Procedural Romance Synthesizer",
        type: "synth",
        duration: "∞ Ambient"
      },
      {
        id: "wedding-mantras",
        title: "Sacred Jeelakarra Bellam — Mandapam Mantras",
        artist: "Mandapam Ceremony (May 10, 2026)",
        type: "video",
        src: "./assets/media/video_wedding_mandapam.mp4",
        duration: "0:10"
      },
      {
        id: "beach-theme",
        title: "Him & I — Beach Sunrise Melody",
        artist: "Beach Sunrise Dance Track",
        type: "video",
        src: "./assets/media/video_beach_romance.mp4",
        duration: "0:18"
      },
      {
        id: "maharani-groove",
        title: "How My Maharani Sees Me — Celebration",
        artist: "Fun Couple Reel Track",
        type: "video",
        src: "./assets/media/video_maharani_roles.mp4",
        duration: "0:22"
      }
    ];

    // Chords progression for romantic synth (Frequencies in Hz)
    // Key of D Major / B Minor cinematic progression: D - F#m - G - A - Bm - G
    this.chordProgression = [
      [146.83, 220.00, 293.66, 369.99, 440.00], // D major (D3, A3, D4, F#4, A4)
      [185.00, 220.00, 277.18, 369.99, 440.00], // F# minor (F#3, A3, C#4, F#4, A4)
      [196.00, 246.94, 293.66, 392.00, 493.88], // G major (G3, B3, D4, G4, B4)
      [220.00, 277.18, 329.63, 440.00, 554.37], // A major (A3, C#4, E4, A4, C#5)
      [123.47, 185.00, 246.94, 293.66, 369.99], // B minor (B2, F#3, B3, D4, F#4)
      [196.00, 293.66, 369.99, 440.00, 587.33]  // Gmaj7 (G3, D4, F#4, A4, D5)
    ];
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  play() {
    this.initContext();
    const track = this.tracks[this.currentTrackIndex];

    if (track.type === "synth") {
      this.stopMediaElement();
      this.startSynth();
    } else {
      this.stopSynth();
      this.playMediaElement(track.src);
    }

    this.isPlaying = true;
    this.notify();
  }

  pause() {
    if (this.isPlaying) {
      this.stopSynth();
      if (this.mediaElement) {
        this.mediaElement.pause();
      }
      this.isPlaying = false;
      this.notify();
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  setTrack(index) {
    if (index >= 0 && index < this.tracks.length) {
      const wasPlaying = this.isPlaying;
      this.stopSynth();
      this.stopMediaElement();
      this.currentTrackIndex = index;
      if (wasPlaying) {
        this.play();
      } else {
        this.notify();
      }
    }
  }

  nextTrack() {
    const nextIdx = (this.currentTrackIndex + 1) % this.tracks.length;
    this.setTrack(nextIdx);
  }

  prevTrack() {
    const prevIdx = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
    this.setTrack(prevIdx);
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    if (this.mediaElement) {
      this.mediaElement.volume = this.isMuted ? 0 : this.volume;
    }
    this.notify();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.setVolume(this.volume);
  }

  startSynth() {
    if (this.synthInterval) return;

    const playChordStep = () => {
      if (!this.ctx || !this.isPlaying) return;
      const chord = this.chordProgression[this.synthChordIndex % this.chordProgression.length];
      const now = this.ctx.currentTime;

      // Play soft arpeggio / ambient chord notes
      chord.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        // Warm sine and triangle mix
        osc.type = i === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, now + i * 0.18);

        // Envelope: soft swell, long decay
        const startTime = now + i * 0.18;
        noteGain.gain.setValueAtTime(0.0001, startTime);
        noteGain.gain.exponentialRampToValueAtTime(0.18 / (i + 1), startTime + 0.8);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 4.2);

        osc.connect(noteGain);
        noteGain.connect(this.masterGain);

        osc.start(startTime);
        osc.stop(startTime + 4.3);
      });

      this.synthChordIndex++;
    };

    playChordStep();
    this.synthInterval = setInterval(playChordStep, 4500);
  }

  stopSynth() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }

  playMediaElement(src) {
    if (!this.mediaElement) {
      this.mediaElement = document.createElement("audio");
      this.mediaElement.preload = "auto";
      this.mediaElement.loop = true;

      try {
        if (this.ctx && this.masterGain) {
          const sourceNode = this.ctx.createMediaElementSource(this.mediaElement);
          sourceNode.connect(this.masterGain);
        }
      } catch (err) {
        console.warn("createMediaElementSource fallback:", err);
      }
    }

    if (this.mediaElement.src !== src && !this.mediaElement.src.endsWith(src.replace('./', ''))) {
      this.mediaElement.src = src;
    }

    this.mediaElement.volume = this.isMuted ? 0 : this.volume;
    this.mediaElement.play().catch(e => {
      console.warn("Media audio play waiting for user gesture:", e);
    });
  }

  stopMediaElement() {
    if (this.mediaElement) {
      this.mediaElement.pause();
      this.mediaElement.currentTime = 0;
    }
  }

  getEnergy() {
    if (!this.analyser || !this.isPlaying) return 0;
    this.analyser.getByteFrequencyData(this.dataArray);
    let sum = 0;
    for (let i = 0; i < this.dataArray.length; i++) {
      sum += this.dataArray[i];
    }
    return sum / (this.dataArray.length * 255);
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    const currentTrack = this.tracks[this.currentTrackIndex];
    this.listeners.forEach(cb => cb({
      isPlaying: this.isPlaying,
      currentTrack,
      trackIndex: this.currentTrackIndex,
      volume: this.volume,
      isMuted: this.isMuted
    }));
  }
}

export const audioEngine = new AudioEngine();
