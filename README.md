# Muhammad Tayyab Nadeem — The Digital Architect Portfolio

A cinematic, dynamic, high-performance portfolio website built specifically for **Muhammad Tayyab Nadeem** — Professional Videographer & Post-Production Editor.

---

## 🌟 Key Features Included

1. **Camera Viewfinder HUD & Real-Time Timecode:**
   - 60 FPS live frame counter (`HH:MM:SS:FF`), recording status indicator, 4K UHD metadata, and camera crosshairs.
2. **Featured Video Showcase & Hero Showreel (Your Authentic Productions for Ideas One):**
   - **Hero Showreel:** Laiba Reel 2 (`videos/Laiba Reel2 v3.mp4`).
   - **Fahad Mustafa:** Commercial reel.
   - **Bilal Walkthrough:** Property walkthrough reel.
   - **Laiba Reel 1, 2, 3:** Promotional social reels.
   - Live video preview on hover with custom timecode and full-screen cinema player modal.
3. **Cinema Lightbox Video Player Modal:**
   - Full playback controls, timeline scrub bar, timecode counter, mute/unmute, and fullscreen theater mode.
4. **Verified Professional Portrait & Profile:**
   - Features your authentic portrait extracted in high resolution.
   - Strictly omits personal street address and university educational degrees, per your instructions.
5. **Software Stack & Filmmaking Gear:**
   - CapCut Pro, DaVinci Resolve, Adobe Photoshop, Adobe Lightroom, High-End Cinema Smartphone, 3-Axis Mobile Gimbal, and Wireless Microphones.
6. **Direct Booking & Client Connect:**
   - Direct Instagram link to `@tayyab_pov07`, direct WhatsApp link to `+92 322 4422553`, direct email to `tayyeb31075@gmail.com`, and an interactive project brief submission form.

---

## 🚀 How to Run Locally

### Option 1: One-Click Windows Launcher (Easiest)
Simply double-click the [`run.bat`](file:///c:/Users/SKY-TECH/Documents/Portfolio/run.bat) file in this folder. It will:
1. Start the local server with streaming video support.
2. Automatically launch your default browser to `http://localhost:3000/`.

### Option 2: Via Terminal / Command Prompt
Open PowerShell or Command Prompt in this folder and run:
```bash
node server.js
```
Then visit [http://localhost:3000/](http://localhost:3000/).

---

## 🎬 How to Add or Replace Your Own Videos

All your media files are located in the `assets/` directory:

- **Videos:** `assets/videos/`
  - Replace or add your MP4 files in this folder.
- **Cover Images / Posters:** `assets/images/`
  - Place your thumbnail images (16:9 or 9:16) here.

### To update a project card in [`index.html`](file:///c:/Users/SKY-TECH/Documents/Portfolio/index.html):
Locate the `<article class="project-card ...">` block in `index.html` and update the attributes:
```html
<article class="project-card format-landscape" 
  data-category="architectural" 
  data-video="assets/videos/your_new_video.mp4" 
  data-title="Your New Project Title" 
  data-client="Client Name" 
  data-specs="4K UHD • 60 FPS • DaVinci Resolve" 
  data-desc="Description of your project...">
  
  <div class="card-media-wrapper">
    <img src="assets/images/your_thumbnail.jpg" alt="Poster" class="card-poster">
    <video class="card-preview-video" muted loop playsinline preload="none">
      <source src="assets/videos/your_new_video.mp4" type="video/mp4">
    </video>
  ...
```

---

## 🌐 How to Deploy for Free (Going Live)

### Method 1: Vercel (Recommended — Free & Ultra-Fast)
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub.
2. Drag and drop this `Portfolio` folder into Vercel, or connect your GitHub repository.
3. Vercel will instantly deploy it with an SSL certificate and give you a live link like `tayyab-portfolio.vercel.app`.
4. You can connect a custom domain (e.g. `tayyabpov.com`) for free in Vercel domain settings.

### Method 2: Netlify (Free Drag-and-Drop)
1. Go to [netlify.com](https://www.netlify.com).
2. Log in and go to the **Sites** tab.
3. Drag and drop the `Portfolio` folder directly onto the page.
4. Your website is instantly live within 10 seconds!

### Method 3: GitHub Pages (Free Hosting with Git)
1. Create a repository on GitHub (e.g. `tayyab-portfolio`).
2. Push your files:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/tayyab-portfolio.git
   git push -u origin main
   ```
3. In GitHub repo Settings > **Pages**, select `main` branch and click **Save**.
4. Your site will be live at `https://YOUR_USERNAME.github.io/tayyab-portfolio/`.

---

© 2026 Muhammad Tayyab Nadeem. All rights reserved.
