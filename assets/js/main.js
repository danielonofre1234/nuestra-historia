/**
 * ====================================================================
 * NUESTRA HISTORIA - LÓGICA INTERACTIVA Y VISUAL DE ALTO IMPACTO
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  injectConfigData();
  initParticles();
  initMusicPlayer();
  initRelationshipTimer();
  initCandle();
  initWaxSealLetter();
  initMemories();
  initReasons();
  initClickHearts();
  initVirtualHug();
  initAudioSynthesizer();
}

/* ------------------------------------------------------------------
 * 1. INYECCIÓN DE DATOS DINÁMICOS DESDE CONFIG.JS
 * ------------------------------------------------------------------ */
function injectConfigData() {
  if (typeof CONFIG === 'undefined') {
    console.error("CONFIG no está definido. Revisa config.js");
    return;
  }

  // Títulos y Nombres
  document.querySelectorAll('.js-partner-name').forEach(el => el.textContent = CONFIG.partnerName);
  document.querySelectorAll('.js-your-name').forEach(el => el.textContent = CONFIG.yourName);

  // Carta
  const letterTitle = document.getElementById('letter-title');
  if (letterTitle) letterTitle.textContent = CONFIG.letter.title;

  const letterPreview = document.getElementById('letter-preview');
  if (letterPreview) letterPreview.textContent = CONFIG.letter.previewText;

  const letterClosing = document.getElementById('letter-closing');
  if (letterClosing) letterClosing.textContent = CONFIG.letter.closing;

  // Renderizar párrafos de la carta
  const paragraphsContainer = document.getElementById('letter-paragraphs');
  if (paragraphsContainer && CONFIG.letter.paragraphs) {
    paragraphsContainer.innerHTML = '';
    CONFIG.letter.paragraphs.forEach((pText, idx) => {
      const p = document.createElement('p');
      p.className = 'text-[#352129] text-base md:text-lg leading-relaxed mb-5 font-serif text-justify';
      if (idx === 0) {
        // Drop cap dorado / vintage
        p.className += ' first-letter:text-5xl first-letter:font-playfair first-letter:text-[#a41e54] first-letter:mr-2.5 first-letter:float-left first-letter:font-bold first-letter:leading-none';
      }
      p.textContent = pText;
      paragraphsContainer.appendChild(p);
    });
  }

  // Frase de la vela (si está configurada)
  if (CONFIG.dates && CONFIG.dates.candleQuote) {
    const candleStatus = document.getElementById('candle-status-text');
    if (candleStatus) candleStatus.textContent = CONFIG.dates.candleQuote;
  }


  // Botón WhatsApp
  const whatsappBtn = document.getElementById('whatsapp-cta-btn');
  if (whatsappBtn) {
    if (CONFIG.whatsappNumber && CONFIG.whatsappNumber.trim() !== '') {
      const defaultMsg = encodeURIComponent(`Hola ${CONFIG.yourName}, vi la página de Nuestra Historia y me llegó al corazón... Me gustaría que platiquemos ❤️`);
      whatsappBtn.href = `https://wa.me/${CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${defaultMsg}`;
      whatsappBtn.classList.remove('hidden');
    } else {
      whatsappBtn.href = '#';
      whatsappBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Puedes configurar tu número de WhatsApp en config.js para enlazar este botón directamente.');
      });
    }
  }

  // Año actual en el footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ------------------------------------------------------------------
 * 2. FONDO DE PARTÍCULAS / ESTRELLAS Y DESTELLOS MÁGICOS
 * ------------------------------------------------------------------ */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particlesCount = Math.min(Math.floor(window.innerWidth / 12), 75);
  const particles = [];

  class Particle {
    constructor() {
      this.reset();
      this.y = Math.random() * height;
    }

    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 20;
      this.size = Math.random() * 2.6 + 0.8;
      this.speedY = Math.random() * 0.45 + 0.15;
      this.speedX = (Math.random() - 0.5) * 0.35;
      this.alpha = Math.random() * 0.7 + 0.2;
      this.pulseSpeed = Math.random() * 0.02 + 0.008;
      this.isTwinkle = Math.random() > 0.65;
      // Colores: oro cálido, rosa suave, blanco estelar
      const colors = ['255, 220, 230', '244, 194, 194', '236, 201, 123', '255, 255, 255'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.alpha += Math.sin(Date.now() * this.pulseSpeed) * 0.015;

      if (this.y < -15 || this.x < -15 || this.x > width + 15) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${Math.max(0.08, Math.min(this.alpha, 0.9))})`;
      ctx.shadowBlur = this.isTwinkle ? 16 : 8;
      ctx.shadowColor = `rgba(${this.color}, 0.9)`;
      ctx.fill();

      // Destello en cruz para partículas especiales
      if (this.isTwinkle && this.alpha > 0.5) {
        ctx.strokeStyle = `rgba(${this.color}, ${this.alpha * 0.6})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(this.x - this.size * 2.2, this.y);
        ctx.lineTo(this.x + this.size * 2.2, this.y);
        ctx.moveTo(this.x, this.y - this.size * 2.2);
        ctx.lineTo(this.x, this.y + this.size * 2.2);
        ctx.stroke();
      }

      ctx.restore();
    }
  }

  for (let i = 0; i < particlesCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

/* ------------------------------------------------------------------
 * 3. EFECTO DE CORAZONES FLOTANTES AL HACER CLIC EN CUALQUIER PARTE
 * ------------------------------------------------------------------ */
function initClickHearts() {
  const icons = ['💖', '✨', '🌸', '💕', '💫', '🤍'];
  
  document.addEventListener('click', (e) => {
    // Si hace clic en un botón interactivo grande, evitamos saturar
    if (e.target.closest('#wax-seal-btn') || e.target.closest('#hug-btn')) return;

    for (let i = 0; i < 3; i++) {
      const heart = document.createElement('span');
      heart.className = 'click-heart';
      heart.textContent = icons[Math.floor(Math.random() * icons.length)];
      
      const dx = (Math.random() - 0.5) * 70;
      const rot = (Math.random() - 0.5) * 50;
      heart.style.setProperty('--dx', `${dx}px`);
      heart.style.setProperty('--rot', `${rot}deg`);
      
      heart.style.left = `${e.clientX + (Math.random() - 0.5) * 20}px`;
      heart.style.top = `${e.clientY + (Math.random() - 0.5) * 20}px`;

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 1600);
    }
  });
}

