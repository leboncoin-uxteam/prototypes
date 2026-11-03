/* Progress tracker vertical — Spark 🖥️🤖🍎 (Figma fZc9ClrH3AVrYTfTSpmSW4,
   node 15918:18057). La colonne « Votre annonce pas à pas » qui longe les
   étapes du dépôt.

   Trois états, ceux du composant Spark :

     fait     pastille pleine clair (support-container) + coche
     en cours pastille pleine foncée (support) + numéro, libellé en gras
     à venir  pastille au contour seul à 40 % + numéro, libellé atténué

   Le tracker démarre à l'étape « Adresse » : l'étape du titre vient avant
   et n'y figure pas. C'est donc à l'adresse qu'il entre en scène, avec une
   animation d'apparition — d'où `data-animate`.

   Pose dans la page :

     <div class="step-progress"
          data-current="adresse"     l'étape en cours (clé ci-dessous)
          data-animate></div>        l'animation d'entrée, seulement à l'adresse

   Le script remplit ce conteneur au chargement. Sans `data-animate`, le
   tracker est simplement là — on ne rejoue pas l'entrée à chaque étape.

   Les étapes sont celles du parcours cible, pas seulement celles qui sont
   construites : le tracker a justement pour rôle de montrer ce qui reste.

   Une étape déjà franchie est cliquable et ramène à son écran, avec le
   style de survol du Figma (15919:18382) : le libellé prend un fond clair
   et se souligne. L'étape en cours n'est pas un lien — on y est — et
   celles à venir ne se sautent pas.

   L'animation d'entrée est celle retenue après essai : le bloc glisse
   depuis la gauche et les étapes se révèlent en cascade. Une variante
   « traçage » où chaque pastille éclosait l'une après l'autre a été
   écartée. */
