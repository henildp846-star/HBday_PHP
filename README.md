# For Pooja, My Universe ❤️
### A Production-Ready Romantic Birthday Web Application

Crafted with React, Vite, GSAP, and CSS3, faithfully reproducing the Google Stitch dark romantic aesthetic with smooth animations, interactive features, and full responsive design.

---

## 🌟 Interactive Highlights

1. **Floating Dark Glass Navigation**:
   - Fixed pill design with active section highlighting, smooth scrolling, and an ambient sound equalizer toggle.
   - Comprehensive mobile drawer navigation with animated staggered links and backdrop dismissal.

2. **Cinematic Welcome Experience**:
   - Center-stage animated aura with staggered romantic typography.
   - Interactive CTA with celebratory confetti burst that guides the visitor to the birthday celebration.

3. **Happy Birthday Pooja Hero**:
   - Two-column balanced editorial layout with romantic quotes and three keepsake cards.
   - Tilted warm-ivory Polaroid frame with realistic washi tape, decorative sparkles, and smooth 3D hover physics.

4. **Scrapbook of Our Hearts (10 Dedicated Photo Slots)**:
   - 3-column responsive Polaroid gallery with natural tilt angles and handwritten script captions.
   - **Elegant Fallbacks**: Displays the Stitch design placeholder tags (`ASSET: PHOTO_XX`, themed icon, slot number) when photos are not yet present, preventing broken image icons.
   - **Cinematic Fullscreen Lightbox**: Arrow keys, escape key, close button, and mobile swipe gesture navigation.

5. **A Million Reasons Why You're Special**:
   - 6 glowing dark burgundy cards with rose borders and affectionate personal notes.

6. **Interactive Love Letter**:
   - Realistic envelope with triangular flap and pulsating wax heart seal button (`Tap to Open My Heart 💗`).
   - Opens sequentially into vintage ivory paper with handwritten salutations, romantic paragraphs, and close button.

7. **Our Little Universe (Constellations of Us)**:
   - Celestial nighttime atmosphere with a gently glowing moon orb.
   - 4 constellation cards with gold accents and cosmic icons (Sun, Moon, Saturn, Sparkles).

8. **Make a Wish Birthday Cake Ritual**:
   - Layered pink and burgundy birthday cake with decorative details and custom greeting: `Pooja 💖`.
   - 3 candles with realistic flickering animated flames.
   - Interactive `Blow Out the Candles 🕯️` button: flames extinguish, smoke rises, confetti bursts, and an affectionate outcome card reveals with a reset button.

9. **Final Keepsake Surprise Finale**:
   - Wine-red gift box with golden ribbon and bow.
   - Unfolds into a glowing keepsake card with the eternal promise: `"I Love You, Pooja. Forever & Always. ♾️❤️"`.
   - `Experience Our Story Again ❤️` replay button resets the interactive states and smoothly scrolls to the beginning.

10. **Romantic Melody Music Player**:
    - Supports `/audio/romantic-melody.mp3`.
    - Includes a built-in soothing Web Audio API music-box synthesizer fallback that plays gentle romantic chords even if no MP3 has been uploaded yet.

---

## 📸 How to Personalize Photos

All photo references are configured centrally in [src/data/photos.js](file:///D:/OneDrive/Desktop/Hbd/src/data/photos.js).

To add real photos:
1. Place 10 images inside the `public/images/` directory:
   - `photo-01.jpg` (Main birthday portrait)
   - `photo-02.jpg` (The First Time We Laughed)
   - `photo-03.jpg` (Golden Hour Walk)
   - `photo-04.jpg` (Coffee & Daydreams)
   - `photo-05.jpg` (Pure Carefree Joy)
   - `photo-06.jpg` (Midnight Whispers)
   - `photo-07.jpg` (Road Trip Playlist)
   - `photo-08.jpg` (Kitchen Chaos)
   - `photo-09.jpg` (Soft Evening Light)
   - `photo-10.jpg` (A Toast to Us)

2. If your files have different extensions (e.g. `.png`, `.jpeg`), simply update the `src` field in `src/data/photos.js`.

---

## 🎵 How to Add Background Music

1. Place your romantic audio file at:
   `public/audio/romantic-melody.mp3`
2. If omitted, the website automatically plays a peaceful, romantic kalimba melody using the browser's built-in Web Audio API when the user clicks the music pill.

---

## 💌 How to Edit Text, Messages, and Quotes

Edit [src/data/birthdayConfig.js](file:///D:/OneDrive/Desktop/Hbd/src/data/birthdayConfig.js):
- **Hero Title & Paragraphs**: Modify `heroTitle`, `heroQuote`, `heroParagraph`
- **Love Letter**: Customize the salutation, paragraphs, and signature inside `letter`
- **Reasons Why**: Customize any of the 6 reasons in [src/data/reasons.js](file:///D:/OneDrive/Desktop/Hbd/src/data/reasons.js)
- **Finale Message**: Edit `gift.cardHeading`, `gift.quote1`, `gift.finalPromise`

---

## 🚀 Running the Project

### Development Server
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
npm run preview
```
The optimized static build is generated into the `dist/` directory, ready to be hosted anywhere.
