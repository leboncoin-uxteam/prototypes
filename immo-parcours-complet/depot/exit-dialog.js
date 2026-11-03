/* Sortie du parcours de dépôt — Spark Dialog 🖥️🤖 (Figma 15761:9872).
   S'accroche à tous les boutons « Quitter » de la page.

   Deux comportements, selon d'où l'on vient :

   • Dépôt neuf — le bouton ouvre la dialog, qui propose de voir ses annonces
     ou de recommencer depuis la première étape. Rien n'est encore publié, il
     y a donc quelque chose à perdre : on demande confirmation.

   • Mode édition — on modifie une annonce déjà déposée, signalé par « ad=<id> »
     dans l'URL. Le bouton devient « Enregistrer et quitter » et ramène
     directement à « Mes annonces », sur l'annonce retouchée. Pas de dialog :
     il n'y a rien à perdre, seulement à enregistrer.

     La page peut exposer `window.saveEdits()` pour enregistrer ses champs
     avant le départ. Sans cette fonction, le bouton se contente de quitter —
     ce qui suffit aux étapes qui écrivent déjà au fil de la saisie.

   Inclure en fin de <body> :  <script src="exit-dialog.js"></script>
   Les étapes du parcours partagent ce fichier : une seule source. */
(() => {
  /* ══ Destinations ════════════════════════════════════════════════
     PREMIERE_ETAPE : où « Recommencer » renvoie.
     MES_ANNONCES   : page « Voir mes annonces ». */
  const PREMIERE_ETAPE = 'ad-insertion-titre.html'
  const MES_ANNONCES   = 'mes-annonces/index.html'

  /* ══ Mode édition ════════════════════════════════════════════════
     « ad=<id> » dans l'URL : on retouche cette annonce. On revient sur
     elle, détail ouvert, pour que la modification se voie. */
  const AD_ID = new URLSearchParams(location.search).get('ad')
  const EN_EDITION = Boolean(AD_ID)
  const RETOUR_EDITION = EN_EDITION
    ? `${MES_ANNONCES}?ad=${encodeURIComponent(AD_ID)}`
    : MES_ANNONCES

  /* ══ Styles ══════════════════════════════════════════════════════
     Les valeurs reprennent les tokens Spark du Figma. On réutilise les
     variables déjà déclarées par les protos quand elles existent, avec la
     valeur du design en repli pour que le fichier marche seul. */
  const style = document.createElement('style')
  style.textContent = `
    .exit-dialog-overlay {
      position: fixed; inset: 0; z-index: 2147483000;
      display: flex; align-items: center; justify-content: center;
      /* base/overlay */
      background: rgba(32, 39, 48, 0.72);
      opacity: 0;
      transition: opacity .15s ease;
    }
    .exit-dialog-overlay[hidden] { display: none; }
    .exit-dialog-overlay.is-open { opacity: 1; }

    .exit-dialog {
      width: 480px; max-width: calc(100vw - 32px); min-width: 280px;
      background: var(--color-surface, #fff);
      border-radius: 16px;
      box-shadow: 0 6px 12px 0 var(--color-shadow, rgba(108, 129, 157, 0.5));
      overflow: clip;
      transform: translateY(8px) scale(.98);
      transition: transform .15s ease;
    }
    .exit-dialog-overlay.is-open .exit-dialog { transform: none; }

    /* ── Header : titre + croix, 76px de haut ────────────────────── */
    .exit-dialog-header {
      display: flex; align-items: center; gap: 8px;
      height: 76px; padding: 16px 24px;
    }
    .exit-dialog-title {
      flex: 1 0 0; min-width: 0; margin: 0;
      font-family: 'Nunito Sans', system-ui, sans-serif;
      font-size: 20px; font-weight: 700; line-height: 28px;
      color: var(--color-on-surface, #152233);
      overflow: hidden; text-overflow: ellipsis;
    }
    .exit-dialog-close {
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      width: 44px; height: 44px; padding: 8px;
      border: 0; border-radius: 99999px;
      background: none; cursor: pointer;
      transition: background-color .15s ease;
    }
    .exit-dialog-close:hover { background: var(--color-neutral-container, #f0f2f5); }
    .exit-dialog-close img { display: block; }

    /* ── Footer : les deux actions, à parts égales ───────────────── */
    .exit-dialog-footer {
      display: flex; align-items: center;
      padding: 16px 24px;
      background: var(--color-surface, #fff);
    }
    .exit-dialog-cta {
      display: flex; flex: 1 0 0; min-width: 0;
      gap: 16px; justify-content: flex-end;
    }
    .exit-dialog-btn {
      display: flex; flex: 1 0 0; min-width: 0;
      align-items: center; justify-content: center; gap: 8px;
      height: 44px; padding: 0 16px;
      border-radius: 99999px;
      font-family: 'Nunito Sans', system-ui, sans-serif;
      font-size: 16px; font-weight: 700; line-height: 24px;
      white-space: nowrap; cursor: pointer;
      transition: background-color .15s ease;
    }
    .exit-dialog-btn img { display: block; flex-shrink: 0; }
    .exit-dialog-btn:focus-visible {
      outline: 2px solid var(--color-focus, #00f); outline-offset: 2px;
    }

    /* Outlined support — « Voir mes annonces » */
    .exit-dialog-btn-outlined {
      border: 1px solid var(--color-support, #094171);
      background: var(--color-surface, #fff);
      color: var(--color-support, #094171);
    }
    .exit-dialog-btn-outlined:hover {
      background: var(--color-support-container-hovered, #f4f9fe);
    }

    /* Filled support — « Recommencer » */
    .exit-dialog-btn-filled {
      border: 1px solid var(--color-support, #094171);
      background: var(--color-support, #094171);
      color: var(--color-on-support, #fff);
    }
    .exit-dialog-btn-filled:hover {
      background: var(--color-support-hovered, #0c5291);
      border-color: var(--color-support-hovered, #0c5291);
    }

    @media (max-width: 480px) {
      .exit-dialog-cta { flex-direction: column-reverse; }
    }
  `
  document.head.appendChild(style)

  /* ══ Markup ══════════════════════════════════════════════════════ */
  const overlay = document.createElement('div')
  overlay.className = 'exit-dialog-overlay'
  overlay.hidden = true
  overlay.dataset.nodeId = '15761:9872'
  overlay.innerHTML = `
    <div class="exit-dialog" role="dialog" aria-modal="true"
         aria-labelledby="exit-dialog-title">
      <div class="exit-dialog-header">
        <h2 class="exit-dialog-title" id="exit-dialog-title">Que souhaitez-vous faire maintenant ?</h2>
        <button type="button" class="exit-dialog-close" aria-label="Fermer">
          <img src="assets/dialog-cross.svg" width="16" height="16" alt="" />
        </button>
      </div>
      <div class="exit-dialog-footer">
        <div class="exit-dialog-cta">
          <button type="button" class="exit-dialog-btn exit-dialog-btn-outlined" data-action="annonces">
            Voir mes annonces
          </button>
          <button type="button" class="exit-dialog-btn exit-dialog-btn-filled" data-action="recommencer">
            <img src="assets/dialog-refresh.svg" width="16" height="16" alt="" />
            Recommencer
          </button>
        </div>
      </div>
    </div>`
  document.body.appendChild(overlay)

  const dialog   = overlay.querySelector('.exit-dialog')
  const closeBtn = overlay.querySelector('.exit-dialog-close')
  const btnAnnonces    = overlay.querySelector('[data-action="annonces"]')
  const btnRecommencer = overlay.querySelector('[data-action="recommencer"]')

  let lastFocused = null

  /* ══ Ouverture / fermeture ═══════════════════════════════════════ */
  function open() {
    lastFocused = document.activeElement
    overlay.hidden = false
    document.body.style.overflow = 'hidden'
    // Laisse un frame au navigateur pour que la transition s'applique.
    requestAnimationFrame(() => overlay.classList.add('is-open'))
    btnAnnonces.focus()
  }

  function close() {
    overlay.classList.remove('is-open')
    document.body.style.overflow = ''
    const done = () => { overlay.hidden = true }
    overlay.addEventListener('transitionend', done, { once: true })
    // Repli si la transition ne se déclenche pas (onglet en arrière-plan).
    setTimeout(done, 200)
    if (lastFocused && lastFocused.focus) lastFocused.focus()
  }

  closeBtn.addEventListener('click', close)

  // Clic sur le fond, pas sur la boîte.
  overlay.addEventListener('click', e => { if (e.target === overlay) close() })

  document.addEventListener('keydown', e => {
    if (overlay.hidden) return
    if (e.key === 'Escape') { close(); return }

    // Le focus reste dans la dialog tant qu'elle est ouverte.
    if (e.key === 'Tab') {
      const focusables = [closeBtn, btnAnnonces, btnRecommencer]
      const first = focusables[0]
      const last  = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus()
      }
    }
  })

  /* ══ Actions ═════════════════════════════════════════════════════ */
  btnAnnonces.addEventListener('click', () => {
    if (MES_ANNONCES) window.location.href = MES_ANNONCES
    else close()
  })

  // Reprise à zéro : on repart sur la première étape avec un paramètre unique,
  // pour que le navigateur serve une page neuve au lieu de restaurer les
  // champs déjà saisis.
  btnRecommencer.addEventListener('click', () => {
    /* Recommencer veut dire repartir de zéro : le brouillon entamé est
       effacé, pour que la première étape s'ouvre sur un titre vide et que
       « Mes annonces » ne garde pas la carte du dépôt abandonné. */
    if (window.Draft) Draft.clear()
    window.location.href = `${PREMIERE_ETAPE}?restart=${Date.now()}`
  })

  /* ══ Branchement sur les boutons « Quitter » ═════════════════════ */
  function enregistrerEtQuitter() {
    /* La page enregistre ses propres champs si elle sait le faire. Une
       erreur de sa part ne doit pas bloquer la sortie. */
    try {
      if (typeof window.saveEdits === 'function') window.saveEdits()
    } catch (err) {
      console.error('saveEdits a échoué, on quitte quand même', err)
    }
    window.location.href = RETOUR_EDITION
  }

  function brancher() {
    document.querySelectorAll('button, a').forEach(el => {
      if (el.closest('.exit-dialog-overlay')) return
      if (el.textContent.trim().toLowerCase() !== 'quitter') return

      if (EN_EDITION) {
        el.textContent = 'Enregistrer et quitter'
        el.addEventListener('click', e => { e.preventDefault(); enregistrerEtQuitter() })
      } else {
        el.addEventListener('click', e => { e.preventDefault(); open() })
      }
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', brancher)
  } else {
    brancher()
  }

  /* Au retour depuis « Recommencer », on nettoie le paramètre de l'URL pour
     ne pas le laisser traîner dans la barre d'adresse. */
  if (new URLSearchParams(location.search).has('restart')) {
    history.replaceState(null, '', location.pathname)
  }
})()
