/**
 * OUR STORY — NOW STREAMING
 * Core Interactive Application Engine & Features
 */

import { storyData } from './storyData.js';
import { audioEngine } from './audioEngine.js';

class LoveStoryApp {
  constructor() {
    this.currentLightboxIndex = 0;
    this.currentLightboxItems = [];
    this.activeFilter = 'all';
    this.introStep = 0;
    this.introTimer = null;
    this.currentProfile = 'us';
    this.isChatPlaying = false;
    this.chatTimers = [];
    this.pinchCount = 1429;
    this.isWiping = false;

    this.init();
  }

  init() {
    this.setupProfileSelection();
    this.setupIntroSequence();
    this.renderEpisodesShelf();
    this.setupAtmosphereSlider();
    this.setupSecretTerrace();
    this.setupMaharaniRoles();
    this.setupBeardPinch();
    this.setupGiftUnboxing();
    this.setupWipeRainGlass();
    this.setupCheekKiss();
    this.setupConstellationCanvas();
    this.setupPetalsCanvas();
    this.setupWhatsAppSimulation();
    this.setupAkshataluShower();
    this.setupMovieNightMode();
    this.setupCinemaSeats();
    this.setupAudioPlayer();
    this.setupEditorialGallery();
    this.setupStoryRemote();
    this.setupRoseButton();
    this.setupSurpriseMe();
    this.setupFakeEndingScroll();
    this.setupTimelineObserver();
    this.setupStickyHeader();
    this.setupDirectButtons();
  }

  /* ==========================================================================
     03 — CINEMATIC INTRO SEQUENCE (Plays on start, transitions to profile login)
     ========================================================================== */
  setupIntroSequence() {
    const introEl = document.getElementById('cinematicIntro');
    const skipBtn = document.getElementById('skipIntroBtn');
    const phraseEl = document.getElementById('introPhrase');
    const brandingEl = document.getElementById('introBranding');
    const lightSweep = document.getElementById('introLightSweep');

    if (!introEl || !phraseEl || !brandingEl) return;

    clearTimeout(this.introTimer);
    this.introStep = 0;
    introEl.classList.remove('fade-out');
    introEl.style.display = 'flex';
    phraseEl.style.display = 'block';
    phraseEl.classList.remove('active');
    brandingEl.classList.remove('active');
    if (lightSweep) {
      lightSweep.style.opacity = '0';
      lightSweep.style.left = '-100%';
    }

    const phrases = [
      "Some stories begin with a hello.",
      "But theirs began much earlier.",
      "10th Class.<br><span style='font-size:0.7em; color:var(--accent-champagne);'>He already knew.</span>",
      "Intermediate.<br><span style='font-size:0.7em; color:var(--accent-champagne);'>He finally told her.</span>",
      "She said yes. ❤️"
    ];

    const showNextPhrase = () => {
      if (this.introStep < phrases.length) {
        phraseEl.innerHTML = phrases[this.introStep];
        phraseEl.classList.add('active');

        this.introTimer = setTimeout(() => {
          phraseEl.classList.remove('active');
          this.introStep++;
          setTimeout(showNextPhrase, 600);
        }, 2200);
      } else {
        phraseEl.style.display = 'none';
        if (lightSweep) {
          lightSweep.style.opacity = '1';
          lightSweep.style.transition = 'left 1.2s ease-in-out';
          lightSweep.style.left = '120%';
        }
        brandingEl.classList.add('active');

        this.introTimer = setTimeout(() => {
          this.dismissIntro();
        }, 3200);
      }
    };

    setTimeout(showNextPhrase, 600);

    if (skipBtn) {
      skipBtn.onclick = () => {
        this.dismissIntro();
      };
    }
  }

  playCinematicIntro() {
    this.setupIntroSequence();
  }

  dismissIntro() {
    clearTimeout(this.introTimer);
    const introEl = document.getElementById('cinematicIntro');
    const profileScreen = document.getElementById('profileScreen');

    if (introEl) {
      introEl.classList.add('fade-out');
      setTimeout(() => {
        introEl.style.display = 'none';

        // Transition smoothly to Profile Selection / Login Screen
        if (profileScreen) {
          profileScreen.style.display = 'flex';
          setTimeout(() => {
            profileScreen.classList.remove('hidden');
          }, 20);
        }
      }, 800);
    }
  }

