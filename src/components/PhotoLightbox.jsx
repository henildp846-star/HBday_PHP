import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "./Icons";

export default function PhotoLightbox({ photo, onClose, onNext, onPrev }) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [photo?.id]);

  useEffect(() => {
    // Lock body scrolling
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onNext, onPrev]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      onNext();
    } else if (diff < -50) {
      onPrev();
    }
  };

  if (!photo) return null;

  return (
    <div
      className="lightbox-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged Memory Lightbox"
    >
      <div
        className="lightbox-content"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Close Button */}
        <button
          className="lightbox-close-btn"
          onClick={onClose}
          aria-label="Close Lightbox"
          type="button"
        >
          <X size={22} />
        </button>

        {/* Previous Button */}
        <button
          className="lightbox-nav-btn prev"
          onClick={onPrev}
          aria-label="Previous Memory"
          type="button"
        >
          <ChevronLeft size={26} />
        </button>

        {/* Next Button */}
        <button
          className="lightbox-nav-btn next"
          onClick={onNext}
          aria-label="Next Memory"
          type="button"
        >
          <ChevronRight size={26} />
        </button>

        {/* Enlarged Polaroid Frame */}
        <div className="lightbox-frame">
          <div className="lightbox-img-box">
            {!hasError && (
              <img
                src={photo.src}
                alt={photo.caption || photo.title}
                className="lightbox-img"
                style={{ display: isLoaded ? "block" : "none" }}
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
              />
            )}

            {(hasError || !isLoaded) && (
              <div className="polaroid-placeholder" style={{ minHeight: "340px", width: "100%" }}>
                <span className="placeholder-asset-pill">
                  ASSET: {photo.id}
                </span>
                <div className="placeholder-icon-circle" style={{ width: "64px", height: "64px", fontSize: "2rem" }}>
                  <span>{photo.emoji || "✨"}</span>
                </div>
                <h3 className="placeholder-title" style={{ fontSize: "1.35rem" }}>
                  {photo.title}
                </h3>
                <p className="placeholder-slot" style={{ fontSize: "0.85rem", marginTop: "0.3rem" }}>
                  {photo.slotLabel}
                </p>
              </div>
            )}
          </div>

          <div className="lightbox-caption-box">
            <h2 className="lightbox-caption">{photo.caption}</h2>
            <p className="lightbox-sub">{photo.subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
