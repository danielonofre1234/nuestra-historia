/**
 * ====================================================================
 * NUESTRA HISTORIA - Lógica Principal (main.js)
 * ====================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inicializar nombres y textos
  initTexts();

  // 2. Inicializar música
  initMusic();

  // 3. Inicializar contador y vela
  initCounterAndCandle();

  // 4. Renderizar recuerdos (Polaroids)
  renderMemories();

  // 5. Renderizar razones
  renderReasons();

  // 6. Inicializar carta interactiva
  initLetter();

  // 7. Inicializar WhatsApp si está configurado
  initWhatsApp();

  // 8. Iniciar partículas en Canvas
  initParticles();
});

/* ==========================================================
 * 1. Textos y Nombres
 * ========================================================== */
function initTexts() {
  const partner = CONFIG.partnerName || "Tú";
  const you = CONFIG.yourName || "Yo";

  const heroPartner = document.getElementById("hero-partner-name");
  const heroYou = document.getElementById("hero-your-name");
  const footerPartner = document.getElementById("footer-partner-name");
  const footerYou = document.getElementById("footer-your-name");
  const letterSender = document.getElementById("letter-sender-name");

  if (heroPartner) heroPartner.textContent = partner;
  if (heroYou) heroYou.textContent = you;
  if (footerPartner) footerPartner.textContent = partner;
  if (footerYou) footerYou.textContent = you;
  if (letterSender) letterSender.textContent = you;
}

/* ==========================================================
 * 2. Reproductor de Música
 * ========================================================== */
function initMusic() {
  const audio = document.getElementById("bg-audio");
  const toggleBtn = document.getElementById("music-toggle-btn");
  const musicIcon = document.getElementById("music-icon");
  const musicTitle = document.getElementById("music-title");
  const musicStatus = document.getElementById("music-status");

  if (!CONFIG.music || !CONFIG.music.url) {
    if (toggleBtn) toggleBtn.style.display = "none";
    return;
  }

  audio.src = CONFIG.music.url;
  if (musicTitle && CONFIG.music.title) {
    musicTitle.textContent = CONFIG.music.title;
  }

  let isPlaying = false;

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      musicIcon.className = "fa-solid fa-play text-sm";
      musicStatus.textContent = "Pausada";
    } else {
      audio.play().then(() => {
        isPlaying = true;
        musicIcon.className = "fa-solid fa-pause text-sm";
        musicStatus.textContent = "Reproduciendo...";
      }).catch((err) => {
        console.log("Interacción requerida para reproducir audio:", err);
      });
    }
  };

  if (toggleBtn) {
    toggleBtn.addEventListener("click", togglePlay);
  }
}

/* ==========================================================
 * 3. Contador de Tiempo y Vela Interactiva
 * ========================================================== */
function initCounterAndCandle() {
  const countDays = document.getElementById("count-days");
  const countHours = document.getElementById("count-hours");
  const countMinutes = document.getElementById("count-minutes");
  const countSeconds = document.getElementById("count-seconds");
  const counterTitle = document.getElementById("counter-title");
  const counterStatusText = document.getElementById("counter-status-text");

  const candleBtn = document.getElementById("candle-btn");
  const candleFlame = document.getElementById("candle-flame");
  const candleHint = document.getElementById("candle-hint");

  let isReopened = CONFIG.dates.isReopened ?? false;
  const startDate = new Date(CONFIG.dates.startDate).getTime();
  const pauseDate = new Date(CONFIG.dates.pauseDate).getTime();

  function updateDisplayState() {
    if (isReopened) {
      if (candleFlame) candleFlame.classList.remove("off");
      if (counterTitle) counterTitle.textContent = "Tiempo compartido juntos (En marcha)";
      if (counterStatusText) counterStatusText.textContent = "El reloj sigue latiendo con cada latido de nuestro corazón...";
      if (candleHint) candleHint.textContent = "(La vela está encendida. Haz clic para pausar)";
    } else {
      if (candleFlame) candleFlame.classList.add("off");
      if (counterTitle) counterTitle.textContent = "Tiempo compartido juntos (Pausado)";
      if (counterStatusText) counterStatusText.textContent = "El reloj espera por ti... Toca la vela para reanudar.";
      if (candleHint) candleHint.textContent = "(Toca la vela para encenderla y reanudar el reloj ✨)";
    }
  }

  function updateTimer() {
    const now = Date.now();
    const targetTime = isReopened ? now : pauseDate;
    let diff = Math.max(0, targetTime - startDate);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const pad = (n) => String(n).padStart(2, "0");

    if (countDays) countDays.textContent = pad(days);
    if (countHours) countHours.textContent = pad(hours);
    if (countMinutes) countMinutes.textContent = pad(minutes);
    if (countSeconds) countSeconds.textContent = pad(seconds);
  }

  updateDisplayState();
  updateTimer();
  setInterval(updateTimer, 1000);

  // Clic en la vela
  if (candleBtn) {
    candleBtn.addEventListener("click", () => {
      isReopened = !isReopened;
      updateDisplayState();
      updateTimer();
    });
  }
}

/* ==========================================================
 * 4. Galería de Recuerdos (Polaroids)
 * ========================================================== */
