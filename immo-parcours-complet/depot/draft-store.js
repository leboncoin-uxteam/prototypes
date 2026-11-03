/* ══ Brouillon du dépôt et retouches d'annonces ════════════════════
   Deux petits magasins partagés entre les étapes du dépôt et « Mes
   annonces ». C'est tout ce qui circule entre les pages du prototype.

   `Draft`    — le dépôt en cours, affiché en brouillon dans « Mes annonces ».
   `AdEdits`  — ce qu'on retouche sur une annonce déjà déposée : sa nouvelle
                description et le gain de score qui en découle. Indexé par
                l'identifiant de l'annonce.

   Les étapes y écrivent au fil de la saisie ; « Mes annonces » les relit.

   Les photos ne sont pas stockées telles quelles : le quota de
   localStorage (~5 Mo) ne le supporterait pas. Seule la première est
   gardée, réduite en vignette, plus le nombre total.

     Draft.read()              → l'objet brouillon ({} s'il n'y en a pas)
     Draft.patch({ … })        → fusionne et enregistre
     Draft.setThumb(src)       → réduit l'image et l'enregistre
     Draft.clear()             → efface le brouillon

     AdEdits.get(id)           → les retouches de cette annonce ({} si aucune)
     AdEdits.patch(id, { … })  → fusionne et enregistre
     AdEdits.clear()           → efface toutes les retouches

   Les deux survivent au rechargement et à la fermeture du navigateur.
   Pour repartir propre, ajouter « ?reset » à l'adresse de n'importe
   quelle page du prototype — voir la fin du fichier.
*/
(function () {
  const KEY = 'lbc-depot-draft'
  const THUMB_W = 320

  function read() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || {}
    } catch {
      return {}
    }
  }

  function write(draft) {
    try {
      localStorage.setItem(KEY, JSON.stringify(draft))
    } catch {
      // Quota dépassé : on sacrifie la vignette, qui est de loin le plus lourd.
      const { thumb, ...rest } = draft
      try { localStorage.setItem(KEY, JSON.stringify(rest)) } catch {}
    }
  }

  function patch(changes) {
    const draft = { ...read(), ...changes, updatedAt: Date.now() }
    write(draft)
    return draft
  }

  /* Réduit l'image à THUMB_W de large avant de l'enregistrer. */
  function setThumb(src) {
    if (!src) { patch({ thumb: null }); return }

    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, THUMB_W / img.width)
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
      try {
        patch({ thumb: canvas.toDataURL('image/jpeg', 0.7) })
      } catch {
        /* Page ouverte en file:// : le canvas est « tainted » et refuse
           l'export. On retient l'adresse de l'image, qui suffit quand elle
           vient du prototype plutôt que du disque de l'utilisateur.
           Elle est résolue en absolu : « Mes annonces » est dans un
           sous-dossier, un chemin relatif n'y pointerait plus. */
        patch({ thumb: src.startsWith('data:') ? null : new URL(src, location.href).href })
      }
    }
    img.onerror = () => patch({ thumb: null })
    img.src = src
  }

  function clear() {
    try { localStorage.removeItem(KEY) } catch {}
  }

  window.Draft = { read, patch, setThumb, clear }

  /* ══ Retouches d'annonces déjà déposées ══════════════════════════
     Une entrée par annonce : { description, descLength, scoreBonus }.

     Le gain de score est retenu comme un **écart**, pas comme un score
     absolu : l'écran de description n'a ainsi pas besoin de connaître le
     score de départ de l'annonce. « Mes annonces » l'ajoute au sien. */
  const EDITS_KEY = 'lbc-ad-edits'

  function readEdits() {
    try {
      return JSON.parse(localStorage.getItem(EDITS_KEY)) || {}
    } catch {
      return {}
    }
  }

  window.AdEdits = {
    get(id) {
      return readEdits()[id] || {}
    },
    patch(id, changes) {
      const all = readEdits()
      all[id] = { ...all[id], ...changes }
      try { localStorage.setItem(EDITS_KEY, JSON.stringify(all)) } catch {}
      return all[id]
    },
    clear() {
      try { localStorage.removeItem(EDITS_KEY) } catch {}
    },
  }

  /* ══ Remise à zéro ═══════════════════════════════════════════════
     « ?reset » au bout de l'adresse de n'importe quelle page du
     prototype vide les deux magasins, puis la page poursuit son
     chargement sur un état neuf.

     C'est la sortie de secours pour démarrer une démonstration : le
     brouillon d'un essai précédent et les scores déjà retouchés ne
     traînent plus. Sans elle il fallait passer par la corbeille de la
     carte de brouillon, par « Recommencer », ou par la console.

     Ce bloc vient après la déclaration des deux magasins et avant tout
     script de page : au moment où une page lit le brouillon, l'effacement
     a déjà eu lieu.

     Le paramètre est retiré de l'adresse aussitôt, pour qu'il ne reste
     ni dans la barre du navigateur ni dans un lien mis en marque-page —
     un lien qui remettrait tout à zéro à chaque ouverture. */
  const params = new URLSearchParams(location.search)

  if (params.has('reset')) {
    clear()
    window.AdEdits.clear()
    console.info('Prototype remis à zéro : brouillon et retouches effacés.')

    params.delete('reset')
    const qs = params.toString()
    try {
      history.replaceState(null, '', location.pathname + (qs ? `?${qs}` : '') + location.hash)
    } catch {
      /* Page ouverte en file:// : replaceState y est refusé. Le paramètre
         reste visible dans l'adresse, sans autre conséquence. */
    }
  }
})()
