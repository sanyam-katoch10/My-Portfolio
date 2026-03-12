
let mouseX = 0;
let mouseY = 0;

const matrixCanvas = document.createElement('canvas');
matrixCanvas.id = 'matrix-canvas';
matrixCanvas.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -8;
  pointer-events: none;
  opacity: 0.15;
`;
document.body.prepend(matrixCanvas);

const mCtx = matrixCanvas.getContext('2d');


const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>{}[]()/*-+=%$#@!&';
const charArray = chars.split('');

let columns;
let drops = [];

function initMatrix() {
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;

  const fontSize = 14;
  columns = Math.floor(matrixCanvas.width / fontSize);

  drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
  }
}

function drawMatrix() {
  const isLight = document.body.classList.contains('light-mode');


  if (isLight) {
    mCtx.fillStyle = 'rgba(240, 242, 245, 0.1)';
  } else {
    mCtx.fillStyle = 'rgba(10, 12, 16, 0.05)';
  }

  mCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);


  if (isLight) {
    mCtx.fillStyle = '#006b3c';
  } else {
    mCtx.fillStyle = '#00ff7a';
  }

  mCtx.font = '14px monospace';

  for (let i = 0; i < drops.length; i++) {
    const char = charArray[Math.floor(Math.random() * charArray.length)];
    const x = i * 14;
    const y = drops[i] * 14;


    if (Math.random() > 0.98) {
      mCtx.fillStyle = isLight ? '#003d22' : '#ffffff';
    } else {

      if (isLight) {
        mCtx.fillStyle = `rgba(0, 107, 60, ${0.8 + Math.random() * 0.2})`;
      } else {
        mCtx.fillStyle = `rgba(0, 255, 122, ${0.3 + Math.random() * 0.7})`;
      }
    }

    mCtx.fillText(char, x, y);

    if (y > matrixCanvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

initMatrix();
window.addEventListener('resize', initMatrix);

const matrixInterval = (window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) ? 80 : 50;
setInterval(drawMatrix, matrixInterval);



const neuralCanvas = document.createElement('canvas');
neuralCanvas.id = 'neural-canvas';
neuralCanvas.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -7;
  pointer-events: none;
`;
document.body.prepend(neuralCanvas);

const nCtx = neuralCanvas.getContext('2d');

class NeuralParticle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.2;
    this.pulseSpeed = Math.random() * 0.02 + 0.01;
    this.pulsePhase = Math.random() * Math.PI * 2;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.pulsePhase += this.pulseSpeed;


    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const forceRadius = 250;

    if (distance < forceRadius) {
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const force = (forceRadius - distance) / forceRadius;
      const strength = 6;


      this.x += forceDirectionX * force * strength;
      this.y += forceDirectionY * force * strength;
    }

    if (this.x < 0) this.x = window.innerWidth;
    if (this.x > window.innerWidth) this.x = 0;
    if (this.y < 0) this.y = window.innerHeight;
    if (this.y > window.innerHeight) this.y = 0;
  }

  draw() {
    const isLight = document.body.classList.contains('light-mode');
    const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;

    nCtx.beginPath();
    nCtx.arc(this.x, this.y, this.size * pulse, 0, Math.PI * 2);

    if (isLight) {
      nCtx.fillStyle = `rgba(16, 163, 127, ${this.opacity * pulse * 1.5})`;
    } else {
      nCtx.fillStyle = `rgba(0, 255, 122, ${this.opacity * pulse})`;
    }

    nCtx.fill();


    nCtx.beginPath();
    nCtx.arc(this.x, this.y, this.size * 2 * pulse, 0, Math.PI * 2);

    if (isLight) {
      nCtx.fillStyle = `rgba(16, 163, 127, ${this.opacity * 0.3 * pulse})`;
    } else {
      nCtx.fillStyle = `rgba(0, 255, 122, ${this.opacity * 0.2 * pulse})`;
    }

    nCtx.fill();
  }
}

const neuralParticles = [];
const particleCount = window.innerWidth < 768 ? 60 : 110;
const connectionDistance = 150;

for (let i = 0; i < particleCount; i++) {
  neuralParticles.push(new NeuralParticle());
}

function resizeNeural() {
  neuralCanvas.width = window.innerWidth;
  neuralCanvas.height = window.innerHeight;
}

function drawConnections() {
  const isLight = document.body.classList.contains('light-mode');

  for (let i = 0; i < neuralParticles.length; i++) {
    for (let j = i + 1; j < neuralParticles.length; j++) {
      const dx = neuralParticles[i].x - neuralParticles[j].x;
      const dy = neuralParticles[i].y - neuralParticles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < connectionDistance) {
        const opacity = (1 - distance / connectionDistance) * 0.3;
        nCtx.beginPath();
        nCtx.moveTo(neuralParticles[i].x, neuralParticles[i].y);
        nCtx.lineTo(neuralParticles[j].x, neuralParticles[j].y);

        if (isLight) {
          nCtx.strokeStyle = `rgba(16, 163, 127, ${opacity * 1.8})`;
        } else {
          nCtx.strokeStyle = `rgba(0, 255, 122, ${opacity})`;
        }

        nCtx.lineWidth = 0.5;
        nCtx.stroke();
      }
    }
  }
}

resizeNeural();
window.addEventListener('resize', resizeNeural);

