import { useState, useEffect } from "react";
import { Sparkles, Menu, X } from "./Icons";
import MusicPlayer from "./MusicPlayer";
import { birthdayConfig } from "../data/birthdayConfig";

const navItems = [
  { label: "WELCOME", id: "welcome" },
  { label: "BIRTHDAY", id: "birthday" },
  { label: "MEMORIES", id: "memories" },
  { label: "WHY YOU", id: "why-you" },
  { label: "LOVE LETTER", id: "love-letter" },
  { label: "UNIVERSE", id: "universe" },
  { label: "MAKE A WISH", id: "cake" },
  { label: "FINAL GIFT", id: "final-gift" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("welcome");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine active section based on scroll position
      const scrollPos = window.scrollY + 200;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <header className="navbar-wrapper">
        <nav
          className={`navbar-inner ${scrolled ? "navbar-scrolled" : ""}`}
          aria-label="Main Navigation"
        >
          {/* Brand Logo */}
          <a
            href="#welcome"
            className="nav-brand"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("welcome");
            }}
          >
            <div className="nav-brand-icon">
              <Sparkles size={16} />
            </div>
            <div className="nav-brand-text">
              <span className="nav-brand-title">{birthdayConfig.navLogo}</span>
              <span className="nav-brand-script">{birthdayConfig.navSublogo}</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={`nav-link-btn ${activeSection === item.id ? "active" : ""}`}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right Action: Romantic Music Player */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <MusicPlayer />

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer / Overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-nav-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="mobile-nav-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>

          <div
            className="mobile-nav-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="nav-brand" style={{ marginBottom: "1rem" }}>
              <div className="nav-brand-icon">
                <Sparkles size={18} />
              </div>
              <div className="nav-brand-text">
                <span className="nav-brand-title">{birthdayConfig.navLogo}</span>
                <span className="nav-brand-script">{birthdayConfig.navSublogo}</span>
              </div>
            </div>

            <ul className="mobile-nav-links">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`mobile-nav-link-btn ${activeSection === item.id ? "active" : ""}`}
                    onClick={() => scrollToSection(item.id)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