function renderMemories() {
  const container = document.getElementById("memories-grid");
  if (!container || !CONFIG.memories || CONFIG.memories.length === 0) return;

  const rotations = [-2.2, 1.8, -1.5, 2.5, -2.8, 1.9];

  container.innerHTML = CONFIG.memories.map((mem, index) => {
    const rot = rotations[index % rotations.length];
    return `
      <div class="flex justify-center p-2">
        <div class="polaroid-card w-full max-w-sm rounded-sm" style="transform: rotate(${rot}deg);">
          <div class="tape-effect"></div>
          
          <div class="overflow-hidden rounded-xs bg-slate-900 aspect-[4/3] relative">
            <img 
              src="${mem.image}" 
              alt="${mem.title}" 
              loading="lazy" 
              class="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              onerror="this.src='https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80'"
            />
          </div>

          <div class="pt-4 px-1 text-center space-y-1.5">
            <h3 class="font-serif-title font-bold text-lg text-slate-800 leading-snug">${mem.title}</h3>
            ${mem.date ? `<span class="inline-block text-xs font-medium text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full">${mem.date}</span>` : ""}
            <p class="font-handwritten text-lg text-slate-600 leading-snug pt-1">${mem.description}</p>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

/* ==========================================================
 * 5. Razones Especiales
 * ========================================================== */
function renderReasons() {
  const container = document.getElementById("reasons-grid");
  if (!container || !CONFIG.reasons || CONFIG.reasons.length === 0) return;

  container.innerHTML = CONFIG.reasons.map((reason, index) => `
    <div class="glass-card glass-card-hover rounded-xl p-5 flex items-start gap-4">
      <div class="w-8 h-8 rounded-full bg-rose-500/20 text-rose-300 flex-shrink-0 flex items-center justify-center mt-0.5">
        <i class="fa-solid fa-heart text-xs heart-beat"></i>
      </div>
      <div>
        <span class="text-[11px] font-semibold text-rose-300/80 uppercase tracking-widest block mb-1">
          Razón #${index + 1}
        </span>
        <p class="text-slate-200 text-sm sm:text-base leading-relaxed font-light">
          ${reason}
        </p>
      </div>
    </div>
  `).join("");
}

/* ==========================================================
 * 6. Carta Interactiva (Sobre & Sello)
 * ========================================================== */
function initLetter() {
  const closed = document.getElementById("envelope-closed");
  const opened = document.getElementById("envelope-opened");
  const sealBtn = document.getElementById("wax-seal-btn");
  const closeBtn = document.getElementById("close-letter-btn");
  const preview = document.getElementById("letter-preview");
  const title = document.getElementById("letter-title");
  const paragraphs = document.getElementById("letter-paragraphs");
  const closing = document.getElementById("letter-closing");

  if (!CONFIG.letter) return;

  if (preview && CONFIG.letter.previewText) {
    preview.textContent = CONFIG.letter.previewText;
  }
  if (title && CONFIG.letter.title) {
    title.textContent = CONFIG.letter.title;
  }
  if (closing && CONFIG.letter.closing) {
    closing.textContent = CONFIG.letter.closing;
  }

  if (paragraphs && CONFIG.letter.paragraphs) {
    paragraphs.innerHTML = CONFIG.letter.paragraphs
      .map(p => `<p class="leading-relaxed indent-4">${p}</p>`)
      .join("");
  }

  const openLetter = () => {
    closed.classList.add("hidden");
    opened.classList.remove("hidden");
  };

  const closeLetter = () => {
    opened.classList.add("hidden");
    closed.classList.remove("hidden");
  };

  if (closed) closed.addEventListener("click", openLetter);
  if (sealBtn) sealBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openLetter();
  });
  if (closeBtn) closeBtn.addEventListener("click", closeLetter);
}

/* ==========================================================
 * 7. WhatsApp
 * ========================================================== */
function initWhatsApp() {
  const section = document.getElementById("whatsapp-section");
  const link = document.getElementById("whatsapp-link");

  if (!CONFIG.whatsappNumber || !CONFIG.whatsappNumber.trim()) {
    return;
  }

  const cleanNumber = CONFIG.whatsappNumber.replace(/[^0-9]/g, "");
  const defaultText = encodeURIComponent(`Hola ${CONFIG.yourName || ""}, acabo de ver la página de nuestra historia... ❤️`);

  if (link) {
    link.href = `https://wa.me/${cleanNumber}?text=${defaultText}`;
  }
  if (section) {
    section.classList.remove("hidden");
  }
}

/* ==========================================================
 * 8. Partículas Románticas (Canvas)
 * ========================================================== */
function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particlesCount = 45;
  const particles = [];

  for (let i = 0; i < particlesCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.8,
      speedY: Math.random() * 0.4 + 0.15,
      speedX: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.7 + 0.2,
      fadeSpeed: (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1)
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
      p.y -= p.speedY;
      p.x += p.speedX;
      p.alpha += p.fadeSpeed;

      if (p.alpha <= 0.15 || p.alpha >= 0.85) {
        p.fadeSpeed = -p.fadeSpeed;
      }

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(244, 194, 194, ${p.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = "rgba(255, 101, 132, 0.6)";
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  animate();
}
