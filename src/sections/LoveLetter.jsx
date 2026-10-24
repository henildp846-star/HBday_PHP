import { useState } from "react";
import confetti from "canvas-confetti";
import { birthdayConfig } from "../data/birthdayConfig";

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    // Heart confetti effect
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#e9a3ba", "#f4b5ca", "#ff7597", "#d8ad65"],
      shapes: ["circle"]
    });
    setIsOpen(true);
  };

  const handleCloseLetter = () => {
    setIsOpen(false);
  };

  const { letter } = birthdayConfig;

  return (
    <section id="love-letter" className="section-wrapper letter-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="stitch-badge">
            <span>{letter.badge}</span>
          </div>

          <h2 className="section-title">
            A Letter From <span className="italic-accent">My Heart</span>
          </h2>

          <p className="section-subtitle">
            {letter.subtitle}
          </p>
        </div>

        {/* Envelope / Letter Interactive Stage */}
        <div className="letter-interactive-container">
          {!isOpen ? (
            /* Closed Romantic Envelope */
            <div
              className="envelope-closed"
              onClick={handleOpenLetter}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpenLetter();
                }
              }}
              tabIndex={0}
              role="button"
              aria-label="Open Love Letter for Pooja"
            >
              <div className="envelope-flap-decor" aria-hidden="true" />
              
              <div className="envelope-seal">
                <span>💌</span>
              </div>

              <h3 className="envelope-label">Tap to Open My Heart 💗</h3>
              <span className="envelope-hint">[CLICK TO UNFOLD THE SECRET LETTER]</span>
            </div>
          ) : (
            /* Unfolded Ivory Letter Paper */
            <article className="letter-paper-modal" aria-label="Love Letter Content">
              {/* Decorative Corners */}
              <div className="letter-decor-corner corner-tl" aria-hidden="true" />
              <div className="letter-decor-corner corner-tr" aria-hidden="true" />
              <div className="letter-decor-corner corner-bl" aria-hidden="true" />
              <div className="letter-decor-corner corner-br" aria-hidden="true" />

              <h3 className="letter-salutation">{letter.salutation}</h3>

              <div className="letter-body">
                {letter.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="letter-closing-area">
                <p className="letter-closing">{letter.closing}</p>
                <p className="letter-signature">{letter.signature}</p>
              </div>

              <div className="letter-close-btn-box">
                <button
                  type="button"
                  className="btn-pill"
                  onClick={handleCloseLetter}
                >
                  <span>💌</span>
                  <span>Close My Letter</span>
                </button>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
