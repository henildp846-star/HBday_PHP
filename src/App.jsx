import { useState } from "react";
import "./styles/variables.css";
import "./styles/global.css";
import "./styles/navigation.css";
import "./styles/polaroid.css";
import "./styles/sections.css";
import "./styles/interactive.css";
import "./styles/responsive.css";

import FloatingParticles from "./components/FloatingParticles";
import Navbar from "./components/Navbar";
import PhotoLightbox from "./components/PhotoLightbox";

import Welcome from "./sections/Welcome";
import BirthdayHero from "./sections/BirthdayHero";
import Memories from "./sections/Memories";
import Reasons from "./sections/Reasons";
import LoveLetter from "./sections/LoveLetter";
import Universe from "./sections/Universe";
import BirthdayCake from "./sections/BirthdayCake";
import FinalGift from "./sections/FinalGift";

import { photos } from "./data/photos";

export default function App() {
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  const handleOpenLightbox = (photo) => {
    setLightboxPhoto(photo);
  };

  const handleOpenLightboxBySlot = (slotId) => {
    const found = photos.find((p) => p.id === slotId);
    if (found) {
      setLightboxPhoto(found);
    }
  };

  const handleCloseLightbox = () => {
    setLightboxPhoto(null);
  };

  const handleNextLightbox = () => {
    if (!lightboxPhoto) return;
    const currentIndex = photos.findIndex((p) => p.id === lightboxPhoto.id);
    const nextIndex = (currentIndex + 1) % photos.length;
    setLightboxPhoto(photos[nextIndex]);
  };

  const handlePrevLightbox = () => {
    if (!lightboxPhoto) return;
    const currentIndex = photos.findIndex((p) => p.id === lightboxPhoto.id);
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setLightboxPhoto(photos[prevIndex]);
  };

  const handleReplayStory = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="pooja-birthday-app">
      {/* Ambient Floating Starlight & Particles */}
      <FloatingParticles />

      {/* Floating Glass Navigation */}
      <Navbar />

      <main>
        {/* Section 1: Cinematic Welcome */}
        <Welcome />

        {/* Section 2: Happy Birthday Pooja Hero */}
        <BirthdayHero onOpenLightbox={handleOpenLightbox} />

        {/* Section 3: Our Beautiful Memories (10 Polaroids) */}
        <Memories onOpenLightbox={handleOpenLightbox} />

        {/* Section 4: A Million Reasons Why You're Special (6 Love Cards) */}
        <Reasons />

        {/* Section 5: Interactive Love Letter */}
        <LoveLetter />

        {/* Section 6: Our Little Universe (Constellations & Moon) */}
        <Universe onOpenLightboxBySlot={handleOpenLightboxBySlot} />

        {/* Section 7: Interactive Birthday Cake & Candles */}
        <BirthdayCake />

        {/* Section 8: Final Gift Surprise & Keepsake Finale */}
        <FinalGift onReplayStory={handleReplayStory} />
      </main>

      {/* Fullscreen Photo Lightbox Modal */}
      {lightboxPhoto && (
        <PhotoLightbox
          photo={lightboxPhoto}
          onClose={handleCloseLightbox}
          onNext={handleNextLightbox}
          onPrev={handlePrevLightbox}
        />
      )}
    </div>
  );
}
