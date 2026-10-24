import { useState } from "react";

export default function PolaroidCard({
  photo,
  isHero = false,
  onOpenLightbox,
  customRotation
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const rotation = customRotation !== undefined ? customRotation : photo.rotation || 0;

  const handleClick = () => {
    if (onOpenLightbox) {
      onOpenLightbox(photo);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="polaroid-card-wrapper">
      <div
        className="polaroid-card"
        style={{ transform: `rotate(${rotation}deg)` }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`View photo memory: ${photo.caption}`}
      >
        {/* Washi Tape */}
        <div className="polaroid-tape" aria-hidden="true" />

        {/* Inner Photo Area */}
        <div className="polaroid-inner">
          {!hasError && (
            <img
              src={photo.src}
              alt={photo.caption || photo.title}
              className="polaroid-img"
              style={{ display: isLoaded ? "block" : "none" }}
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
            />
          )}

          {/* Placeholder State (Stitch Design Spec) */}
          {(hasError || !isLoaded) && (
            <div className="polaroid-placeholder">
              <span className="placeholder-asset-pill">
                ASSET: {photo.id}
              </span>
              <div className="placeholder-icon-circle">
                <span>{photo.emoji || "✨"}</span>
              </div>
              <h4 className="placeholder-title">{photo.title}</h4>
              <p className="placeholder-slot">
                {isHero ? photo.heroSlotLabel : photo.slotLabel}
              </p>
            </div>
          )}
        </div>

        {/* Handwritten Caption on Ivory Polaroid Paper */}
        <div className="polaroid-caption-area">
          <p className="polaroid-caption">
            {photo.caption}
          </p>
          <span className="polaroid-subtitle">
            {isHero ? photo.heroSubtitle : photo.subtitle}
          </span>
        </div>
      </div>
    </div>
  );
}