/* ------------------------------------------------------------------
 * 4. ABRAZO VIRTUAL / LLUVIA DE CONFETI Y CORAZONES
 * ------------------------------------------------------------------ */
function initVirtualHug() {
  const hugBtn = document.getElementById('hug-btn');
  if (!hugBtn) return;

  hugBtn.addEventListener('click', (e) => {
    e.preventDefault();
    triggerHeartShower();
    playHarpChord();

    // Mensaje temporal en el botón
    const originalContent = hugBtn.innerHTML;
    hugBtn.innerHTML = `<i class="fa-solid fa-heart text-rose-300 heart-beat"></i> ¡Abrazo enviado con amor!`;
    setTimeout(() => {
      hugBtn.innerHTML = originalContent;
    }, 3000);
  });
}

function triggerHeartShower() {
  const emojis = ['💖', '❤️', '✨', '🌹', '💕', '🌸', '💫'];
  const count = 45;

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'screen-confetti-heart';
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.left = `${Math.random() * 96}vw`;
      el.style.fontSize = `${Math.random() * 20 + 16}px`;
      el.style.animationDuration = `${Math.random() * 1.8 + 2.5}s`;
      document.body.appendChild(el);

      setTimeout(() => {
        el.remove();
      }, 4200);
    }, i * 60);
  }
}

/* ------------------------------------------------------------------
 * 5. RELOJ / CONTADOR DE LA RELACIÓN
 * ------------------------------------------------------------------ */
let timerInterval = null;
let isClockReopened = CONFIG.dates.isReopened;

