/**
 * MUHAMMAD TAYYAB NADEEM — THE DIGITAL ARCHITECT
 * Cinematic Videographer & Post-Production Editor Portfolio
 * Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Live Viewfinder Timecode Engine (HH:MM:SS:FF at 60 FPS)
     ========================================================================== */
  const navTimecodeEl = document.querySelector('#navTimecode .tc-val');
  let frameCount = 0;

  function updateTimecode() {
    frameCount++;
    const fps = 60;
    const totalSeconds = Math.floor(frameCount / fps);
    const frames = frameCount % fps;
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600);

    const pad = (n, len = 2) => String(n).padStart(len, '0');
    const tcString = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;

    if (navTimecodeEl) {
      navTimecodeEl.textContent = tcString;
    }
    const drawerTimecodeEl = document.getElementById('drawerTimecode');
    if (drawerTimecodeEl) {
      drawerTimecodeEl.textContent = tcString;
    }

    requestAnimationFrame(updateTimecode);
  }
  requestAnimationFrame(updateTimecode);




  /* ==========================================================================
     3. Navbar Scroll & Mobile Drawer Navigation
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerActionLinks = document.querySelectorAll('.drawer-link, .drawer-primary-btn, .drawer-social-pill, .drawer-logo');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  function openDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('open');
      mobileDrawer.setAttribute('aria-hidden', 'false');
    }
    if (drawerBackdrop) {
      drawerBackdrop.classList.add('open');
    }
    if (mobileMenuBtn) {
      mobileMenuBtn.classList.add('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
    }
    if (drawerBackdrop) {
      drawerBackdrop.classList.remove('open');
    }
    if (mobileMenuBtn) {
      mobileMenuBtn.classList.remove('active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (mobileDrawer && mobileDrawer.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  drawerActionLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });



  /* ==========================================================================
     4. Hero Showreel Guaranteed Autoplay Engine
     ========================================================================== */
  const heroVideo = document.querySelector('.hero-bg-video');
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.playsInline = true;
    const attemptAutoplay = () => {
      const playPromise = heroVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // In case browser policy demands a user gesture, kick off autoplay on first interaction
          const unlockAutoplay = () => {
            heroVideo.play().catch(() => {});
            window.removeEventListener('click', unlockAutoplay);
            window.removeEventListener('touchstart', unlockAutoplay);
            window.removeEventListener('scroll', unlockAutoplay);
          };
          window.addEventListener('click', unlockAutoplay, { once: true, passive: true });
          window.addEventListener('touchstart', unlockAutoplay, { once: true, passive: true });
          window.addEventListener('scroll', unlockAutoplay, { once: true, passive: true });
        });
      }
    };
    attemptAutoplay();
  }

  /* ==========================================================================
     5. Portfolio Video Card Controls & Filter Tabs
     (Reels are played on request only via click, not automatically on hover)
     ========================================================================== */
  const projectCards = document.querySelectorAll('.project-card');

  // Filter Buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.dataset.filter;

      projectCards.forEach(card => {
        const categories = (card.dataset.category || '').split(' ');
        if (filterVal === 'all' || categories.includes(filterVal) || card.id === 'customVideoCard') {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     6. Cinema Video Lightbox Modal & Custom Player
     ========================================================================== */
  const cinemaModal = document.getElementById('cinemaModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalVideoPlayer = document.getElementById('modalVideoPlayer');
  const modalVideoSource = document.getElementById('modalVideoSource');
  const modalVideoTitle = document.getElementById('modalVideoTitle');
  const modalVideoClient = document.getElementById('modalVideoClient');
  const modalVideoDesc = document.getElementById('modalVideoDesc');
  const modalSpecs = document.getElementById('modalSpecs');

  // Player controls
  const playPauseBtn = document.getElementById('playPauseBtn');
  const playPauseIcon = document.getElementById('playPauseIcon');
  const volumeBtn = document.getElementById('volumeBtn');
  const volumeIcon = document.getElementById('volumeIcon');
  const playerProgressContainer = document.getElementById('playerProgressContainer');
  const playerProgressBar = document.getElementById('playerProgressBar');
  const currentTimeEl = document.getElementById('currentTime');
  const durationTimeEl = document.getElementById('durationTime');
  const fullscreenBtn = document.getElementById('fullscreenBtn');

  function openModal(videoSrc, title, client, desc, specs) {
    if (!cinemaModal || !modalVideoPlayer || !modalVideoSource) return;

    modalVideoSource.src = videoSrc;
    modalVideoPlayer.load();
    if (modalVideoTitle) modalVideoTitle.textContent = title || 'Cinematic Production';
    if (modalVideoClient) modalVideoClient.textContent = client || 'Client Feature';
    if (modalVideoDesc) modalVideoDesc.textContent = desc || 'High-impact videography and post-production.';
    if (modalSpecs) modalSpecs.textContent = specs || '4K UHD • 60 FPS';

    cinemaModal.classList.add('open');
    cinemaModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Play video
    const playPromise = modalVideoPlayer.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        if (playPauseIcon) playPauseIcon.className = 'fa-solid fa-pause';
      }).catch(() => {
        if (playPauseIcon) playPauseIcon.className = 'fa-solid fa-play';
      });
    }
  }

  function closeModal() {
    if (!cinemaModal || !modalVideoPlayer) return;

    modalVideoPlayer.pause();
    cinemaModal.classList.remove('open');
    cinemaModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Click handler for project cards to open modal
  projectCards.forEach(card => {
    if (card.id === 'customVideoCard') return; // slot card links to contact

    card.addEventListener('click', () => {
      const videoSrc = card.dataset.video;
      const title = card.dataset.title;
      const client = card.dataset.client;
      const desc = card.dataset.desc;
      const specs = card.dataset.specs;

      if (videoSrc) {
        openModal(videoSrc, title, client, desc, specs);
      }
    });
  });

  // Hero Play Reel Button
  const playReelBtn = document.getElementById('playReelBtn');
  if (playReelBtn) {
    playReelBtn.addEventListener('click', () => {
      const videoSrc = playReelBtn.dataset.video || 'videos/laiba reel 2.mp4';
      const title = playReelBtn.dataset.title || 'Laiba Reel 2';
      const client = playReelBtn.dataset.client || 'Ideas One';
      const desc = playReelBtn.dataset.desc || 'Promotional reel featuring Laiba for Ideas One.';
      const specs = playReelBtn.dataset.specs || '1080P • Reel';
      openModal(videoSrc, title, client, desc, specs);
    });
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // Keyboard shortcut to close (ESC) or toggle (SPACE)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cinemaModal.classList.contains('open')) {
      closeModal();
    }
    if (e.key === ' ' && cinemaModal.classList.contains('open') && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      togglePlayPause();
    }
  });

  // Player Play/Pause
  function togglePlayPause() {
    if (!modalVideoPlayer) return;
    if (modalVideoPlayer.paused) {
      modalVideoPlayer.play();
      if (playPauseIcon) playPauseIcon.className = 'fa-solid fa-pause';
    } else {
      modalVideoPlayer.pause();
      if (playPauseIcon) playPauseIcon.className = 'fa-solid fa-play';
    }
  }

  if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlayPause);
  if (modalVideoPlayer) {
    modalVideoPlayer.addEventListener('click', togglePlayPause);

    // Update progress bar
    modalVideoPlayer.addEventListener('timeupdate', () => {
      if (!modalVideoPlayer.duration) return;
      const progressPercent = (modalVideoPlayer.currentTime / modalVideoPlayer.duration) * 100;
      if (playerProgressBar) playerProgressBar.style.width = `${progressPercent}%`;

      const formatTime = (time) => {
        const m = Math.floor(time / 60);
        const s = Math.floor(time % 60);
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
      };

      if (currentTimeEl) currentTimeEl.textContent = formatTime(modalVideoPlayer.currentTime);
      if (durationTimeEl) durationTimeEl.textContent = formatTime(modalVideoPlayer.duration);
    });

    modalVideoPlayer.addEventListener('ended', () => {
      if (playPauseIcon) playPauseIcon.className = 'fa-solid fa-play';
    });
  }

  // Scrubbing on Progress Bar
  if (playerProgressContainer) {
    playerProgressContainer.addEventListener('click', (e) => {
      if (!modalVideoPlayer || !modalVideoPlayer.duration) return;
      const rect = playerProgressContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percent = clickX / rect.width;
      modalVideoPlayer.currentTime = percent * modalVideoPlayer.duration;
    });
  }

  // Volume / Mute Toggle
  if (volumeBtn && modalVideoPlayer) {
    volumeBtn.addEventListener('click', () => {
      modalVideoPlayer.muted = !modalVideoPlayer.muted;
      if (modalVideoPlayer.muted) {
        volumeIcon.className = 'fa-solid fa-volume-xmark';
      } else {
        volumeIcon.className = 'fa-solid fa-volume-high';
      }
    });
  }

  // Fullscreen with comprehensive iOS / WebKit / Android / Desktop support
  if (fullscreenBtn && modalVideoPlayer) {
    const modalPlayerWrapper = document.getElementById('modalPlayerWrapper');
    const fullscreenIcon = fullscreenBtn.querySelector('i') || fullscreenBtn;

    function isElementFullscreen() {
      return !!(document.fullscreenElement || 
                document.webkitFullscreenElement || 
                document.mozFullScreenElement || 
                document.msFullscreenElement ||
                modalVideoPlayer.webkitDisplayingFullscreen);
    }

    function updateFullscreenIcon(isFullscreen) {
      if (fullscreenIcon) {
        if (isFullscreen) {
          fullscreenIcon.className = 'fa-solid fa-compress';
        } else {
          fullscreenIcon.className = 'fa-solid fa-expand';
        }
      }
    }

    fullscreenBtn.addEventListener('click', (e) => {
      e.stopPropagation();

      // 1. Mobile iOS Safari: uses webkitEnterFullscreen directly on HTML5 video
      if (modalVideoPlayer.webkitEnterFullscreen && typeof document.fullscreenEnabled === 'undefined') {
        modalVideoPlayer.webkitEnterFullscreen();
        return;
      }

      // 2. Standard or WebKit container fullscreen
      if (!isElementFullscreen()) {
        const target = modalPlayerWrapper || modalVideoPlayer;
        if (target.requestFullscreen) {
          target.requestFullscreen().catch(() => {
            if (modalVideoPlayer.webkitEnterFullscreen) {
              modalVideoPlayer.webkitEnterFullscreen();
            } else if (modalVideoPlayer.requestFullscreen) {
              modalVideoPlayer.requestFullscreen().catch(() => {});
            }
          });
        } else if (target.webkitRequestFullscreen) {
          target.webkitRequestFullscreen();
        } else if (modalVideoPlayer.webkitRequestFullscreen) {
          modalVideoPlayer.webkitRequestFullscreen();
        } else if (modalVideoPlayer.webkitEnterFullscreen) {
          modalVideoPlayer.webkitEnterFullscreen();
        } else if (target.msRequestFullscreen) {
          target.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    });

    ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(evt => {
      document.addEventListener(evt, () => {
        updateFullscreenIcon(isElementFullscreen());
      });
    });

    // iOS fullscreen lifecycle events
    modalVideoPlayer.addEventListener('webkitbeginfullscreen', () => updateFullscreenIcon(true));
    modalVideoPlayer.addEventListener('webkitendfullscreen', () => updateFullscreenIcon(false));
  }

  /* ==========================================================================
     7. Interactive Booking / Brief Form
     ========================================================================== */
  const bookingForm = document.getElementById('bookingForm');
  const formFeedback = document.getElementById('formFeedback');
  const submitFormBtn = document.getElementById('submitFormBtn');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const email = document.getElementById('clientEmail').value.trim();
      const projectType = document.getElementById('projectType').value;
      const details = document.getElementById('projectDetails').value.trim();

      if (!name || !email || !details) return;

      // Visual feedback loading
      submitFormBtn.disabled = true;
      submitFormBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Transmitting...';

      setTimeout(() => {
        submitFormBtn.disabled = false;
        submitFormBtn.innerHTML = '<i class="fa-solid fa-check"></i> Brief Transmitted!';

        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = `<strong>Thank you, ${name}!</strong> Your project brief has been received. Tayyab will review your requirements and reach out to <strong>${email}</strong> with an estimate within 24 hours.`;

        bookingForm.reset();

        setTimeout(() => {
          submitFormBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Transmit Project Brief';
        }, 5000);
      }, 1200);
    });
  }

  /* ==========================================================================
     9. Interactive Stats Counter Animation on Scroll
     ========================================================================== */
  const statNumbers = document.querySelectorAll('.stat-num[data-count]');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.dataset.count, 10);
          let current = 0;
          const step = Math.ceil(target / 40);
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            if (target === 50) {
              stat.textContent = `${current}+`;
            } else if (target === 5) {
              stat.textContent = `${current}M+`;
            } else {
              stat.textContent = current;
            }
          }, 35);
        });
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

  // Dynamic Year in footer
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

});
