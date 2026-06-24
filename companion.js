// Floating companion: a neutral astronaut/orb-bot that drifts toward the cursor.
// Self-contained — injects its own styles + markup, then animates.
(function () {
  // avoid double-injection
  if (document.getElementById('companion')) return;

  const css = `
    .companion {
      position: fixed;
      left: 0;
      top: 0;
      width: 64px;
      height: 64px;
      z-index: 50;
      pointer-events: none;
      will-change: transform;
      transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .companion-bob {
      width: 100%;
      height: 100%;
      animation: compBob 3.2s ease-in-out infinite;
    }
    @keyframes compBob {
      0%, 100% { transform: translateY(0) rotate(-3deg); }
      50% { transform: translateY(-10px) rotate(3deg); }
    }
    .companion .body {
      fill: url(#compGrad);
      filter: drop-shadow(0 4px 10px rgba(124, 58, 237, 0.45));
    }
    .companion .wing {
      fill: rgba(149, 117, 205, 0.7);
      transform-origin: center;
      animation: compFlap 0.9s ease-in-out infinite;
    }
    .companion .wing.right { animation-delay: 0.12s; }
    @keyframes compFlap {
      0%, 100% { transform: scaleY(1); }
      50% { transform: scaleY(0.82); }
    }
    .companion .visor {
      fill: url(#visorGrad);
      stroke: rgba(224, 215, 255, 0.7);
      stroke-width: 1;
    }
    .companion .eye {
      fill: #d6f0ff;
      animation: compBlink 4s infinite;
      transform-origin: center;
    }
    @keyframes compBlink {
      0%, 92%, 100% { transform: scaleY(1); }
      96% { transform: scaleY(0.1); }
    }
    .companion .glint { fill: rgba(255, 255, 255, 0.85); }
    .companion .sparkle {
      fill: #fff;
      opacity: 0.9;
      animation: compSparkle 1.8s ease-in-out infinite;
    }
    @keyframes compSparkle {
      0%, 100% { opacity: 0.3; transform: scale(0.7); }
      50% { opacity: 1; transform: scale(1.15); }
    }
    @media (prefers-reduced-motion: reduce) {
      .companion-bob, .companion .wing, .companion .eye, .companion .sparkle { animation: none; }
      .companion { transition: none; }
    }
    @media (max-width: 560px) {
      .companion { display: none; }
    }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const wrap = document.createElement('div');
  wrap.className = 'companion';
  wrap.id = 'companion';
  wrap.setAttribute('aria-hidden', 'true');
  wrap.innerHTML = `
    <div class="companion-bob">
      <svg viewBox="0 0 64 64" width="64" height="64">
        <defs>
          <radialGradient id="compGrad" cx="38%" cy="32%" r="72%">
            <stop offset="0%" stop-color="#e0d7ff" />
            <stop offset="55%" stop-color="#b39ddb" />
            <stop offset="100%" stop-color="#7c3aed" />
          </radialGradient>
          <radialGradient id="visorGrad" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stop-color="#bfeaff" />
            <stop offset="60%" stop-color="#5b8def" />
            <stop offset="100%" stop-color="#2a1f6e" />
          </radialGradient>
        </defs>
        <line x1="32" y1="12" x2="32" y2="6" stroke="#b39ddb" stroke-width="2" stroke-linecap="round" />
        <circle class="sparkle" cx="32" cy="5" r="2.6" />
        <ellipse class="wing left" cx="13" cy="36" rx="6" ry="11" />
        <ellipse class="wing right" cx="51" cy="36" rx="6" ry="11" />
        <circle class="body" cx="32" cy="34" r="17" />
        <ellipse class="visor" cx="32" cy="32" rx="11" ry="9" />
        <circle class="eye" cx="28" cy="31" r="2.1" />
        <circle class="eye" cx="36" cy="31" r="2.1" />
        <circle class="glint" cx="27" cy="27" r="2.4" />
      </svg>
    </div>
  `;

  function start() {
    document.body.appendChild(wrap);

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // place it statically in the corner and skip the follow loop
      wrap.style.transform = 'translate(' + (window.innerWidth - 120) + 'px, 140px)';
      return;
    }

    let x = window.innerWidth - 120;
    let y = 140;
    let tx = x;
    let ty = y;
    let idle = true;
    let idleAngle = 0;

    document.addEventListener('mousemove', function (e) {
      idle = false;
      tx = e.clientX + 36;
      ty = e.clientY - 36;
    });

    setInterval(function () { idle = true; }, 2600);

    function loop() {
      if (idle) {
        idleAngle += 0.012;
        tx = window.innerWidth - 120 + Math.cos(idleAngle) * 60;
        ty = 150 + Math.sin(idleAngle * 1.3) * 40;
      }
      x += (tx - x) * 0.045;
      y += (ty - y) * 0.045;
      const dir = (tx - x) < 0 ? -1 : 1;
      wrap.style.transform = 'translate(' + x + 'px, ' + y + 'px) scaleX(' + dir + ')';
      requestAnimationFrame(loop);
    }
    loop();
  }

  if (document.body) {
    start();
  } else {
    document.addEventListener('DOMContentLoaded', start);
  }
})();
