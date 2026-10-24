import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { universeCards } from "../data/universe";

gsap.registerPlugin(ScrollTrigger);

export default function Universe({ onOpenLightboxBySlot }) {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".universe-card", {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        scale: 0.95,
        stagger: 0.14,
        duration: 0.8,
        ease: "power2.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="universe" ref={sectionRef} className="section-wrapper universe-section">
      {/* Glowing Moon on Upper Right */}
      <div className="universe-moon" aria-hidden="true" />

      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="stitch-badge">
            <span>CONSTELLATIONS OF US</span>
          </div>

          <h2 className="section-title">
            "In Every Universe, <br />
            <span className="italic-accent">I'd Still Choose You."</span>
          </h2>

          <p className="section-subtitle">
            "Out of all the beautiful things in this world, you're my favorite."
          </p>
        </div>

        {/* 4 Constellation Cards */}
        <div ref={gridRef} className="universe-grid">
          {universeCards.map((card) => (
            <div
              key={card.id}
              className="universe-card"
              onClick={() => onOpenLightboxBySlot && onOpenLightboxBySlot(card.photoId)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onOpenLightboxBySlot && onOpenLightboxBySlot(card.photoId);
                }
              }}
              style={{ cursor: "pointer" }}
              aria-label={`View universe memory ${card.title}`}
            >
              <div className="universe-icon-badge" aria-hidden="true">
                <span>{card.icon}</span>
              </div>

              {/* Photo Frame Container */}
              <div className="universe-photo-frame">
                <div className="universe-photo-placeholder">
                  <span className="universe-slot-tag">[Slot: {card.photoId}]</span>
                  <h4 className="universe-slot-name">{card.slotName}</h4>
                </div>
              </div>

              <h3 className="universe-title">{card.title}</h3>
              <p className="universe-caption">{card.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
