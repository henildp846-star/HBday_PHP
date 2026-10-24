import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PolaroidCard from "../components/PolaroidCard";
import { photos } from "../data/photos";

gsap.registerPlugin(ScrollTrigger);

export default function Memories({ onOpenLightbox }) {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".memory-item", {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: 60,
        opacity: 0,
        scale: 0.94,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="memories" ref={sectionRef} className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="stitch-badge">
            <span>SCRAPBOOK OF OUR HEARTS • 10 DEDICATED SLOTS</span>
          </div>

          <h2 className="section-title">
            Beautiful <span className="italic-accent">Memories</span>
          </h2>

          <p className="section-subtitle">
            "Every moment with you becomes my favorite story to tell."
          </p>

          <p className="section-desc">
            Click any card to open the cinematic enlarged memory viewer with smooth transitions.
          </p>
        </div>

        {/* 10 Polaroid Cards Scrapbook Grid */}
        <div ref={gridRef} className="polaroid-grid">
          {photos.map((photo, idx) => (
            <div
              key={photo.id}
              className={`memory-item ${idx === 9 ? "memory-item-center" : ""}`}
            >
              <PolaroidCard
                photo={photo}
                onOpenLightbox={onOpenLightbox}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
