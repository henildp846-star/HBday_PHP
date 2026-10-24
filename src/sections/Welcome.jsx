import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import gsap from "gsap";

export default function Welcome({ onOpenSurprise }) {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const pretitleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".welcome-glow-circle", {
        scale: 0.6,
        opacity: 0,
        duration: 1.6
      })
      .from(".stitch-badge", {
        y: -20,
        opacity: 0,
        duration: 0.8
      }, "-=1.0")
      .from(pretitleRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8
      }, "-=0.5")
      .from(headlineRef.current, {
        y: 30,
        opacity: 0,
        duration: 1.0
      }, "-=0.5")
      .from(descRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8
      }, "-=0.6")
      .from(ctaRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.7
      }, "-=0.4")
      .from(".scroll-indicator", {
        y: 10,
        opacity: 0,
        duration: 0.6
      }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCtaClick = () => {
    // Launch a romantic mini celebration burst
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.75 },
      colors: ["#e9a3ba", "#f4b5ca", "#d8ad65", "#ffffff"]
    });

    const birthdaySection = document.getElementById("birthday");
    if (birthdaySection) {
      const navOffset = 90;
      const elementPosition = birthdaySection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }

    if (onOpenSurprise) {
      onOpenSurprise();
    }
  };

  return (
    <section id="welcome" ref={sectionRef} className="welcome-section">
      {/* Background Soft Glow Circle */}
      <div className="welcome-glow-circle" aria-hidden="true" />

      <div className="welcome-content">
        {/* Pill Badge */}
        <div className="stitch-badge">
          <span>✨</span>
          <span>ONCE IN A LIFETIME STORY</span>
          <span>✨</span>
        </div>

        {/* Pretitle */}
        <p ref={pretitleRef} className="welcome-pretitle">
          "Someone Very Special Was Born Today... ✨"
        </p>

        {/* Large Headline */}
        <h1 ref={headlineRef} className="welcome-headline">
          And My World Became{" "}
          <span className="italic-accent">More Beautiful</span>{" "}
          <span className="pink-accent">Because of Her.</span>
        </h1>

        {/* Description */}
        <p ref={descRef} className="welcome-desc">
          Step into an interactive digital universe crafted with every ounce of affection,
          cherished memories, and secret surprises.
        </p>

        {/* CTA Button */}
        <div ref={ctaRef} className="welcome-cta">
          <button
            type="button"
            className="btn-primary"
            onClick={handleCtaClick}
          >
            <span>💌</span>
            <span>Open Your Birthday Surprise →</span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" aria-hidden="true">
        <span>SCROLL TO EMBARK</span>
        <div className="mouse-icon">
          <div className="mouse-wheel" />
        </div>
      </div>
    </section>
  );
}
