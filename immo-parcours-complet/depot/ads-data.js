/* ══ Annonces déjà déposées ════════════════════════════════════════
   Les quatre annonces de la maquette Figma (frame 2150:24506). Elles sont
   « en production » : publiées, consultées, avec un score de complétion.

   Rien à voir avec le brouillon du dépôt en cours, qui vit dans `Draft`
   (voir draft-store.js). Les deux ne se mélangent jamais :

     Draft    → un dépôt que l'utilisateur est en train de saisir. Il
                choisit son titre, sa description, ses photos. Aucune
                valeur par défaut ne lui est imposée.
     ADS      → des annonces publiées. Leur contenu vient d'ici, et les
                retouches qu'on leur apporte vont dans `AdEdits`.

   Ce fichier est la seule source du contenu des annonces : « Mes annonces »
   l'affiche, et les étapes de dépôt en mode édition y lisent ce qu'elles
   doivent pré-remplir. Modifier une annonce se fait ici, à un seul endroit.

     Ads.all()      → les quatre annonces
     Ads.byId(id)   → une annonce, ou undefined
*/
(function () {
  const TITRE = 'Appartement 3 pièces 100 m² NICE'

  /* La description de départ fait 259 caractères — le chiffre que le
     panneau de complétion annonce pour ces annonces. */
  const DESCRIPTION =
    'Appartement 3 pièces de 100 m² au calme, en étage élevé. ' +
    'Vaste séjour double exposition ouvrant sur une terrasse couverte de 20 m². ' +
    'Cuisine équipée aménagée, deux chambres avec rangements, salle de bains et WC séparés. ' +
    'Vue dégagée, sans aucun vis-à-vis. Cave.'

  /* Les quatre scores de la maquette : c'est la gradation qui s'y
     démontre, du score bas au score haut. */
  const ADS = [
    { id: 'a1', score: 30 },
    { id: 'a2', score: 30 },
    { id: 'a3', score: 50 },
    { id: 'a4', score: 90 },
  ].map(ad => ({
    ...ad,
    title: TITRE,
    description: DESCRIPTION,
    descLength: DESCRIPTION.length,
    // Les quatre photos de l'annonce, celles de assets/annonce-t3/.
    nbPhotos: 4,
    /* L'adresse du bien, telle qu'on la cherche dans l'étape de
       localisation : c'est elle qui garnit le champ quand on vient
       corriger la localisation depuis « Mes annonces ».

       Le code postal est dans la requête : la rue de Belleville court
       sur deux arrondissements, et sans lui la base adresse renvoie le
       19e. */
    addressQuery: 'Rue de Belleville, 75020 Paris',
    price: '500 000 €',
    category: 'Ventes immobilières',
    createdAt: 'Créée 29 juin 2026',
    views: 56,
    favorites: 18,
    messages: 1,
  }))

  window.Ads = {
    all: () => ADS.map(ad => ({ ...ad })),
    byId: id => {
      const found = ADS.find(ad => ad.id === id)
      return found ? { ...found } : undefined
    },
  }
})()
