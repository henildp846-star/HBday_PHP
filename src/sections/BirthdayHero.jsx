import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PolaroidCard from "../components/PolaroidCard";
import { birthdayConfig } from "../data/birthdayConfig";
import { photos } from "../data/photos";

gsap.registerPlugin(ScrollTrigger);

export default function BirthdayHero({ onOpenLightbox }) {
  const sectionRef = useRef(null);
  const textColRef = useRef(null);
  const portraitColRef = useRef(null);

  const heroPhoto = {
    ...photos[0],
    src: `${import.meta.env.BASE_URL}images/hero-portrait.jpg`
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textColRef.current.children, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      });

      gsap.from(portraitColRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none"
        },
        scale: 0.88,
        rotation: 8,
        opacity: 0,
        duration: 1.1,
        ease: "back.out(1.4)"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="birthday" ref={sectionRef} className="section-wrapper">
      <div className="container">
        <div className="birthday-hero-grid">
          {/* Left Column: Romantic Content */}
          <div ref={textColRef} className="hero-text-col">
            <p className="hero-script-tag">{birthdayConfig.heroBadge}</p>

            <h2 className="hero-main-title">
              Happy Birthday, <br />
              <span className="gold-name">{birthdayConfig.name.toUpperCase()}!</span>
            </h2>

            <blockquote className="hero-quote">
              {birthdayConfig.heroQuote}
            </blockquote>

            <p className="hero-paragraph">
              {birthdayConfig.heroParagraph}
            </p>

            {/* 3 Romantic Stat Cards */}
            <div className="hero-stats-row">
              {birthdayConfig.heroStats.map((stat, idx) => (
                <div key={idx} className="stat-card">
                  <span className="stat-icon" role="img" aria-label="symbol">
                    {stat.icon}
                  </span>
                  <h3 className="stat-title">{stat.title}</h3>
                  <span className="stat-subtitle">{stat.subtitle}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Main Birthday Portrait Polaroid */}
          <div ref={portraitColRef} className="hero-portrait-col">
            <div className="hero-portrait-card">
              <span className="hero-decor-sparkle" aria-hidden="true">✨</span>
              <span className="hero-decor-flower" aria-hidden="true">🌸</span>

              <PolaroidCard
                photo={heroPhoto}
                isHero={true}
                customRotation={3}
                onOpenLightbox={onOpenLightbox}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
