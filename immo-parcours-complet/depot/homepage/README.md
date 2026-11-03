# Homepage leboncoin — prototype

Reproduction de la page d'accueil leboncoin, servant de point d'entrée au parcours de dépôt d'annonce.

Prototype de test interne, construit pour la refonte du dépôt immobilier.

**Source Figma** : fichier `CGxP206xxIHnb5HftidtoE`, frame `StartpageLbc/Current` (node `15472:22930`).

## Ouvrir le prototype

Double-cliquer sur `index.html`. Pas de build, pas de dépendance à installer.

Si le navigateur bloque le chargement des images en `file://`, servir le dossier :

```sh
python3 -m http.server 8000 --bind 127.0.0.1
# puis http://127.0.0.1:8000/index.html
```

## Structure

```
homepage/
├── index.html    tout le markup, le CSS et le JS
├── assets/       SVG et images exportés de Figma
└── README.md
```

Seule dépendance externe : la police Nunito Sans, chargée depuis Google Fonts. Hors ligne, le navigateur retombe sur une police système.

## Ce qui est construit

| Section | État |
|---|---|
| Habillage publicitaire | reproduit à l'identique (1696 × 900, centré, ancré en haut) |
| Header — logo, dépôt, recherche, raccourcis compte | construit, **sticky** au scroll |
| Nav catégories | construite |
| Bandeau « C'est le moment de vendre » | construit, avec son décor débordant |
| « Reprendre ma recherche » | construit, 3 cartes, croix fonctionnelle |
| « Vos coups de cœur » | **zoning** — node Figma `15472:22959` |
| « Ça va vous plaire » | **zoning** — node Figma `15472:22960` |
| InfiniteScroll, footer SEO | hors périmètre |

Les deux carrousels sont laissés en bloc gris à leur hauteur réelle du Figma (295 px et 388 px), pour que les proportions de la page restent justes sans les construire.

## Tokens

Les couleurs, rayons et espacements sont déclarés en variables CSS en haut de `index.html`, relevés dans la réponse du MCP Figma : `--main: #ec5a13`, `--main-container: #ffe9de`, `--neutral-container: #f0f2f5`, rayons 4 / 8 / 16.

Typographie Nunito Sans, échelle Spark : Body 1 16/24, Body 2 14/20, Caption 12/16, Callout 16/24 bold, Headline 2 20/28 bold.

## Modifier le contenu

Les cartes de recherches récentes sont dans un tableau en bas du fichier, une entrée par carte :

```js
const RECENT_SEARCHES = [
  { title: 'Appartement avec charme', criteria: 'Périgueux (24000) - 5 km, maison +1,  max. 500 000...' },
  // …
]
```

Le Figma affiche trois fois la même recherche ; c'est reproduit tel quel. Pour une démo, remplacer par trois recherches distinctes.

## Lien vers le parcours de dépôt

Les deux boutons « Déposer une annonce » pointent vers `../ad-insertion-titre.html`, **au-dessus de ce dossier**. Ils ne fonctionnent donc que si `homepage/` est à côté des fichiers `ad-insertion-*.html` du dossier `design/`.

Déplacé seul, le prototype s'affiche normalement mais ces deux boutons mènent à une 404. Pour les rebrancher, chercher `ad-insertion-titre.html` dans `index.html` (deux occurrences).

Le parcours de dépôt enchaîne : titre → localisation → photos → description →
`mes-annonces/`, où le dépôt apparaît en brouillon.

À partir de l'étape de localisation, une colonne « Votre annonce pas à pas »
longe le contenu : le progress tracker vertical de Spark, dans
`../progress-tracker.js`. Il démarre à l'étape « Adresse » — celle du titre
vient avant et n'y figure pas — et y entre avec une animation. Les étapes
suivantes l'affichent sans la rejouer.

## Responsive

- **> 1120 px** : page de 1086 px centrée sur l'habillage, comme dans le Figma
- **≤ 1120 px** : l'habillage est retiré, la page passe pleine largeur — le comportement du site
- **≤ 900 px** : 2 cartes par ligne, libellés des raccourcis compte masqués
- **≤ 720 px** : 1 carte par ligne, bandeau de dépôt empilé, nav catégories défilante

## Déployer sur GitHub Pages

Le dossier est servable tel quel : pousser `homepage/` dans un dépôt, activer Pages sur la branche et le répertoire. Aucune étape de build.

Attention au `basePath` : les chemins étant tous relatifs (`assets/…`), le prototype fonctionne dans un sous-répertoire sans modification.
