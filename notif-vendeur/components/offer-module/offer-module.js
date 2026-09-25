/* ============================================================
   Composant : Offer Module — logique JS
   ============================================================ */

function initOfferModule(moduleEl) {
  const chevron = moduleEl.querySelector('.offer-chevron');
  const card    = moduleEl.querySelector('.offer-price-card');
  if (!chevron || !card) return;

  chevron.addEventListener('click', () => {
    const isOpen = !card.hasAttribute('hidden-state');
    if (isOpen) {
      card.setAttribute('hidden-state', '');
      chevron.setAttribute('aria-expanded', 'false');
    } else {
      card.removeAttribute('hidden-state');
      chevron.setAttribute('aria-expanded', 'true');
    }
  });
}

document.querySelectorAll('.offer-module').forEach(initOfferModule);
