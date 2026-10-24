import { useState, useRef, useEffect } from "react";
import { Play } from "./Icons";
import { birthdayConfig } from "../data/birthdayConfig";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [useSynth, setUseSynth] = useState(false);
  const audioRef = useRef(null);
  const synthTimerRef = useRef(null);
  const audioCtxRef = useRef(null);

  // Fallback romantic music box synthesizer using Web Audio API
  const playRomanticChordNote = (freq, time, duration = 1.6) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.exponentialRampToValueAtTime(0.08, time + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + duration);
  };

  const startRomanticSynth = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }

    // Romantic melody pattern (notes in Hz: C4, E4, G4, B4, C5, G4, E5, D5)
    const melody = [
      261.63, 329.63, 392.0, 493.88, 523.25, 392.0, 659.25, 587.33,
      220.0, 261.63, 329.63, 440.0, 523.25, 440.0, 493.88, 392.0,
      174.61, 261.63, 349.23, 440.0, 523.25, 440.0, 392.0, 329.63,
      196.0, 246.94, 293.66, 392.0, 493.88, 392.0, 440.0, 493.88
    ];

    let noteIdx = 0;
    const playNextNote = () => {
      if (!audioCtxRef.current) return;
      const now = audioCtxRef.current.currentTime;
      playRomanticChordNote(melody[noteIdx % melody.length], now);
      noteIdx++;
    };

    playNextNote();
    synthTimerRef.current = setInterval(playNextNote, 480);
  };

  const stopRomanticSynth = () => {
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
  };

  const toggleMusic = async () => {
    if (isPlaying) {
      if (audioRef.current && !useSynth) {
        audioRef.current.pause();
      }
      stopRomanticSynth();
      setIsPlaying(false);
    } else {
      if (audioRef.current && !useSynth) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch {
          // If mp3 file is not present or failed, activate romantic synth seamlessly
          setUseSynth(true);
          startRomanticSynth();
          setIsPlaying(true);
        }
      } else {
        startRomanticSynth();
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    return () => {
      stopRomanticSynth();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src={birthdayConfig.musicSrc}
        loop
        preload="none"
        onError={() => setUseSynth(true)}
      />
      <button
        className={`nav-music-pill ${isPlaying ? "playing" : ""}`}
        onClick={toggleMusic}
        title={isPlaying ? "Pause Romantic Music" : "Play Romantic Music"}
        aria-label="Toggle Romantic Music"
      >
        <span className="nav-music-icon">
          {isPlaying ? (
            <div className="sound-bars">
              <span className="sound-bar"></span>
              <span className="sound-bar"></span>
              <span className="sound-bar"></span>
              <span className="sound-bar"></span>
            </div>
          ) : (
            <Play size={12} fill="currentColor" />
          )}
        </span>
        <div className="nav-music-info">
          <span className="nav-music-label">Romantic Melody</span>
          <span className="nav-music-action">
            {isPlaying ? "Playing ♫" : "Click to Play"}
          </span>
        </div>
      </button>
    </>
  );
}
