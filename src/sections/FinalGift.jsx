import { useState } from "react";
import confetti from "canvas-confetti";
import { birthdayConfig } from "../data/birthdayConfig";

export default function FinalGift({ onReplayStory }) {
  const [isOpened, setIsOpened] = useState(false);

  const { gift } = birthdayConfig;

  const handleOpenGift = () => {
    // Large celebratory confetti blast
    confetti({
      particleCount: 90,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#d8ad65", "#e9a3ba", "#f4b5ca", "#ffffff", "#ff4070"]
    });

    setIsOpened(true);
  };

  const handleReplay = () => {
    setIsOpened(false);

    if (onReplayStory) {
      onReplayStory();
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="final-gift" className="section-wrapper final-gift-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="stitch-badge">
            <span>A SPECIAL SURPRISE</span>
          </div>

          <h2 className="section-title">
            Wait... I Have <span className="italic-accent">One More Thing</span> For You.
          </h2>

          <p className="section-subtitle">
            {gift.subtitle}
          </p>
        </div>

        {/* Interactive Gift Stage */}
        <div className="gift-stage">
          {!isOpened ? (
            /* Closed Wine & Gold Gift Box */
            <>
              <div
                className="gift-box-closed"
                onClick={handleOpenGift}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOpenGift();
                  }
                }}
                aria-label="Open Birthday Surprise Gift Box"
              >
                <div className="gift-lid">
                  <div className="gift-bow">🎀</div>
                  <div className="gift-ribbon-v" />
                </div>
                <div className="gift-body">
                  <div className="gift-ribbon-v" />
                  <div className="gift-ribbon-h" />
                </div>
              </div>

              <button
                type="button"
                className="btn-primary"
                onClick={handleOpenGift}
              >
                <span>🎁</span>
                <span>{gift.openBtn}</span>
              </button>
            </>
          ) : (
            /* Revealed Keepsake Card (Stitch Design Spec) */
            <div className="gift-revealed-card">
              <div className="finale-heart-icon" aria-hidden="true">
                💖
              </div>

              <h2 className="finale-heading">{gift.cardHeading}</h2>

              <p className="finale-quote1">{gift.quote1}</p>

              <p className="finale-quote2">{gift.quote2}</p>

              <div className="finale-divider" />

              <h3 className="finale-eternal-promise">{gift.finalPromise}</h3>

              <p className="finale-tag">{gift.tag}</p>

              <button
                type="button"
                className="btn-pill"
                onClick={handleReplay}
              >
                <span>❤️</span>
                <span>{gift.replayBtn}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