function initRelationshipTimer() {
  const daysEl = document.getElementById('timer-days');
  const hoursEl = document.getElementById('timer-hours');
  const minutesEl = document.getElementById('timer-minutes');
  const secondsEl = document.getElementById('timer-seconds');
  const statusBadge = document.getElementById('timer-status-badge');
  const resumeBtn = document.getElementById('toggle-resume-btn');
  const resumeBtnText = document.getElementById('resume-btn-text');
  const timerDescription = document.getElementById('timer-description');

  if (!daysEl) return;

  const startDate = new Date(CONFIG.dates.startDate);
  const pauseDate = new Date(CONFIG.dates.pauseDate);

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedStart = startDate.toLocaleDateString('es-ES', options);
  const formattedPause = pauseDate.toLocaleDateString('es-ES', options);

  function updateDisplay() {
    const targetDate = isClockReopened ? new Date() : pauseDate;
    const diff = Math.max(0, targetDate - startDate);

    const secondsTotal = Math.floor(diff / 1000);
    const days = Math.floor(secondsTotal / (3600 * 24));
    const hours = Math.floor((secondsTotal % (3600 * 24)) / 3600);
    const minutes = Math.floor((secondsTotal % 3600) / 60);
    const seconds = Math.floor(secondsTotal % 60);

    daysEl.textContent = String(days).padStart(3, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');

    if (isClockReopened) {
      statusBadge.innerHTML = `<span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse mr-2"></span> Reloj en marcha`;
      statusBadge.className = "inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 shadow-lg";
      timerDescription.innerHTML = `Comenzamos el <strong class="text-rose-200">${formattedStart}</strong> y cada instante sigue sumando a nuestra historia.`;
      if (resumeBtnText) resumeBtnText.textContent = "Volver a pausar en la fecha fija";
    } else {
      statusBadge.innerHTML = `<span class="inline-block w-2.5 h-2.5 rounded-full bg-rose-400 animate-ping mr-2"></span> Tiempo en pausa`;
      statusBadge.className = "inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-rose-950/70 text-rose-300 border border-rose-500/40 shadow-lg";
      const quotePart = (CONFIG.dates && CONFIG.dates.clockQuote) ? `<br/><span class="italic text-rose-200/90 text-sm mt-2 block font-handwritten text-lg font-normal">"${CONFIG.dates.clockQuote}"</span>` : '';
      timerDescription.innerHTML = `Desde el <strong class="text-gold-warm">${formattedStart}</strong> hasta la fecha en que se detuvo el reloj (<strong class="text-rose-300">${formattedPause}</strong>). El cariño no se borró... espera una nueva oportunidad.${quotePart}`;
      if (resumeBtnText) resumeBtnText.textContent = "¿Y si dejamos que vuelva a correr?";
    }
  }

  updateDisplay();
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(updateDisplay, 1000);

  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      isClockReopened = !isClockReopened;
      if (isClockReopened) {
        triggerHeartShower();
        playHarpChord();
      } else {
        playSoftChime(396);
      }
      updateDisplay();
      
      const clockContainer = document.getElementById('clock-container');
      if (clockContainer) {
        clockContainer.classList.add('scale-[1.02]');
        setTimeout(() => clockContainer.classList.remove('scale-[1.02]'), 400);
      }
    });
  }
}

/* ------------------------------------------------------------------
 * 6. VELA INTERACTIVA CON HALO DE LUZ
 * ------------------------------------------------------------------ */
function initCandle() {
  const candleWrapper = document.getElementById('interactive-candle');
  const candleFlame = document.getElementById('candle-flame');
  const candleAura = document.getElementById('candle-glow-aura');
  const candleStatus = document.getElementById('candle-status-text');

  if (!candleWrapper || !candleFlame) return;

  let isLit = true;

  candleWrapper.addEventListener('click', () => {
    isLit = !isLit;
    if (isLit) {
      candleFlame.classList.remove('off');
      if (candleAura) candleAura.classList.remove('off');
      candleStatus.textContent = "Haz clic en la vela para apagar la llama";
      playSoftChime(660);
    } else {
      candleFlame.classList.add('off');
      if (candleAura) candleAura.classList.add('off');
      candleStatus.textContent = "Llama en calma. Haz clic para volver a encenderla";
      playSoftChime(330);
    }
  });
}

/* ------------------------------------------------------------------
 * 7. CARTA CON SELLO DE CERA 3D Y PERGAMINO
 * ------------------------------------------------------------------ */