(() => {
  /* `page` : l'écran de l'étape, quand il est construit. Une étape sans
     page ne sera jamais cliquable — Caractéristiques et Coordonnées
     n'existent pas encore dans le prototype.

     `editPrefill` : ce qu'il faut ajouter à l'adresse en mode édition,
     pour retrouver l'écran garni du contenu de l'annonce. */
  /* L'ordre suit celui du prototype : les photos viennent juste après
     l'adresse. La maquette Figma plaçait les caractéristiques avant, ce
     qui faisait passer pour « faite » une étape jamais franchie. */
  const STEPS = [
    { key: 'adresse',          label: 'Adresse',          page: 'ad-insertion-localisation.html' },
    { key: 'photos',           label: 'Photos',           page: 'ad-insertion-photos.html', editPrefill: 'photos=t3' },
    { key: 'caracteristiques', label: 'Caractéristiques' },
    { key: 'description',      label: 'Description',      page: 'ad-insertion-description.html' },
    { key: 'prix',             label: 'Prix',             page: 'ad-insertion-prix.html' },
    { key: 'coordonnees',      label: 'Coordonnées' },
  ]

  const container = document.querySelector('.step-progress')
  if (!container) return

  /* ══ Styles ══════════════════════════════════════════════════════
     Les tokens Spark des pages de dépôt sont réutilisés quand ils
     existent, avec la valeur du Figma en repli pour que le fichier
     fonctionne seul. */
  const style = document.createElement('style')
  style.textContent = `
    .step-progress { width: 215px; flex-shrink: 0; }

    .sp-tracker {
      display: flex; flex-direction: column; gap: 8px;
    }

    /* « Votre annonce pas à pas » — Action/Callout, intention Support.
       Aligné à gauche sur les pastilles : dans le Figma c'est un bouton,
       dont le retrait latéral passe ici pour un espace vide. */
    .sp-tracker-title {
      margin: 0; padding: 8px 0;
      font-family: 'Nunito Sans', system-ui, sans-serif;
      font-size: 16px; font-weight: 700; line-height: 24px;
      color: var(--color-support, #094171);
    }

    .sp-steps {
      display: flex; flex-direction: column; gap: 4px;
      margin: 0; padding: 0; list-style: none;
    }

    .sp-step {
      display: flex; align-items: flex-start; gap: 8px;
      min-height: 34px;
    }
    .sp-step:last-child { min-height: 24px; }

    /* Colonne de gauche : la pastille, puis le trait qui descend. */
    .sp-step-rail {
      display: flex; flex-direction: column; align-items: center; gap: 4px;
      align-self: stretch; flex-shrink: 0;
      width: 24px;
    }

    .sp-step-dot {
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      width: 24px; height: 24px;
      border-radius: 24px;
      font-family: 'Nunito Sans', system-ui, sans-serif;
      font-size: 14px; font-weight: 700; line-height: 20px;
      box-sizing: border-box;
    }
    .sp-step-dot img { display: block; }

    /* Le trait est une ligne de 1px : en CSS il suit la hauteur de
       l'étape, ce qu'un fichier SVG figé ferait mal. */
    .sp-step-line {
      flex: 1 0 0; min-height: 4px;
      border-left: 1px solid var(--color-outline, #acb8c7);
    }

    /* Le padding latéral de 4px est posé d'emblée et compensé par une
       marge négative : au survol, le fond peut ainsi entourer le texte
       sans que celui-ci bouge d'un pixel. */
    .sp-step-label {
      flex: 1 0 0; min-width: 0;
      margin-left: -4px;
      padding: 4px 4px 8px;
      border-radius: 8px;
      font-family: 'Nunito Sans', system-ui, sans-serif;
      font-size: 14px; line-height: 20px;
      text-decoration: none;
      transition: background-color 150ms cubic-bezier(.2, 0, 0, 1);
    }

    /* ══ Étape cliquable ═════════════════════════════════════════════
       Une étape déjà franchie ramène à son écran. Au survol, le libellé
       prend un fond clair et se souligne — Figma 15919:18382. */
    a.sp-step-label { cursor: pointer; }
    a.sp-step-label:hover,
    a.sp-step-label:focus-visible {
      background: var(--color-support-container, #e6f2fd);
      text-decoration: underline;
      text-underline-offset: from-font;
    }
    a.sp-step-label:focus-visible {
      outline: 2px solid var(--color-focus, #0000ff);
      outline-offset: 1px;
    }

    /* ── Fait ───────────────────────────────────────────────────── */
    .sp-step.is-done .sp-step-dot {
      background: var(--color-support-container, #e6f2fd);
    }
    .sp-step.is-done .sp-step-label {
      font-weight: 400;
      color: var(--color-on-surface, #152233);
    }

    /* ── En cours ───────────────────────────────────────────────── */
    .sp-step.is-current .sp-step-dot {
      background: var(--color-support, #094171);
      color: var(--color-on-support, #ffffff);
    }
    .sp-step.is-current .sp-step-label {
      font-weight: 700;
      color: var(--color-on-surface, #152233);
    }

    /* ── Franchie, mais située après l'étape où l'on se trouve ────
       On est revenu en arrière : cette étape reste atteignable. Même
       dessin qu'« à venir », sans l'atténuation — active, non
       sélectionnée. */
    .sp-step.is-available .sp-step-dot {
      border: 1px solid var(--color-support, #094171);
      color: var(--color-support, #094171);
    }
    .sp-step.is-available .sp-step-label {
      font-weight: 400;
      color: var(--color-on-surface, #152233);
    }

    /* ── À venir ────────────────────────────────────────────────── */
    .sp-step.is-todo .sp-step-dot {
      border: 1px solid var(--color-support, #094171);
      color: var(--color-support, #094171);
      opacity: .4;
    }
    .sp-step.is-todo .sp-step-line { opacity: .4; }
    .sp-step.is-todo .sp-step-label {
      font-weight: 400;
      color: var(--color-on-surface-dim, rgba(21, 34, 51, .72));
    }

    .sp-sr-only {
      position: absolute; width: 1px; height: 1px;
      margin: -1px; padding: 0; overflow: hidden;
      clip: rect(0 0 0 0); white-space: nowrap; border: 0;
    }

    /* ══ Entrée en scène, à l'étape « Adresse » ════════════════════
       Le bloc glisse depuis la gauche, puis les étapes se révèlent une
       par une et les traits se tirent vers le bas. */
    .sp-tracker.is-entering {
      animation: sp-in 420ms cubic-bezier(.2, 0, 0, 1) both;
    }
    @keyframes sp-in {
      from { opacity: 0; transform: translateX(-16px); }
      to   { opacity: 1; transform: none; }
    }

    .sp-tracker.is-entering .sp-step {
      animation: sp-step-in 320ms cubic-bezier(.2, 0, 0, 1) both;
      animation-delay: calc(180ms + var(--sp-rank) * 70ms);
    }
    @keyframes sp-step-in {
      from { opacity: 0; transform: translateX(-8px); }
      to   { opacity: 1; transform: none; }
    }

    .sp-tracker.is-entering .sp-step-line {
      animation: sp-line-in 260ms cubic-bezier(.2, 0, 0, 1) both;
      animation-delay: calc(320ms + var(--sp-rank) * 70ms);
      transform-origin: top center;
    }
    @keyframes sp-line-in {
      from { transform: scaleY(0); }
      to   { transform: scaleY(1); }
    }

    /* La pastille de l'étape en cours se signale, une fois, à la fin. */
    .sp-tracker.is-entering .sp-step.is-current .sp-step-dot {
      animation: sp-pulse 900ms cubic-bezier(.2, 0, 0, 1) both;
      animation-delay: calc(420ms + var(--sp-rank) * 70ms);
    }
    @keyframes sp-pulse {
      0%   { box-shadow: 0 0 0 0 rgba(9, 65, 113, .36); }
      60%  { box-shadow: 0 0 0 8px rgba(9, 65, 113, 0); }
      100% { box-shadow: 0 0 0 0 rgba(9, 65, 113, 0); }
    }

    /* Mouvement réduit : tout est là, rien ne bouge. */
    @media (prefers-reduced-motion: reduce) {
      .sp-tracker.is-entering,
      .sp-tracker.is-entering .sp-step,
      .sp-tracker.is-entering .sp-step-line,
      .sp-tracker.is-entering .sp-step.is-current .sp-step-dot {
        animation: none;
      }
    }

    /* Sous 1320px la page passe en colonne : le tracker se couche et
       s'étale, les traits deviennent horizontaux. */
    @media (max-width: 1320px) {
      .step-progress { width: 100%; }
      .sp-steps { flex-direction: row; flex-wrap: wrap; gap: 8px 16px; }
      .sp-step, .sp-step:last-child { min-height: 0; }
      .sp-step-rail { align-self: center; }
      .sp-step-line { display: none; }
      .sp-step-label { padding: 2px 0; white-space: nowrap; }
    }
  `
  document.head.appendChild(style)

  /* ══ Markup ══════════════════════════════════════════════════════ */
  const currentKey = container.dataset.current
  const currentIndex = STEPS.findIndex(s => s.key === currentKey)

  /* Une clé inconnue vaut mieux qu'un tracker faux : on prévient et on
     n'affiche rien plutôt que de désigner la mauvaise étape. */
  if (currentIndex === -1) {
    console.warn(
      `progress-tracker : data-current="${currentKey}" n'est pas une étape connue. ` +
      `Attendu : ${STEPS.map(s => s.key).join(', ')}.`
    )
    return
  }

  /* En mode édition on retouche une annonce publiée : les écrans qu'on
     rejoint doivent en porter le contenu, donc le paramètre suit. */
  const adId = new URLSearchParams(location.search).get('ad')
  const enEdition = Boolean(adId)

  /* ══ Jusqu'où le parcours est allé ═══════════════════════════════
     Revenir à une étape précédente ne doit pas rendre inaccessibles
     celles qu'on a déjà remplies : elles restent actives, simplement
     non sélectionnées.

     En mode édition la question ne se pose pas : l'annonce est publiée,
     donc toutes ses étapes ont été franchies.

     En dépôt neuf, la progression est retenue dans le brouillon. Le
     tracker l'avance de lui-même à chaque étape atteinte. */
  let atteintMax = currentIndex

  if (enEdition) {
    atteintMax = STEPS.length - 1
  } else if (window.Draft) {
    const memoire = Draft.read().etapeMax
    atteintMax = Math.max(Number.isInteger(memoire) ? memoire : -1, currentIndex)
    if (atteintMax > (Number.isInteger(memoire) ? memoire : -1)) {
      Draft.patch({ etapeMax: atteintMax })
    }
  }

  const etat = i => {
    if (i < currentIndex) return 'done'
    if (i === currentIndex) return 'current'
    return i <= atteintMax ? 'available' : 'todo'
  }

  const dit = {
    done: 'Terminé',
    current: 'Étape en cours',
    available: 'Déjà remplie',
    todo: 'À venir',
  }

  function adresseDe(step) {
    if (!step.page) return null
    if (!adId) return step.page
    const qs = step.editPrefill ? [step.editPrefill] : []
    qs.push('ad=' + encodeURIComponent(adId))
    return `${step.page}?${qs.join('&')}`
  }

  const items = STEPS.map((step, i) => {
    const e = etat(i)
    const dernier = i === STEPS.length - 1
    const pastille = e === 'done'
      ? '<img src="assets/tracker-check.svg" width="16" height="16" alt="" />'
      : String(i + 1)

    /* Est atteignable toute étape déjà franchie dont l'écran existe,
       qu'elle soit avant ou après celle où l'on se trouve. L'étape en
       cours n'est pas un lien — on y est — et celles jamais franchies ne
       se sautent pas. */
    const href = (e === 'done' || e === 'available') ? adresseDe(step) : null
    const label = href
      ? `<a class="sp-step-label" href="${href}">${step.label}<span class="sp-sr-only"> — ${dit[e]}, aller à cette étape</span></a>`
      : `<span class="sp-step-label">${step.label}<span class="sp-sr-only"> — ${dit[e]}</span></span>`

    return `
      <li class="sp-step is-${e}" style="--sp-rank:${i}"${e === 'current' ? ' aria-current="step"' : ''}>
        <span class="sp-step-rail">
          <span class="sp-step-dot">${pastille}</span>
          ${dernier ? '' : '<span class="sp-step-line"></span>'}
        </span>
        ${label}
      </li>`
  }).join('')

  container.innerHTML = `
    <nav class="sp-tracker" aria-label="Progression du dépôt" data-node-id="15918:18055">
      <p class="sp-tracker-title">Votre annonce pas à pas</p>
      <ol class="sp-steps" data-node-id="15918:18057">${items}</ol>
    </nav>`

  /* L'animation d'entrée ne joue que là où le tracker apparaît pour la
     première fois, c'est-à-dire à l'étape « Adresse ». */
  if (container.hasAttribute('data-animate')) {
    container.querySelector('.sp-tracker').classList.add('is-entering')
  }

  /* ══ La barre de progression du header ════════════════════════════
     Elle dit la même chose que le tracker, elle doit donc en découler :
     chaque page portait sa propre valeur en dur, et elles finissaient
     par se contredire — la description était à 58 % quand les photos,
     qui viennent avant, étaient à 76 %.

     Le compte inclut l'étape du titre, qui précède le tracker et n'y
     figure pas : sept jalons, dont « Adresse » est le deuxième. */
  /* Le repli sur la classe rattrape une page qui aurait oublié l'id —
     c'était le cas de l'étape adresse, dont la barre restait figée. */
  const barre = document.getElementById('progress-fill')
    || document.querySelector('.progress-bar-fill')

  if (barre) {
    const jalons = STEPS.length + 1
    barre.style.width = `${Math.round(((currentIndex + 2) / jalons) * 100)}%`
  }
})()
