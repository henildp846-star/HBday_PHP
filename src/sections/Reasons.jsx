import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { reasons } from "../data/reasons";

gsap.registerPlugin(ScrollTrigger);

export default function Reasons() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reason-card", {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: 45,
        opacity: 0,
        stagger: 0.12,
        duration: 0.75,
        ease: "power2.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="why-you" ref={sectionRef} className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="stitch-badge badge-pink">
            <span>AFFECTION NOTES</span>
          </div>

          <h2 className="section-title">
            A Million Reasons <span className="italic-accent">Why You're Special</span>
          </h2>

          <p className="section-subtitle">
            "Little love notes written across the stars, dedicated to Pooja."
          </p>
        </div>

        {/* 6 Reasons Grid */}
        <div ref={gridRef} className="reasons-grid">
          {reasons.map((item) => (
            <article key={item.id} className="reason-card">
              <div className="reason-icon-box" aria-hidden="true">
                <span>{item.icon}</span>
              </div>
              <h3 className="reason-title">"{item.title}"</h3>
              <p className="reason-desc">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
