/* Point vert sous le doigt : rend les appuis du participant visibles pendant un
   partage d'écran, où le curseur et les taps ne sont pas transmis. Écoute en
   capture et en passif, sans jamais appeler preventDefault : aucun geste du
   prototype (swipe photo, défilement des onglets, carrousels) n'est modifié. */
(() => {
  const style = document.createElement('style');
  style.textContent = `
    .clickdot {
      position: fixed;
      z-index: 2147483647;
      width: 14px;
      height: 14px;
      margin: -7px 0 0 -7px;
      border-radius: 50%;
      background: #00b96b;
      /* Cerné de blanc : le point doit rester lisible sur une photo sombre. */
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.9), 0 0 6px rgba(0, 0, 0, 0.35);
      pointer-events: none;
      animation: clickdot 600ms ease-out forwards;
    }
    @keyframes clickdot {
      0%   { opacity: 1; transform: scale(0.6); }
      35%  { opacity: 1; transform: scale(1); }
      100% { opacity: 0; transform: scale(1.8); }
    }
  `;
  document.head.appendChild(style);

  window.addEventListener('pointerdown', (event) => {
    const dot = document.createElement('span');
    dot.className = 'clickdot';
    dot.setAttribute('aria-hidden', 'true');
    dot.style.left = `${event.clientX}px`;
    dot.style.top = `${event.clientY}px`;
    dot.addEventListener('animationend', () => dot.remove());
    document.body.appendChild(dot);
  }, { capture: true, passive: true });
})();
