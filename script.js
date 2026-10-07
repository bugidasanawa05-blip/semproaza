// Data Kata-kata Lucu Ngakak
const funnyQuotes = [
  "\"Selamat ya udah Sempro! Ingat, Sempro itu baru permulaan. Bab selanjutnya adalah ajang adu nasib balasan WA dosen.\"",
  "\"Akhirnya Sempro Juga Yah Azza, Kirain Mau Jadi Mahasiswa Abadi Di Untad.'\"",
  "\"Selamat Azza! Sempronya Sudah Selesai,Tapi Deymmm nya Teada Habisnya\"",
  "\"Sempro Selesai! Waktunya Healing Azza '\"",
  "\"Untuk Nur Azza Nadia Kurangi yah deymmm-deymmnnya Apa sdh Banyak Korbannya Jangan sampe Bertambah Lagi.\"",
];

// Teks Typing Effect
const textToType = " Halo Azza, Selamat atas Seminar Proposalnya\n\n Katanya Sempro itu horor, Tapi Lebih Horor lagi Deymmm nya Azza";

let quoteIndex = 0;

// Element References
const stepMystery = document.getElementById('step-mystery');
const stepTyping = document.getElementById('step-typing');
const stepMain = document.getElementById('step-main');
const typewriterText = document.getElementById('typewriterText');
const btnNextMain = document.getElementById('btnNextMain');
const funnyQuoteElem = document.getElementById('funnyQuote');

// === KONTROL MUSIK ===
const bgMusic = document.getElementById('bgMusic');
let isMusicPlaying = false;

function playBackgroundMusic() {
  if (!bgMusic) return;
  bgMusic.volume = 0.4;
  bgMusic.currentTime = 23;
  bgMusic.play()
    .then(() => {
      isMusicPlaying = true;
      console.log("Musik diputar 🎵");
      // Munculkan tombol kontrol kalau ada
      const control = document.getElementById('musicControl');
      if (control) control.style.display = 'flex';
    })
    .catch(error => {
      console.log("Musik belum bisa diputar:", error);
    });
}

// 1. Fungsi Jalur Utama Tampilan
function startJourney() {
  playBackgroundMusic(); // 🔊 Musik mulai saat kotak dibuka
  stepMystery.classList.add('hidden');
  stepTyping.classList.remove('hidden');
  startTypingEffect();
}

function goToMainContent() {
  stepTyping.classList.add('hidden');
  stepMain.classList.remove('hidden');
  startFloatingElements();
  triggerFireworksBurst();
}

// 2. Typing Effect Function
function startTypingEffect() {
  let index = 0;
  typewriterText.innerHTML = "";
  
  const timer = setInterval(() => {
    if (index < textToType.length) {
      const char = textToType.charAt(index);
      if (char === '\n') {
        typewriterText.innerHTML += '<br>';
      } else {
        typewriterText.innerHTML += char;
      }
      index++;
    } else {
      clearInterval(timer);
      btnNextMain.classList.remove('hidden');
    }
  }, 45);
}

// 3. Berganti Kata-kata Lucu
function changeQuote() {
  quoteIndex = (quoteIndex + 1) % funnyQuotes.length;
  funnyQuoteElem.style.opacity = 0;
  setTimeout(() => {
    funnyQuoteElem.innerText = funnyQuotes[quoteIndex];
    funnyQuoteElem.style.opacity = 1;
  }, 200);
}

// 4. Floating Emoticons / Balon Animation
function startFloatingElements() {
  const container = document.getElementById('floatingElements');
  const items = ['🎓', '✨', '🎉', '📜', '☕', '🔥', '🥳'];
  
  setInterval(() => {
    const el = document.createElement('div');
    el.classList.add('floating-item');
    el.innerText = items[Math.floor(Math.random() * items.length)];
    el.style.left = Math.random() * 90 + 5 + 'vw';
    el.style.animationDuration = (Math.random() * 3 + 4) + 's';
    
    container.appendChild(el);
    
    setTimeout(() => {
      el.remove();
    }, 7000);
  }, 800);
}

// 5. Canvas Fireworks Animation Engine
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = Math.random() * 3 + 1;
    this.velocity = {
      x: (Math.random() - 0.5) * (Math.random() * 8 + 2),
      y: (Math.random() - 0.5) * (Math.random() * 8 + 2)
    };
    this.alpha = 1;
    this.friction = 0.96;
    this.gravity = 0.15;
  }
  
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
  
  update() {
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.velocity.y += this.gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.015;
  }
}

let particles = [];

function animateFireworks() {
  requestAnimationFrame(animateFireworks);
  ctx.fillStyle = 'rgba(15, 23, 42, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle, index) => {
    if (particle.alpha > 0) {
      particle.update();
      particle.draw();
    } else {
      particles.splice(index, 1);
    }
  });
}

function createFirework(x, y) {
  const colors = ['#f43f5e', '#a855f7', '#6366f1', '#38bdf8', '#4ade80', '#facc15'];
  const particleCount = 60;
  
  for (let i = 0; i < particleCount; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    particles.push(new Particle(x, y, color));
  }
}

function triggerFireworksBurst() {
  let bursts = 0;
  const interval = setInterval(() => {
    const x = Math.random() * (canvas.width * 0.8) + canvas.width * 0.1;
    const y = Math.random() * (canvas.height * 0.5) + canvas.height * 0.1;
    createFirework(x, y);
    bursts++;
    if (bursts >= 8) clearInterval(interval);
  }, 300);
}

function launchFireworksManual() {
  triggerFireworksBurst();
}

// Start Canvas Loop
animateFireworks();