import { useState } from "react";
import confetti from "canvas-confetti";
import { birthdayConfig } from "../data/birthdayConfig";

export default function BirthdayCake() {
  const [candlesLit, setCandlesLit] = useState(true);
  const [showOutcome, setShowOutcome] = useState(false);

  const { cake } = birthdayConfig;

  const handleBlowCandles = () => {
    setCandlesLit(false);

    // Confetti celebration
    confetti({
      particleCount: 65,
      spread: 80,
      origin: { y: 0.65 },
      colors: ["#d8ad65", "#e9a3ba", "#f4b5ca", "#ffffff", "#ff80aa"]
    });

    setTimeout(() => {
      setShowOutcome(true);
    }, 600);
  };

  const handleReset = () => {
    setCandlesLit(true);
    setShowOutcome(false);
  };

  return (
    <section id="cake" className="section-wrapper cake-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="stitch-badge">
            <span>{cake.badge}</span>
          </div>

          <h2 className="section-title">
            Make a Wish, <span className="italic-accent">Birthday Girl!</span>
          </h2>

          <p className="section-subtitle">
            {cake.subtitle}
          </p>
        </div>

        {/* Interactive Cake Stage */}
        <div className="cake-stage">
          {/* Sparkle Decoration on Top */}
          <div className="cake-sparkle-top" aria-hidden="true">
            ✨
          </div>

          {/* Birthday Cake */}
          <div className="cake-wrapper" aria-label="Birthday Cake with 3 Candles">
            {/* 3 Candles */}
            <div className="candles-row">
              {[0, 1, 2].map((idx) => (
                <div key={idx} className="candle-unit">
                  {candlesLit ? (
                    <div className="candle-flame" />
                  ) : (
                    <div className="smoke-puff" />
                  )}
                  <div className="candle-wick" />
                  <div className="candle-body" />
                </div>
              ))}
            </div>

            {/* Top Tier */}
            <div className="cake-tier-top">
              <span>Pooja 💖</span>
            </div>

            {/* Middle Tier */}
            <div className="cake-tier-mid" aria-hidden="true">
              <span>✨</span>
              <span>🌸</span>
              <span>💎</span>
              <span>🌸</span>
              <span>✨</span>
            </div>

            {/* Bottom Tier */}
            <div className="cake-tier-bottom">
              <span>HAPPY BIRTHDAY POOJA</span>
            </div>

            {/* Gold Cake Plate */}
            <div className="cake-plate" aria-hidden="true" />
          </div>

          {/* Action Button or Outcome Wish Card */}
          {candlesLit && (
            <button
              type="button"
              className="btn-primary"
              onClick={handleBlowCandles}
            >
              <span>🕯️</span>
              <span>{cake.btnBlow}</span>
            </button>
          )}

          {showOutcome && (
            <div className="cake-outcome-card">
              <h3 className="cake-outcome-title">{cake.wishTitle}</h3>
              <p className="cake-outcome-desc">{cake.wishText}</p>

              <button
                type="button"
                className="btn-pill"
                onClick={handleReset}
              >
                <span>✨</span>
                <span>{cake.btnReset}</span>
              </button>
            </div>
          )}

          {/* Status Badge */}
          <div className="cake-status-badge">
            <span>{candlesLit ? cake.statusLit : cake.statusBlown}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