function initWaxSealLetter() {
  const waxSeal = document.getElementById('wax-seal-btn');
  const sealedCover = document.getElementById('sealed-cover');
  const letterBody = document.getElementById('unfolded-letter');

  if (!waxSeal || !letterBody) return;

  waxSeal.addEventListener('click', () => {
    playHarpChord();
    triggerSparkleBurst(waxSeal);
    
    waxSeal.style.transform = 'scale(0.7) rotate(25deg)';
    waxSeal.style.opacity = '0';
    
    setTimeout(() => {
      sealedCover.classList.add('hidden');
      letterBody.classList.remove('hidden');
      letterBody.classList.add('letter-unfold');
      
      letterBody.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 450);
  });
}

function triggerSparkleBurst(originEl) {
  const rect = originEl.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 16; i++) {
    const sp = document.createElement('span');
    sp.className = 'click-heart';
    sp.textContent = ['✨', '💫', '💖'][i % 3];
    sp.style.left = `${centerX}px`;
    sp.style.top = `${centerY}px`;
    const dx = (Math.random() - 0.5) * 160;
    const rot = (Math.random() - 0.5) * 80;
    sp.style.setProperty('--dx', `${dx}px`);
    sp.style.setProperty('--rot', `${rot}deg`);
    document.body.appendChild(sp);
    setTimeout(() => sp.remove(), 1600);
  }
}

/* ------------------------------------------------------------------
 * 8. GALERÍA DE MEMORIAS POLAROID CON INTERACTIVIDAD
 * ------------------------------------------------------------------ */