const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
let frameCount = 0;

function animateNeural() {
  frameCount++;

  if (isMobile && frameCount % 2 !== 0) {
    requestAnimationFrame(animateNeural);
    return;
  }

  nCtx.clearRect(0, 0, neuralCanvas.width, neuralCanvas.height);

  drawConnections();

  neuralParticles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animateNeural);
}

animateNeural();



const scanOverlay = document.createElement('div');
scanOverlay.id = 'scan-lines';
scanOverlay.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 122, 0.01) 2px,
    rgba(0, 255, 122, 0.01) 4px
  );
  animation: scanMove 8s linear infinite;
`;
document.body.prepend(scanOverlay);


const scanStyle = document.createElement('style');
scanStyle.textContent = `
  @keyframes scanMove {
    0% { background-position: 0 0; }
    100% { background-position: 0 100px; }
  }
  
  @keyframes glitchText {
    0%, 100% { 
      text-shadow: 
        0.05em 0 0 rgba(255, 0, 0, 0.75),
        -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
        0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
    }
    14%, 64% { 
      text-shadow: 
        -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
        0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
        -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
    }
    15%, 65% { 
      text-shadow: 
        0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
        0.05em 0 0 rgba(0, 255, 0, 0.75),
        0 -0.05em 0 rgba(0, 0, 255, 0.75);
    }
  }
  
  .glitch-hover:hover {
    animation: glitchText 0.3s infinite;
  }
  
  @keyframes flicker {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
    75% { opacity: 0.9; }
    90% { opacity: 0.85; }
  }
  
  .flicker {
    animation: flicker 0.15s infinite;
  }
  

  .holo-card {
    position: relative;
    overflow: hidden;
  }
  
  .holo-card::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(0, 255, 122, 0.1) 50%,
      transparent 70%
    );
    transform: rotate(45deg);
    animation: holoShine 3s ease-in-out infinite;
    pointer-events: none;
  }
  
  @keyframes holoShine {
    0% { transform: translateX(-100%) rotate(45deg); }
    100% { transform: translateX(100%) rotate(45deg); }
  }
  

  .terminal-cursor {
    display: inline-block;
    width: 10px;
    height: 20px;
    background: #00ff7a;
    animation: cursorBlink 1s step-end infinite;
    margin-left: 4px;
    vertical-align: middle;
  }
  
  @keyframes cursorBlink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  

  .data-border {
    position: relative;
  }
  
  .data-border::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid transparent;
    border-image: linear-gradient(
      90deg,
      transparent,
      #00ff7a,
      transparent
    ) 1;
    animation: borderFlow 2s linear infinite;
    pointer-events: none;
  }
  
  @keyframes borderFlow {
    0% { border-image-source: linear-gradient(90deg, transparent 0%, #00ff7a 0%, transparent 0%); }
    50% { border-image-source: linear-gradient(90deg, transparent 50%, #00ff7a 50%, transparent 50%); }
    100% { border-image-source: linear-gradient(90deg, transparent 100%, #00ff7a 100%, transparent 100%); }
  }
`;
document.head.appendChild(scanStyle);


const glowTitle = document.querySelector('.name-gradient');
if (glowTitle) {
  glowTitle.classList.add('glitch-hover');
}


document.querySelectorAll('.project-card').forEach(card => {
  card.classList.add('holo-card');
});

console.log(' Hacker mode activated');


const decodeText = document.querySelector('.decode-text');
const originalText = decodeText ? decodeText.getAttribute('data-value') : '';
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

let interval = null;

if (decodeText) {
  decodeText.onmouseover = event => {
    let iteration = 0;

    clearInterval(interval);

    interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return originalText[index];
          }
          return letters[Math.floor(Math.random() * letters.length)];
        })
        .join("");

      if (iteration >= originalText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);
  }
}


const cursorCanvas = document.getElementById('cursorCanvas');
const cCtx = cursorCanvas.getContext('2d');
let cursorPars = [];

function resizeCursorCanvas() {
  cursorCanvas.width = window.innerWidth;
  cursorCanvas.height = window.innerHeight;
}

if (cursorCanvas) {
  resizeCursorCanvas();
  window.addEventListener('resize', resizeCursorCanvas);

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;


    cursorPars.push({
      x: mouseX,
      y: mouseY,
      life: 1,
      size: 4
    });
  });

  function animateCursor() {
    cCtx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);

    for (let i = 0; i < cursorPars.length; i++) {
      const p = cursorPars[i];

      cCtx.beginPath();
      cCtx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      cCtx.fillStyle = `rgba(0, 255, 122, ${p.life * 0.8})`;
      cCtx.fill();


      p.life -= 0.05;


      if (p.life <= 0) {
        cursorPars.splice(i, 1);
        i--;
      }
    }


    if (cursorPars.length > 1) {
      cCtx.beginPath();
      cCtx.moveTo(cursorPars[0].x, cursorPars[0].y);
      for (let i = 1; i < cursorPars.length; i++) {
        cCtx.lineTo(cursorPars[i].x, cursorPars[i].y);
      }
      cCtx.strokeStyle = 'rgba(0, 255, 122, 0.2)';
      cCtx.lineWidth = 2;
      cCtx.stroke();
    }

    requestAnimationFrame(animateCursor);
  }

  animateCursor();
}

console.log(' Ghost Cursor Activated');