  /* ==========================================================================
     04 — PROFILE SELECTION & LOGIN (After intro & login -> Navigates to Home)
     ========================================================================== */
  setupProfileSelection() {
    const profileScreen = document.getElementById('profileScreen');
    const profileCards = document.querySelectorAll('.profile-card');
    const switchBtn = document.getElementById('switchProfileBtn');
    const closeBtn = document.getElementById('closeProfileBtn');
    const headerAvatar = document.getElementById('headerProfileAvatar');
    const headerName = document.getElementById('headerProfileName');

    const profileData = {
      her: {
        name: "Meghana 👑",
        avatar: "./assets/media/cheek_kiss_selfie.png",
        toast: "Welcome, Maharani Meghana 👑! Enjoy your custom royal stream."
      },
      him: {
        name: "Bunnyy 🎩",
        avatar: "./assets/media/sunny_gaze_close.png",
        toast: "Welcome, Bunnyy 🎩! 8+ years of love now streaming."
      },
      us: {
        name: "Together (Us) ✨",
        avatar: "./assets/media/hero_playful_pout.png",
        toast: "Welcome to Our Story ✨ Now streaming together."
      }
    };

    // Initialize default profile in header
    this.currentProfile = 'us';
    if (headerAvatar) headerAvatar.src = profileData.us.avatar;
    if (headerName) headerName.textContent = profileData.us.name;

    profileCards.forEach(card => {
      card.addEventListener('click', () => {
        const profileType = card.dataset.profile;

        if (profileType === 'baby') {
          this.showRoseToast("👶 Profile Locked: Arriving soon… The sweetest new chapter!");
          return;
        }

        this.currentProfile = profileType;
        const config = profileData[profileType] || profileData.us;

        if (headerAvatar) headerAvatar.src = config.avatar;
        if (headerName) headerName.textContent = config.name;

        profileCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        // Dismiss Profile Modal with smooth fade
        if (profileScreen) {
          profileScreen.classList.add('hidden');
          setTimeout(() => {
            profileScreen.style.display = 'none';
          }, 500);
        }

        // NAVIGATE DIRECTLY TO HOME (#hero)
        window.location.hash = '#hero';
        const heroSection = document.getElementById('hero');
        if (heroSection) {
          heroSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }

        this.showRoseToast(config.toast);

        // Start ambient soundtrack smoothly on login
        if (!audioEngine.isPlaying) {
          audioEngine.play();
        }
      });
    });

    // Switch Profile / Open Modal Button from header
    if (switchBtn) {
      switchBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (profileScreen) {
          profileScreen.style.display = 'flex';
          setTimeout(() => {
            profileScreen.classList.remove('hidden');
          }, 20);
        }
      });
    }

    // Close Modal Button
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (profileScreen) {
          profileScreen.classList.add('hidden');
          setTimeout(() => {
            profileScreen.style.display = 'none';
          }, 500);
        }
      });
    }

    // Click outside cards to close modal (if already logged in)
    if (profileScreen) {
      profileScreen.addEventListener('click', (e) => {
        if (e.target === profileScreen) {
          profileScreen.classList.add('hidden');
          setTimeout(() => {
            profileScreen.style.display = 'none';
          }, 500);
        }
      });
    }
  }

  /* ==========================================================================
     06 — CONTINUE WATCHING (EPISODE SHELF)
     ========================================================================== */
  renderEpisodesShelf() {
    const container = document.getElementById('episodesShelfContainer');
    if (!container) return;

    container.innerHTML = storyData.episodes.map((ep, idx) => `
      <div class="episode-card" data-episode-id="${ep.id}" data-index="${idx}">
        <div class="episode-thumb">
          <img src="${ep.thumbnail}" alt="${ep.title}" loading="lazy">
          <div class="episode-play-overlay">
            <div class="play-circle">▶</div>
          </div>
          <div class="episode-progress-bar">
            <div class="episode-progress-fill" style="width: ${Math.min(100, (idx + 1) * 10)}%;"></div>
          </div>
        </div>
        <div class="episode-info">
          <div class="episode-meta-row">
            <span>${ep.number} • ${ep.badge}</span>
            <span>${ep.duration}</span>
          </div>
          <h3 class="episode-title">${ep.title}</h3>
          <p class="episode-desc">${ep.tagline}</p>
        </div>
      </div>
    `).join('');

    const prevBtn = document.getElementById('shelfPrevBtn');
    const nextBtn = document.getElementById('shelfNextBtn');

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        container.scrollBy({ left: -340, behavior: 'smooth' });
      });
      nextBtn.addEventListener('click', () => {
        container.scrollBy({ left: 340, behavior: 'smooth' });
      });
    }

    container.querySelectorAll('.episode-card').forEach(card => {
      card.addEventListener('click', () => {
        const index = parseInt(card.dataset.index, 10);
        this.openEpisodeModal(storyData.episodes[index]);
      });
    });
  }

  openEpisodeModal(ep) {
    const modal = document.getElementById('episodeDetailModal');
    if (!modal) return;

    document.getElementById('modalEpBadge').textContent = `${ep.number} • ${ep.badge}`;
    document.getElementById('modalEpTitle').textContent = ep.title;
    document.getElementById('modalEpTagline').textContent = ep.tagline;
    document.getElementById('modalEpDesc').textContent = ep.description;
    document.getElementById('modalEpDuration').textContent = ep.duration;

    const mediaWrap = document.getElementById('modalEpMedia');
    if (ep.video) {
      mediaWrap.innerHTML = `
        <video controls autoplay playsinline loop style="width:100%; border-radius:12px; max-height:480px; object-fit:cover;">
          <source src="${ep.video}" type="video/mp4">
        </video>
      `;
    } else {
      mediaWrap.innerHTML = `
        <img src="${ep.thumbnail}" alt="${ep.title}" style="width:100%; border-radius:12px; max-height:480px; object-fit:cover;">
      `;
    }

    modal.classList.add('open');
  }

  /* ==========================================================================
     INNOVATIVE FEATURE: DAY-TO-DUSK ATMOSPHERE SLIDER
     ========================================================================== */
  setupAtmosphereSlider() {
    const slider = document.getElementById('atmosphereSlider');
    const topLayer = document.getElementById('compareTopLayer');
    const handle = document.getElementById('compareHandle');
    if (!slider || !topLayer || !handle) return;

    let isDragging = false;

    const updateSlider = (clientX) => {
      const rect = slider.getBoundingClientRect();
      let pos = (clientX - rect.left) / rect.width;
      pos = Math.max(0.05, Math.min(0.95, pos));
      topLayer.style.width = `${pos * 100}%`;
      handle.style.left = `${pos * 100}%`;
    };

    slider.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateSlider(e.clientX);
    });
    window.addEventListener('mousemove', (e) => {
      if (isDragging) updateSlider(e.clientX);
    });
    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    slider.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches[0]) updateSlider(e.touches[0].clientX);
    }, { passive: true });
    window.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches[0]) updateSlider(e.touches[0].clientX);
    }, { passive: true });
    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  /* ==========================================================================
     08 — SECRET TERRACE PREMIERE
     ========================================================================== */
  setupSecretTerrace() {
    const items = document.querySelectorAll('.terrace-item-btn');
    const card = document.getElementById('terraceMemoryCard');
    const memoryTitle = document.getElementById('terraceMemoryTitle');
    const memoryDesc = document.getElementById('terraceMemoryDesc');

    const terraceMemories = {
      cake: {
        title: "The Midnight Birthday Cake 🎂",
        desc: "Under the silence of 12:00 AM, he slipped onto her terrace holding a birthday cake with candles lit, just to make sure she was the first to smile on her birthday."
      },
      teddy: {
        title: "The Teddy Bear 🧸",
        desc: "A warm, fluffy companion he gifted her on that midnight rooftop — a reminder that even when distance or phases separated them, she was always guarded and loved."
      },
      bouquet: {
        title: "The Midnight Bouquet 💐",
        desc: "Fresh fragrant blooms handed over under starry skies. That night cemented a lifelong love language: he never needed an excuse to shower her with flowers."
      }
    };

    items.forEach(btn => {
      btn.addEventListener('click', () => {
        items.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const itemKey = btn.dataset.item;
        const info = terraceMemories[itemKey];
        if (info && card) {
          memoryTitle.textContent = info.title;
          memoryDesc.textContent = info.desc;
          card.classList.remove('visible');
          void card.offsetWidth;
          card.classList.add('visible');
          this.triggerSparkles();
        }
      });
    });
  }

  /* ==========================================================================
     09 — MAHARANI ROLES VIDEO & INTERACTION
     ========================================================================== */
  setupMaharaniRoles() {
    const video = document.getElementById('maharaniVideo');
    const roleBtns = document.querySelectorAll('.role-pill-btn');
    if (!roleBtns.length) return;

    const timestamps = [0, 2, 4.5, 7.5, 11, 14, 17];

    roleBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        roleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        if (video) {
          video.currentTime = timestamps[index] || 0;
          video.play().catch(() => {});
        }
      });
    });
  }

  /* ==========================================================================
     INNOVATIVE FEATURE: BEARD PINCH COUNTER & HEAD WIGGLE
     ========================================================================== */
  setupBeardPinch() {
    const pinchBtn = document.getElementById('pinchBeardBtn');
    const wrap = document.getElementById('beardPinchWrap');
    const countEl = document.getElementById('pinchCounterNumber');
    if (!pinchBtn || !wrap) return;

    const doPinch = (e) => {
      this.pinchCount++;
      if (countEl) countEl.textContent = this.pinchCount.toLocaleString();

      wrap.classList.add('pinched');
      setTimeout(() => wrap.classList.remove('pinched'), 220);

      // Floating spark text
      const spark = document.createElement('div');
      spark.className = 'pinch-sparkle-float';
      spark.textContent = '+1 Maharani Power ✨';
      spark.style.left = `${30 + Math.random() * 40}%`;
      spark.style.top = `${40 + Math.random() * 20}%`;
      wrap.appendChild(spark);
      setTimeout(() => spark.remove(), 1000);

      // Playful pop sound
      this.playSynthTone(587.33, 0.12, 'sine');
    };

    pinchBtn.addEventListener('click', doPinch);
    wrap.addEventListener('click', doPinch);
  }

  /* ==========================================================================
     10 — MICHAEL KORS SURPRISE GIFT BOX
     ========================================================================== */
  setupGiftUnboxing() {
    const unboxBtn = document.getElementById('unboxGiftBtn');
    const giftBox = document.getElementById('interactiveGiftBox');
    const content = document.getElementById('unboxedContent');

    const triggerReveal = () => {
      if (content) {
        content.classList.add('revealed');
        this.triggerSparkles();
        this.showRoseToast("👜 Surprised! She was joking. He wasn't.");
      }
    };

    if (unboxBtn) unboxBtn.addEventListener('click', triggerReveal);
    if (giftBox) giftBox.addEventListener('click', triggerReveal);
  }

  /* ==========================================================================
     INNOVATIVE FEATURE: WIPE THE RAIN GLASS CANVAS
     ========================================================================== */
  setupWipeRainGlass() {
    const canvas = document.getElementById('wipeGlassCanvas');
    const wrapper = document.getElementById('wipeGlassWrapper');
    const resetBtn = document.getElementById('resetMistBtn');
    const hint = document.getElementById('wipeGlassHint');
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext('2d');

    const initMist = () => {
      canvas.width = wrapper.clientWidth;
      canvas.height = wrapper.clientHeight || 500;

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(25, 25, 35, 0.88)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle condensation droplets
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      for (let i = 0; i < 90; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const r = 1 + Math.random() * 3.5;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (hint) hint.style.opacity = '1';
    };

    initMist();
    window.addEventListener('resize', initMist);

    const wipe = (x, y) => {
      ctx.globalCompositeOperation = 'destination-out';
      const gradient = ctx.createRadialGradient(x, y, 5, x, y, 40);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, 40, 0, Math.PI * 2);
      ctx.fill();

      if (hint) hint.style.opacity = '0.3';
    };

    const handleMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      wipe(clientX - rect.left, clientY - rect.top);
    };

    canvas.addEventListener('mousedown', () => { this.isWiping = true; });
    window.addEventListener('mouseup', () => { this.isWiping = false; });
    canvas.addEventListener('mousemove', (e) => {
      if (this.isWiping) handleMove(e);
    });

    canvas.addEventListener('touchstart', (e) => {
      this.isWiping = true;
      handleMove(e);
    }, { passive: true });
    canvas.addEventListener('touchmove', (e) => {
      if (this.isWiping) handleMove(e);
    }, { passive: true });
    window.addEventListener('touchend', () => { this.isWiping = false; });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        initMist();
        this.showRoseToast("Glass re-misted with raindrops 🌧️");
      });
    }
  }

  /* ==========================================================================
     INNOVATIVE FEATURE: CHEEK KISS STAMPER
     ========================================================================== */
  setupCheekKiss() {
    const card = document.getElementById('kissStamperCard');
    const kissBtn = document.getElementById('sendKissBtn');
    if (!card) return;

    const stampKiss = (x, y) => {
      const kiss = document.createElement('div');
      kiss.className = 'floating-kiss-mark';
      kiss.textContent = '💋';
      kiss.style.left = `${x - 20}px`;
      kiss.style.top = `${y - 20}px`;
      card.appendChild(kiss);

      this.playSynthTone(659.25, 0.15, 'triangle');
      setTimeout(() => kiss.remove(), 1200);
      this.showRoseToast("Sweet cheek kiss stamped! ❤️");
    };

    card.addEventListener('click', (e) => {
      const rect = card.getBoundingClientRect();
      stampKiss(e.clientX - rect.left, e.clientY - rect.top);
    });

    if (kissBtn) {
      kissBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        stampKiss(card.clientWidth / 2, card.clientHeight / 2);
      });
    }
  }

  /* ==========================================================================
     13 — THE MEMORY CONSTELLATION CANVAS
     ========================================================================== */
  setupConstellationCanvas() {
    const canvas = document.getElementById('constellationCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight || 580;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars = storyData.constellationMemories.map(m => ({
      ...m,
      currentX: (m.x / 100) * canvas.width,
      currentY: (m.y / 100) * canvas.height,
      radius: 5,
      pulse: Math.random() * Math.PI * 2
    }));

    let hoveredStar = null;

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      hoveredStar = null;
      stars.forEach(s => {
        const dist = Math.hypot(mouseX - s.currentX, mouseY - s.currentY);
        if (dist < 20) {
          hoveredStar = s;
        }
      });
      canvas.style.cursor = hoveredStar ? 'pointer' : 'default';
    });

    canvas.addEventListener('click', () => {
      if (hoveredStar) {
        this.showConstellationModal(hoveredStar);
      }
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach(s => {
        s.currentX = (s.x / 100) * canvas.width;
        s.currentY = (s.y / 100) * canvas.height;
        s.pulse += 0.03;
      });

      // Connecting lines
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(230, 199, 156, 0.22)';
      ctx.lineWidth = 1.2;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const d = Math.hypot(stars[i].currentX - stars[j].currentX, stars[i].currentY - stars[j].currentY);
          if (d < canvas.width * 0.42) {
            ctx.moveTo(stars[i].currentX, stars[i].currentY);
            ctx.lineTo(stars[j].currentX, stars[j].currentY);
          }
        }
      }
      ctx.stroke();

      // Stars
      stars.forEach(s => {
        const isHovered = hoveredStar === s;
        const glow = 4 + Math.sin(s.pulse) * 3 + (isHovered ? 8 : 0);

        ctx.beginPath();
        ctx.arc(s.currentX, s.currentY, s.radius + (isHovered ? 3 : 0), 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? '#FFFFFF' : '#E6C79C';
        ctx.shadowColor = 'rgba(230, 199, 156, 0.8)';
        ctx.shadowBlur = glow;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.font = '11px Plus Jakarta Sans';
        ctx.fillStyle = isHovered ? '#FFFFFF' : 'rgba(246, 240, 232, 0.6)';
        ctx.fillText(s.title, s.currentX + 12, s.currentY + 4);
      });

      requestAnimationFrame(draw);
    };
    draw();
  }

  showSurpriseModal(memory) {
    const modal = document.getElementById('surpriseModal');
    if (!modal) return;
    const titleEl = document.getElementById('surpriseModalTitle');
    const dateEl = document.getElementById('surpriseModalDate');
    const imgEl = document.getElementById('surpriseModalImg');
    const descEl = document.getElementById('surpriseModalDesc');

    if (titleEl) titleEl.textContent = memory.title || "A Precious Memory";
    if (dateEl) dateEl.textContent = memory.date || "Our Story Milestone";
    if (imgEl) imgEl.src = memory.img || "./assets/media/sunset_embrace_gold.png";
    if (descEl) descEl.textContent = memory.text || memory.description || "Every moment spent together is a blessing.";

    modal.classList.add('open');
    this.triggerSparkles();
    this.playSynthTone(720, 0.15, 'triangle');
  }

  showConstellationModal(star) {
    this.showSurpriseModal(star);
  }

  /* ==========================================================================
     INNOVATIVE FEATURE 01: LIVE WHATSAPP TEXTING ANIMATION
     ========================================================================== */
  setupWhatsAppSimulation() {
    const chatBody = document.getElementById('waChatBody');
    const indicator = document.getElementById('waTypingIndicator');
    const typingSender = document.getElementById('typingSenderName');
    const statusText = document.getElementById('waStatusText');
    const replayBtn = document.getElementById('replayChatBtn');
    const showAllBtn = document.getElementById('showAllChatBtn');
    const toggleRawBtn = document.getElementById('toggleRawScreenshotBtn');
    const rawDrawer = document.getElementById('waComparisonDrawer');
    const wishInput = document.getElementById('waWishInput');
    const wishSendBtn = document.getElementById('waWishSendBtn');
    const reactionBtns = document.querySelectorAll('#waQuickReactions .wa-reaction-emoji-btn');
    if (!chatBody) return;

    const messages = storyData.whatsappChat;

    const clearChat = () => {
      this.chatTimers.forEach(t => clearTimeout(t));
      this.chatTimers = [];
      const msgEls = chatBody.querySelectorAll('.wa-msg');
      msgEls.forEach(el => el.remove());
    };

    const renderMessageElement = (msg) => {
      const div = document.createElement('div');
      div.className = `wa-msg ${msg.sender === 'meghana' ? 'sent' : 'received'} ${msg.highlight ? 'highlight-msg' : ''}`;
      div.innerHTML = `
        <span>${msg.highlight ? '<strong>' + msg.text + '</strong>' : msg.text}</span>
        <span class="wa-time">${msg.time} ${msg.sender === 'meghana' ? '<span class="wa-checkmarks">✓✓</span>' : ''}</span>
      `;
      // Insert before typing indicator
      chatBody.insertBefore(div, indicator);
      void div.offsetWidth;
      div.classList.add('revealed');
      chatBody.scrollTop = chatBody.scrollHeight;
    };

    const playSequence = () => {
      clearChat();
      this.isChatPlaying = true;
      let delay = 600;

      messages.forEach((msg, idx) => {
        // Typing indicator step
        const t1 = setTimeout(() => {
          if (indicator && typingSender) {
            typingSender.textContent = msg.sender === 'meghana' ? 'Meghana' : 'Bunnyy';
            indicator.classList.add('active');
            if (statusText) statusText.textContent = `${msg.sender === 'meghana' ? 'Meghana' : 'Bunnyy'} is typing...`;
            chatBody.scrollTop = chatBody.scrollHeight;
          }
        }, delay);
        this.chatTimers.push(t1);

        // Message arrival step
        const typingDuration = 900 + Math.min(1000, msg.text.length * 40);
        delay += typingDuration;

        const t2 = setTimeout(() => {
          if (indicator) indicator.classList.remove('active');
          if (statusText) statusText.textContent = 'online • Wedding Eve, 11:58 PM';
          renderMessageElement(msg);
          this.playSynthTone(msg.sender === 'meghana' ? 680 : 540, 0.08, 'sine');
          if (idx === messages.length - 1) this.isChatPlaying = false;
        }, delay);
        this.chatTimers.push(t2);

        delay += 600;
      });
    };

    const showAll = () => {
      clearChat();
      if (indicator) indicator.classList.remove('active');
      if (statusText) statusText.textContent = 'online • Wedding Eve, 11:58 PM';
      messages.forEach(renderMessageElement);
      this.isChatPlaying = false;
    };

    if (replayBtn) replayBtn.addEventListener('click', playSequence);
    if (showAllBtn) showAllBtn.addEventListener('click', showAll);

    if (toggleRawBtn && rawDrawer) {
      toggleRawBtn.addEventListener('click', () => {
        const isShown = rawDrawer.style.display !== 'none';
        rawDrawer.style.display = isShown ? 'none' : 'block';
        toggleRawBtn.textContent = isShown ? '📱 Raw WhatsApp' : '✕ Close Raw';
      });
    }

    // Quick emoji reaction animations
    reactionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const emoji = btn.getAttribute('data-emoji') || '❤️';
        this.triggerChatReaction(emoji);
      });
    });

    // Interactive Wishing Input Bar (Send blessings & receive automated couple reply)
    const handleSendWish = () => {
      if (!wishInput) return;
      const text = wishInput.value.trim();
      if (!text) return;
      wishInput.value = '';

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const guestDiv = document.createElement('div');
      guestDiv.className = 'wa-msg guest-msg revealed';
      guestDiv.innerHTML = `
        <span style="font-size:0.68rem; color:#25d366; font-weight:700; letter-spacing:0.05em;">YOUR BLESSING 💌</span><br>
        <span>${this.escapeHtml(text)}</span>
        <span class="wa-time">${timeStr} <span class="wa-checkmarks" style="color:#53bdeb;">✓✓</span></span>
      `;
      chatBody.insertBefore(guestDiv, indicator);
      chatBody.scrollTop = chatBody.scrollHeight;
      this.playSynthTone(750, 0.1, 'sine');
      this.triggerChatReaction('🎉');

      // Automated heartfelt couple reply
      if (indicator && typingSender) {
        typingSender.textContent = "Meghana & Bunnyy";
        if (statusText) statusText.textContent = "Meghana & Bunnyy are typing...";
        indicator.classList.add('active');
        chatBody.scrollTop = chatBody.scrollHeight;
      }

      setTimeout(() => {
        if (indicator) indicator.classList.remove('active');
        if (statusText) statusText.textContent = 'online • Wedding Eve, 11:58 PM';

        const replyDiv = document.createElement('div');
        replyDiv.className = 'wa-msg couple-reply revealed';
        replyDiv.innerHTML = `
          <span style="font-size:0.68rem; color:var(--accent-champagne); font-weight:700; letter-spacing:0.05em;">MEGHANA &amp; BUNNYY 🥂✨</span><br>
          <span>Aww, thank you so much for your sweet blessings! ❤️ Our 8+ years journey is complete with people like you in our lives! — Meghana &amp; Bunnyy 👰🤵</span>
          <span class="wa-time">${timeStr}</span>
        `;
        chatBody.insertBefore(replyDiv, indicator);
        chatBody.scrollTop = chatBody.scrollHeight;
        this.playSynthTone(640, 0.15, 'triangle');
        this.triggerSparkles();
        this.showRoseToast("💌 Meghana & Bunnyy received your wedding wish!");
      }, 1600);
    };

    if (wishSendBtn) wishSendBtn.addEventListener('click', handleSendWish);
    if (wishInput) {
      wishInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleSendWish();
      });
    }

    // Auto-play when chat enters viewport
    const phone = document.getElementById('whatsappPhone');
    if (phone) {
      let triggered = false;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !triggered) {
            triggered = true;
            playSequence();
          }
        });
      }, { threshold: 0.3 });
      observer.observe(phone);
    }
  }

  triggerChatReaction(emoji) {
    const phone = document.getElementById('whatsappPhone') || document.body;
    for (let i = 0; i < 7; i++) {
      const el = document.createElement('div');
      el.className = 'floating-wa-reaction';
      el.textContent = emoji;
      el.style.left = `${15 + Math.random() * 70}%`;
      el.style.bottom = `${70 + Math.random() * 50}px`;
      el.style.animationDelay = `${i * 0.08}s`;
      phone.appendChild(el);
      setTimeout(() => el.remove(), 1600);
    }
    this.playSynthTone(600, 0.08, 'sine');
  }

  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /* ==========================================================================
     INNOVATIVE FEATURE: AKSHATALU SACRED RICE & FLOWER SHOWER
     ========================================================================== */
  setupAkshataluShower() {
    const canvas = document.getElementById('akshataluCanvas');
    const wrapper = document.getElementById('akshataluWrapper');
    const showerBtn = document.getElementById('showerAkshataluBtn');
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let isShowering = false;

    const resize = () => {
      canvas.width = wrapper.clientWidth;
      canvas.height = wrapper.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const triggerShower = () => {
      resize();
      particles = Array.from({ length: 90 }).map(() => ({
        x: Math.random() * canvas.width,
        y: -10 - Math.random() * 50,
        type: Math.random() > 0.4 ? 'rice' : 'petal',
        size: 3 + Math.random() * 4,
        speedY: 2 + Math.random() * 3,
        speedX: (Math.random() - 0.5) * 1.5,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.05,
        opacity: 0.8 + Math.random() * 0.2
      }));

      isShowering = true;
      this.playSynthTone(783.99, 0.4, 'triangle'); // Temple bell blessing chime
      this.showRoseToast("🌾 Akshatalu & Sacred Blessings Showered! Two souls bound forever.");
    };

    if (showerBtn) showerBtn.addEventListener('click', triggerShower);

    const render = () => {
      if (isShowering) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = 0;

        particles.forEach(p => {
          p.y += p.speedY;
          p.x += p.speedX;
          p.rotation += p.rotSpeed;

          if (p.y < canvas.height) alive++;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);

          if (p.type === 'rice') {
            // Golden yellow rice grain
            ctx.fillStyle = `rgba(235, 195, 65, ${p.opacity})`;
            ctx.fillRect(-p.size / 2, -p.size, p.size * 0.7, p.size * 2);
          } else {
            // Rose / Marigold petal
            ctx.fillStyle = Math.random() > 0.5 ? 'rgba(215, 50, 75, 0.85)' : 'rgba(240, 140, 30, 0.85)';
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size * 1.5, p.size, 0, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        });

        if (alive === 0) isShowering = false;
      }
      requestAnimationFrame(render);
    };
    render();
  }

  /* ==========================================================================
     SUBTLE FLOATING ROSE PETALS CANVAS
     ========================================================================== */
  setupPetalsCanvas() {
    const canvas = document.getElementById('petalsCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    const petals = Array.from({ length: 14 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: 5 + Math.random() * 6,
      speedY: 0.4 + Math.random() * 0.7,
      speedX: (Math.random() - 0.5) * 0.4,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      opacity: 0.15 + Math.random() * 0.25
    }));

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      petals.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y > h) p.y = -20;
        if (p.x > w) p.x = 0;
        if (p.x < 0) p.x = w;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.65, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 40, 75, ${p.opacity})`;
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(render);
    };
    render();
  }

  /* ==========================================================================
     17 — MOVIE NIGHT MODE & ASIAN CINEMAS SEATS
     ========================================================================== */
  setupMovieNightMode() {
    const toggleBtn = document.getElementById('startMovieNightBtn');
    const heroBtn = document.getElementById('startMovieNightHeroBtn');
    const overlay = document.getElementById('movieNightTheaterOverlay');
    const closeBtn = document.getElementById('theaterOverlayCloseBtn');
    const bottomExitBtn = document.getElementById('theaterBottomExitBtn');
    const video = document.getElementById('theaterVideoPlayer');
    const switchBtn = document.getElementById('theaterSwitchVideoBtn');
    const exitBtn = document.getElementById('exitMovieNightBtn');

    const videoClips = [
      "./assets/media/video_arcade_fun.mp4",
      "./assets/media/video_twirl_handhold.mp4",
      "./assets/media/video_beach_romance.mp4",
      "./assets/media/video_car_drive.mp4",
      "./assets/media/video_wedding_mandapam.mp4"
    ];
    let clipIndex = 0;

    const openTheater = () => {
      if (overlay) overlay.classList.add('open');
      document.body.classList.add('movie-mode-active');
      if (video) {
        video.src = videoClips[clipIndex];
        video.play().catch(() => {});
      }
      this.showRoseToast("🍿 Movie Night Mode Activated — Bedroom cinema dim lights & cuddles!");
      this.triggerSparkles();
    };

    const closeTheater = () => {
      if (overlay) overlay.classList.remove('open');
      document.body.classList.remove('movie-mode-active');
      if (video) video.pause();
    };

    if (heroBtn) {
      heroBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openTheater();
      });
    }
    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openTheater();
      });
    }
    if (closeBtn) closeBtn.addEventListener('click', closeTheater);
    if (bottomExitBtn) bottomExitBtn.addEventListener('click', closeTheater);
    if (exitBtn) exitBtn.addEventListener('click', closeTheater);

    if (switchBtn && video) {
      switchBtn.addEventListener('click', () => {
        clipIndex = (clipIndex + 1) % videoClips.length;
        video.src = videoClips[clipIndex];
        video.play().catch(() => {});
        this.showRoseToast(`🎬 Playing Scene ${clipIndex + 1} of ${videoClips.length}`);
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay && overlay.classList.contains('open')) {
        closeTheater();
      }
    });
  }

  setupCinemaSeats() {
    const seatM = document.getElementById('seatMeghana');
    const seatB = document.getElementById('seatBunnyy');

    if (seatM) {
      seatM.addEventListener('click', () => {
        this.showRoseToast("Seat F13: Reserved for Maharani Meghana 👑 Extra caramel popcorn & cozy hoodie.");
      });
    }
    if (seatB) {
      seatB.addEventListener('click', () => {
        this.showRoseToast("Seat F14: Reserved for Bunnyy 🎩 Mission: Keep Maharani laughing and happy.");
      });
    }
  }

  /* ==========================================================================
     19 — ORIGINAL SOUNDTRACK & AUDIO PLAYER
     ========================================================================== */
  setupAudioPlayer() {
    const playBtn = document.getElementById('playerPlayBtn');
    const prevBtn = document.getElementById('playerPrevBtn');
    const nextBtn = document.getElementById('playerNextBtn');
    const trackSelect = document.getElementById('trackSelectDropdown');
    const volumeSlider = document.getElementById('volumeSlider');
    const muteBtn = document.getElementById('muteBtn');

    const trackTitleEl = document.getElementById('playerTrackTitle');
    const trackArtistEl = document.getElementById('playerTrackArtist');

    const miniPlayBtn = document.getElementById('miniPlayBtn');
    const miniTrackTitle = document.getElementById('miniTrackTitle');

    if (playBtn) playBtn.addEventListener('click', () => audioEngine.toggle());
    if (miniPlayBtn) miniPlayBtn.addEventListener('click', () => audioEngine.toggle());
    if (prevBtn) prevBtn.addEventListener('click', () => audioEngine.prevTrack());
    if (nextBtn) nextBtn.addEventListener('click', () => audioEngine.nextTrack());

    if (trackSelect) {
      trackSelect.addEventListener('change', (e) => {
        audioEngine.setTrack(parseInt(e.target.value, 10));
      });
    }
    if (volumeSlider) {
      volumeSlider.addEventListener('input', (e) => {
        audioEngine.setVolume(parseFloat(e.target.value));
      });
    }
    if (muteBtn) {
      muteBtn.addEventListener('click', () => audioEngine.toggleMute());
    }

    audioEngine.subscribe(state => {
      const icon = state.isPlaying ? '❚❚' : '▶';
      if (playBtn) playBtn.textContent = icon;
      if (miniPlayBtn) miniPlayBtn.textContent = icon;

      if (trackTitleEl) trackTitleEl.textContent = state.currentTrack.title;
      if (trackArtistEl) trackArtistEl.textContent = state.currentTrack.artist;
      if (miniTrackTitle) miniTrackTitle.textContent = state.currentTrack.title;

      if (trackSelect) trackSelect.value = state.trackIndex;
      if (muteBtn) muteBtn.textContent = state.isMuted ? '🔇' : '🔊';
    });

    this.setupWaveformCanvas();
  }

  setupWaveformCanvas() {
    const canvas = document.getElementById('waveformCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const render = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const numBars = 36;
      const barWidth = canvas.width / numBars - 3;
      const energy = audioEngine.getEnergy();

      for (let i = 0; i < numBars; i++) {
        const height = audioEngine.isPlaying
          ? Math.max(6, (Math.sin(Date.now() * 0.005 + i * 0.4) * 0.5 + 0.5) * (canvas.height * 0.75) * (energy * 1.5 + 0.4))
          : 4;

        const x = i * (barWidth + 3);
        const y = (canvas.height - height) / 2;

        ctx.fillStyle = i % 2 === 0 ? '#E6C79C' : '#8B1E3F';
        ctx.fillRect(x, y, barWidth, height);
      }
      requestAnimationFrame(render);
    };
    render();
  }

  /* ==========================================================================
     28 — EDITORIAL GALLERY & LIGHTBOX
     ========================================================================== */
  setupEditorialGallery() {
    const grid = document.getElementById('galleryGrid');
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    if (!grid) return;

    const renderGallery = () => {
      const filtered = this.activeFilter === 'all'
        ? storyData.gallery
        : storyData.gallery.filter(item => item.tag.toLowerCase() === this.activeFilter.toLowerCase());

      grid.innerHTML = filtered.map((item, idx) => `
        <div class="gallery-card" data-index="${idx}" style="cursor:pointer; border-radius:12px; overflow:hidden; border:1px solid var(--border-subtle); position:relative;">
          <img src="${item.src}" alt="${item.title}" loading="lazy" style="width:100%; height:260px; object-fit:cover; display:block; transition:transform 0.5s ease;">
          <div class="gallery-card-hover" style="position:absolute; inset:0; background:linear-gradient(0deg, rgba(7,7,7,0.85) 0%, transparent 60%); padding:16px; display:flex; flex-direction:column; justify-content:flex-end;">
            <span style="font-size:0.7rem; color:var(--accent-champagne); font-weight:700; text-transform:uppercase;">${item.tag}</span>
            <h4 style="font-family:var(--font-serif); font-size:1rem; margin-top:2px;">${item.title}</h4>
          </div>
        </div>
      `).join('');

      grid.querySelectorAll('.gallery-card').forEach(card => {
        card.addEventListener('click', () => {
          const index = parseInt(card.dataset.index, 10);
          this.openLightbox(filtered, index);
        });
      });
    };

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeFilter = btn.dataset.filter;
        renderGallery();
      });
    });

    renderGallery();
    this.setupLightboxControls();
  }

  openLightbox(items, index) {
    this.currentLightboxItems = items;
    this.currentLightboxIndex = index;
    const modal = document.getElementById('lightboxModal');
    if (!modal) return;

    this.updateLightboxContent();
    modal.classList.add('open');
  }

  updateLightboxContent() {
    const item = this.currentLightboxItems[this.currentLightboxIndex];
    if (!item) return;

    const container = document.getElementById('lightboxMedia');
    const caption = document.getElementById('lightboxCaption');

    container.innerHTML = `<img src="${item.src}" alt="${item.title}" class="lightbox-img">`;
    caption.textContent = `${item.title} — ${item.caption || ''}`;
  }

  setupLightboxControls() {
    const modal = document.getElementById('lightboxModal');
    const closeBtn = document.getElementById('lightboxCloseBtn');
    const prevBtn = document.getElementById('lightboxPrevBtn');
    const nextBtn = document.getElementById('lightboxNextBtn');

    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.currentLightboxIndex = (this.currentLightboxIndex - 1 + this.currentLightboxItems.length) % this.currentLightboxItems.length;
        this.updateLightboxContent();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.currentLightboxIndex = (this.currentLightboxIndex + 1) % this.currentLightboxItems.length;
        this.updateLightboxContent();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (!modal || !modal.classList.contains('open')) return;
      if (e.key === 'Escape') modal.classList.remove('open');
      if (e.key === 'ArrowLeft') prevBtn && prevBtn.click();
      if (e.key === 'ArrowRight') nextBtn && nextBtn.click();
    });
  }

  /* ==========================================================================
     24 — STORY REMOTE & ROSE BUTTON
     ========================================================================== */
  setupStoryRemote() {
    const remoteBtn = document.getElementById('storyRemoteBtn');
    const modal = document.getElementById('storyRemoteModal');
    const closeBtn = document.getElementById('remoteCloseBtn');
    const grid = document.getElementById('remoteEpisodesGrid');

    if (grid) {
      grid.innerHTML = storyData.episodes.map(ep => `
        <a href="#chapter-${ep.id}" class="remote-ep-item">
          <span style="color:var(--accent-champagne); font-weight:700; font-size:0.75rem;">${ep.number}</span>
          <span style="font-weight:600; font-size:0.9rem;">${ep.title}</span>
        </a>
      `).join('');

      grid.querySelectorAll('.remote-ep-item').forEach(item => {
        item.addEventListener('click', () => {
          modal.classList.remove('open');
        });
      });
    }

    if (remoteBtn && modal) {
      remoteBtn.addEventListener('click', () => modal.classList.add('open'));
    }
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    }

    const replayIntroBtn = document.getElementById('remoteReplayIntroBtn');
    if (replayIntroBtn && modal) {
      replayIntroBtn.addEventListener('click', () => {
        modal.classList.remove('open');
        this.playCinematicIntro();
      });
    }
  }

  setupRoseButton() {
    const roseBtn = document.getElementById('floatingRoseBtn');
    if (roseBtn) {
      roseBtn.addEventListener('click', () => {
        this.showRoseToast("No occasion needed. 🌹");
        this.triggerRoseBloomBurst();
      });
    }
  }

  triggerRoseBloomBurst() {
    for (let i = 0; i < 15; i++) {
      const petal = document.createElement('div');
      petal.textContent = '🌹';
      petal.style.position = 'fixed';
      petal.style.bottom = '84px';
      petal.style.left = '24px';
      petal.style.fontSize = `${16 + Math.random() * 16}px`;
      petal.style.pointerEvents = 'none';
      petal.style.zIndex = '10001';
      petal.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
      document.body.appendChild(petal);

      setTimeout(() => {
        petal.style.transform = `translate(${Math.random() * 150}px, -${60 + Math.random() * 200}px) rotate(${Math.random() * 180}deg)`;
        petal.style.opacity = '0';
      }, 20);

      setTimeout(() => petal.remove(), 1300);
    }
  }

  triggerSparkles() {
    for (let i = 0; i < 20; i++) {
      const spark = document.createElement('div');
      spark.textContent = ['✨', '💫', '⭐', '💛'][Math.floor(Math.random() * 4)];
      spark.style.position = 'fixed';
      spark.style.left = '50%';
      spark.style.top = '50%';
      spark.style.fontSize = `${16 + Math.random() * 18}px`;
      spark.style.pointerEvents = 'none';
      spark.style.zIndex = '10001';
      spark.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
      document.body.appendChild(spark);

      setTimeout(() => {
        spark.style.transform = `translate(${(Math.random() - 0.5) * 350}px, ${(Math.random() - 0.5) * 350}px) scale(0)`;
        spark.style.opacity = '0';
      }, 20);

      setTimeout(() => spark.remove(), 1200);
    }
  }

  showRoseToast(text) {
    let toast = document.getElementById('roseToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'roseToast';
      toast.className = 'rose-bloom-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }

  playSynthTone(freq = 440, duration = 0.2, type = 'sine') {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!this.soundCtx) this.soundCtx = new AudioCtx();
      if (this.soundCtx.state === 'suspended') this.soundCtx.resume();

      const osc = this.soundCtx.createOscillator();
      const gain = this.soundCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.soundCtx.currentTime);

      gain.gain.setValueAtTime(0.08, this.soundCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.soundCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.soundCtx.destination);
      osc.start();
      osc.stop(this.soundCtx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  /* ==========================================================================
     27 — SURPRISE ME & DIRECT BUTTONS
     ========================================================================== */
  setupSurpriseMe() {
    const surpriseBtn = document.getElementById('surpriseMeBtn');
    const modal = document.getElementById('surpriseModal');
    const closeBtn = document.getElementById('surpriseModalCloseBtn');
    const dismissBtn = document.getElementById('surpriseModalDismissBtn');
    const nextBtn = document.getElementById('surpriseModalNextBtn');

    const pickAndShow = () => {
      const memories = storyData.constellationMemories;
      const picked = memories[Math.floor(Math.random() * memories.length)];
      this.showSurpriseModal(picked);
    };

    if (surpriseBtn) {
      surpriseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        pickAndShow();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        pickAndShow();
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    }
    if (dismissBtn && modal) {
      dismissBtn.addEventListener('click', () => modal.classList.remove('open'));
    }
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
      });
    }
  }

  setupDirectButtons() {
    // Header Audio Drawer Popover Toggle
    const audioBtn = document.getElementById('headerAudioToggle');
    const audioDrawer = document.getElementById('headerAudioDrawer');
    const closeDrawerBtn = document.getElementById('closeHeaderAudioBtn');
    const drawerPlayBtn = document.getElementById('drawerPlayBtn');
    const drawerPrevBtn = document.getElementById('drawerPrevBtn');
    const drawerNextBtn = document.getElementById('drawerNextBtn');
    const drawerVolume = document.getElementById('drawerVolumeSlider');
    const drawerTitle = document.getElementById('drawerTrackTitle');
    const drawerArtist = document.getElementById('drawerTrackArtist');
    const drawerEq = document.getElementById('drawerEqualizer');

    const updateDrawerUI = (state) => {
      const isPlaying = state ? state.isPlaying : audioEngine.isPlaying;
      const track = state ? state.currentTrack : audioEngine.tracks[audioEngine.currentTrackIndex];

      if (drawerTitle && track) drawerTitle.textContent = track.title;
      if (drawerArtist && track) drawerArtist.textContent = track.artist;
      if (drawerPlayBtn) drawerPlayBtn.textContent = isPlaying ? "⏸ Pause" : "▶ Play";
      if (drawerEq) {
        drawerEq.querySelectorAll('.eq-bar').forEach(b => {
          b.classList.toggle('active', isPlaying);
        });
      }
    };

    // Subscribe to audioEngine updates
    audioEngine.subscribe((state) => {
      updateDrawerUI(state);
    });

    if (audioBtn && audioDrawer) {
      audioBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = audioDrawer.classList.toggle('open');
        if (isOpen && !audioEngine.isPlaying) {
          audioEngine.play();
        }
        updateDrawerUI();
      });
    }

    if (closeDrawerBtn && audioDrawer) {
      closeDrawerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        audioDrawer.classList.remove('open');
      });
    }

    if (drawerPlayBtn) {
      drawerPlayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        audioEngine.toggle();
        updateDrawerUI();
      });
    }
    if (drawerPrevBtn) {
      drawerPrevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        audioEngine.prevTrack();
        updateDrawerUI();
      });
    }
    if (drawerNextBtn) {
      drawerNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        audioEngine.nextTrack();
        updateDrawerUI();
      });
    }
    if (drawerVolume) {
      drawerVolume.addEventListener('input', (e) => {
        audioEngine.setVolume(parseFloat(e.target.value));
      });
    }

    // Close audio drawer on outside click
    document.addEventListener('click', (e) => {
      if (audioDrawer && audioDrawer.classList.contains('open')) {
        if (!audioDrawer.contains(e.target) && e.target !== audioBtn) {
          audioDrawer.classList.remove('open');
        }
      }
    });

    // Watch Story CTA button
    const watchBtn = document.getElementById('watchStoryBtn');
    if (watchBtn) {
      watchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const shelf = document.getElementById('episodesShelf');
        if (shelf) shelf.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Emotional Archive Shower Petals
    const archiveBlessBtn = document.getElementById('archiveHeartPetalsBtn');
    if (archiveBlessBtn) {
      archiveBlessBtn.addEventListener('click', () => {
        this.triggerRoseBloomBurst();
        this.triggerSparkles();
        this.showRoseToast("🌹 8 years of devotion. Heartfelt blessings showered upon Meghana & Bunnyy!");
        this.playSynthTone(587.33, 0.25, 'triangle');
      });
    }
  }

  /* ==========================================================================
     21 & 22 — FAKE ENDING & BABY PROFILE UNLOCK
     ========================================================================== */
  setupFakeEndingScroll() {
    const fakeEndEl = document.getElementById('fakeEndingStage');
    const theEndText = document.getElementById('theEndText');
    const actuallyText = document.getElementById('actuallyText');
    const babySection = document.getElementById('nextEpisodeBaby');

    if (!fakeEndEl) return;

    let triggered = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          setTimeout(() => {
            if (theEndText) theEndText.style.opacity = '0.15';
            if (actuallyText) actuallyText.style.display = 'block';
            if (babySection) babySection.style.display = 'block';
            this.showRoseToast("👶 Unlocked: Profile Arrived! Two became one story, soon becomes three.");
          }, 1400);
        }
      });
    }, { threshold: 0.4 });

    observer.observe(fakeEndEl);
  }

  /* ==========================================================================
     STICKY HEADER & TIMELINE TRACKER
     ========================================================================== */
  setupStickyHeader() {
    const header = document.getElementById('siteHeader');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  setupTimelineObserver() {
    const steps = document.querySelectorAll('.timeline-step');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
      let currentId = '';
      sections.forEach(sec => {
        const top = sec.offsetTop - 180;
        if (window.scrollY >= top) {
          currentId = sec.getAttribute('id');
        }
      });

      steps.forEach(step => {
        step.classList.toggle('active', step.dataset.target === currentId);
      });
    });

    steps.forEach(step => {
      step.addEventListener('click', () => {
        const target = document.getElementById(step.dataset.target);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new LoveStoryApp();
});
