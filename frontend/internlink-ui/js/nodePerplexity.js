// === Glow Network: Enhanced Animated Particle Canvas ===

const canvas = document.createElement('canvas');
canvas.id = 'glowCanvas';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

let width, height;
let mouse = { x: null, y: null };

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Dot/Particle settings
const DOT_COUNT = 110;
const dots = [];

function createDot() {
  const hue = Math.random() * 360;
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    baseRadius: Math.random() * 2.5 + 1,
    pulsePhase: Math.random() * Math.PI * 2,
    hue: hue,
    hueSpeed: (Math.random() - 0.5) * 0.12 + 0.74,
    alpha: 0.7 + Math.random() * 0.22,
    exploded: false,
    explodeVX: 0,
    explodeVY: 0,
    explodeT: 0,
  };
}
function spawnAllDots() {
  dots.length = 0;
  for (let i = 0; i < DOT_COUNT; i++) dots.push(createDot());
}
spawnAllDots();

// Track mouse
window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener('mouseleave', () => {
  mouse.x = null; mouse.y = null;
});

// Click to "explode" nearby dots away
window.addEventListener('mousedown', () => {
  if (mouse.x === null) return;
  for (let dot of dots) {
    let dx = dot.x - mouse.x, dy = dot.y - mouse.y;
    let dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < 120) {
      dot.exploded = true;
      let angle = Math.atan2(dy, dx);
      let force = 2.8 + Math.random() * 1.4;
      dot.explodeVX = Math.cos(angle) * force;
      dot.explodeVY = Math.sin(angle) * force;
      dot.explodeT = 13 + Math.random() * 7;
    }
  }
});

// Main animation/rendering loop
function animateDots() {
  const now = (performance.now() / 1000);

  ctx.clearRect(0, 0, width, height);

  // Animate and draw each dot
  for (let dot of dots) {
    // Animate HSL color
    dot.hue = (dot.hue + dot.hueSpeed) % 360;
    const color = `hsl(${dot.hue}, 83%, 66%)`;

    // Pulse animation (breathing)
    let pulse = 0.9 + 0.20 * Math.sin(now * 2.2 + dot.pulsePhase);

    // Movement
    if (dot.exploded) {
      dot.x += dot.explodeVX;
      dot.y += dot.explodeVY;
      dot.explodeVX *= 0.94;
      dot.explodeVY *= 0.94;
      dot.explodeT -= 1;
      if (dot.explodeT <= 0) dot.exploded = false;
    } else {
      // Slight wandering/random motion
      if (Math.random() < 0.011) {
        dot.vx += (Math.random() - 0.5) * 0.1;
        dot.vy += (Math.random() - 0.5) * 0.1;
      }
      // Mouse gravity
      if (mouse.x !== null) {
        let dx = mouse.x - dot.x;
        let dy = mouse.y - dot.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120 && dist > 8) {
          // Dot is gently attracted to mouse
          dot.vx += dx * 0.0015;
          dot.vy += dy * 0.0015;
        }
      }
      dot.x += dot.vx;
      dot.y += dot.vy;
    }

    // Bounce off edges
    if (dot.x < 0) { dot.x = 0; dot.vx *= -1; }
    if (dot.x > width) { dot.x = width; dot.vx *= -1; }
    if (dot.y < 0) { dot.y = 0; dot.vy *= -1; }
    if (dot.y > height) { dot.y = height; dot.vy *= -1; }

    // Draw the glowing dot
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.baseRadius * pulse, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 18 * pulse;
    ctx.globalAlpha = dot.alpha;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }

  // Draw lines between nearby dots
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      let dx = dots[i].x - dots[j].x;
      let dy = dots[i].y - dots[j].y;
      let dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[j].x, dots[j].y);
        let hueBlend = (dots[i].hue + dots[j].hue) / 2;
        ctx.strokeStyle = `hsla(${hueBlend},82%,68%,${0.13 * (1 - dist / 100)})`;
        ctx.lineWidth = 0.49;
        ctx.stroke();
      }
    }
  }

  // Lines to mouse if active
  if (mouse.x !== null) {
    for (let dot of dots) {
      let dx = dot.x - mouse.x;
      let dy = dot.y - mouse.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        ctx.beginPath();
        ctx.moveTo(dot.x, dot.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `hsla(${dot.hue},83%,66%,${0.19 * (1 - dist / 130)})`;
        ctx.lineWidth = 0.38;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animateDots);
}

animateDots();