function initMemories() {
  const container = document.getElementById('polaroids-grid');
  if (!container || !CONFIG.memories) return;

  container.innerHTML = '';
  const rotations = [-3, 2, -2.5, 3, -1.8, 2.2];

  CONFIG.memories.forEach((mem, idx) => {
    const rot = rotations[idx % rotations.length];
    const card = document.createElement('div');
    card.className = 'polaroid-card cursor-pointer transform rounded-sm transition-all duration-300 group';
    card.style.transform = `rotate(${rot}deg)`;

    card.innerHTML = `
      <div class="tape-effect"></div>
      <div class="overflow-hidden rounded-sm bg-gray-950 aspect-[4/3] mb-3 relative">
        <img 
          src="${mem.image}" 
          alt="${mem.title}" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80'"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 justify-between">
          <span class="text-[11px] text-white/90 bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-sm">Ver recuerdo</span>
        </div>
      </div>
      <div class="px-1 text-center">
        ${mem.badge ? `<span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-rose-100 text-rose-900 border border-rose-300/60 mb-1.5 shadow-xs">${mem.badge}</span>` : ''}
        <span class="text-[11px] uppercase tracking-wider text-rose-800/80 font-bold block mb-1">${mem.date}</span>
        <h4 class="font-serif-title text-xl text-gray-900 font-bold mb-1 leading-snug">${mem.title}</h4>
        <p class="font-handwritten text-lg text-gray-700 leading-snug line-clamp-2">${mem.description}</p>
        
        <!-- Botón de corazón para marcar favorito -->
        <div class="mt-3 pt-2 border-t border-gray-200/60 flex items-center justify-center">
          <button class="js-fav-btn text-gray-400 hover:text-rose-500 transition-colors p-1 flex items-center gap-1.5 text-xs font-sans" title="Guardar en el corazón">
            <i class="fa-regular fa-heart text-sm"></i>
            <span class="js-fav-text text-[11px]">Guardar</span>
          </button>
        </div>
      </div>
    `;

    // Click en la tarjeta abre el lightbox
    card.addEventListener('click', (e) => {
      if (e.target.closest('.js-fav-btn')) return;
      openLightbox(mem);
    });

    // Toggle favorito
    const favBtn = card.querySelector('.js-fav-btn');
    const favIcon = favBtn.querySelector('i');
    const favText = favBtn.querySelector('.js-fav-text');
    let isFaved = false;

    favBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isFaved = !isFaved;
      if (isFaved) {
        favIcon.className = 'fa-solid fa-heart text-rose-600 heart-beat';
        favText.textContent = 'En mi corazón';
        favText.className = 'js-fav-text text-[11px] font-semibold text-rose-600';
        playSoftChime(659.25);
      } else {
        favIcon.className = 'fa-regular fa-heart text-gray-400';
        favText.textContent = 'Guardar';
        favText.className = 'js-fav-text text-[11px] text-gray-400';
      }
    });

    container.appendChild(card);
  });
}

/* ------------------------------------------------------------------
 * 9. MODAL LIGHTBOX
 * ------------------------------------------------------------------ */
function openLightbox(memory) {
  const modal = document.getElementById('image-lightbox');
  const img = document.getElementById('lightbox-img');
  const title = document.getElementById('lightbox-title');
  const date = document.getElementById('lightbox-date');
  const desc = document.getElementById('lightbox-desc');

  if (!modal || !img) return;

  img.src = memory.image;
  title.textContent = memory.title;
  date.textContent = memory.date;
  desc.textContent = memory.description;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  playSoftChime(580);
}

const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
if (lightboxCloseBtn) {
  lightboxCloseBtn.addEventListener('click', closeLightbox);
}
const lightboxModal = document.getElementById('image-lightbox');
if (lightboxModal) {
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });
}

function closeLightbox() {
  const modal = document.getElementById('image-lightbox');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

/* ------------------------------------------------------------------
 * 10. RAZONES POR LAS QUE VALES LA PENA
 * ------------------------------------------------------------------ */
function initReasons() {
  const container = document.getElementById('reasons-container');
  if (!container || !CONFIG.reasons) return;

  container.innerHTML = '';

  CONFIG.reasons.forEach((reason, idx) => {
    const card = document.createElement('div');
    card.className = 'glass-card glass-card-hover p-6 rounded-2xl flex items-start gap-4 border border-rose-300/20';

    card.innerHTML = `
      <div class="flex-shrink-0 w-11 h-11 rounded-full bg-gradient-to-br from-rose-900/60 to-wine-800/80 border border-gold-warm/40 flex items-center justify-center text-gold-warm font-serif-title font-bold text-lg shadow-md">
        ${String(idx + 1).padStart(2, '0')}
      </div>
      <div>
        <p class="text-gray-200 text-base md:text-lg leading-relaxed font-light">
          ${reason}
        </p>
      </div>
    `;

    container.appendChild(card);
  });
}

/* ------------------------------------------------------------------
 * 11. REPRODUCTOR DE MÚSICA
 * ------------------------------------------------------------------ */
function initMusicPlayer() {
  const audio = document.getElementById('bg-audio');
  const playPauseBtn = document.getElementById('music-toggle-btn');
  const playIcon = document.getElementById('music-play-icon');
  const pauseIcon = document.getElementById('music-pause-icon');
  const musicTitle = document.getElementById('music-track-title');
  const musicArtist = document.getElementById('music-track-artist');
  const discVisual = document.getElementById('music-disc');

  if (!audio || !playPauseBtn) return;

  if (CONFIG.music && CONFIG.music.url) {
    audio.src = CONFIG.music.url;
    if (musicTitle) musicTitle.textContent = CONFIG.music.title || "Nuestra Canción";
    if (musicArtist) musicArtist.textContent = CONFIG.music.artist || "Melodía";
  }

  let isPlaying = false;

  function togglePlay() {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      playIcon.classList.remove('hidden');
      pauseIcon.classList.add('hidden');
      if (discVisual) discVisual.classList.remove('animate-spin-slow');
    } else {
      audio.play().then(() => {
        isPlaying = true;
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
        if (discVisual) discVisual.classList.add('animate-spin-slow');
      }).catch(err => {
        console.warn("Autoplay bloqueado:", err);
      });
    }
  }

  playPauseBtn.addEventListener('click', togglePlay);

  const startAudioOnFirstClick = () => {
    if (!isPlaying && audio.paused) {
      audio.play().then(() => {
        isPlaying = true;
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
        if (discVisual) discVisual.classList.add('animate-spin-slow');
      }).catch(() => {});
    }
    document.removeEventListener('click', startAudioOnFirstClick);
  };
  document.addEventListener('click', startAudioOnFirstClick, { once: true });
}

/* ------------------------------------------------------------------
 * 12. EFECTOS DE SONIDO SINTETIZADOS
 * ------------------------------------------------------------------ */
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSoftChime(frequency = 528) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.14, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1.3);
  } catch (e) {}
}

function playHarpChord() {
  const notes = [440, 554.37, 659.25, 880, 1108.73];
  notes.forEach((freq, i) => {
    setTimeout(() => {
      playSoftChime(freq);
    }, i * 90);
  });
}
