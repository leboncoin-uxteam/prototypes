# Mes annonces — prototype

Page de gestion des annonces du vendeur, construite pour la refonte du dépôt
immobilier. Elle met en scène le **score de complétion** et le panneau
« Compléter votre annonce ».

**Source Figma** : fichier `LVIkLP7tnsOcjjGT97mfpJ` (« Score de complétion »),
frame `MyAds card • Immo 🖥️` (node `2150:24506`).

## Ouvrir le prototype

Double-cliquer sur `index.html`. Pas de build, pas de dépendance à installer.

Si le navigateur bloque le chargement des images en `file://`, servir le dossier
parent (`design/`), pas celui-ci — la page lit `../draft-store.js` :

```sh
cd design
python3 -m http.server 8000 --bind 127.0.0.1
# puis http://127.0.0.1:8000/mes-annonces/index.html
```

## Structure

```
mes-annonces/
├── index.html    tout le markup, le CSS et le JS
├── assets/       SVG et images exportés de Figma
└── README.md
```

Seule dépendance externe : la police Nunito Sans, chargée depuis Google Fonts.

## Ce qui est construit

| Élément | État |
|---|---|
| Header, nav catégories, footer | construits, header **sticky** (reprise de `homepage/`) |
| Fil d'ariane, titre | construits |
| Onglets En ligne / Expirées | **En ligne** porte les annonces ; **Expirées** affiche un message |
| Tri, recherche, filtre catégorie | construits, **non fonctionnels** — c'est de l'habillage |
| Actions groupées | désactivées jusqu'à ce qu'une annonce soit cochée, puis actives |
| Carte d'annonce repliée | construite |
| Détail de performance | construit, **replié par défaut** |
| Onglet « Apparitions » | **zoning** — l'onglet bascule mais ne change pas le graphe |
| Panneau « Compléter votre annonce » | construit, 3 pistes sur 4 mènent à une étape de dépôt |
| Bandeau « Vendez plus vite » | construit |
| Carte de brouillon | construite, alimentée par le parcours de dépôt |

### Écart assumé avec le Figma

Le Figma affiche la 2ᵉ carte déjà déployée, parce que l'utilisateur vient de
cliquer sur « Afficher le détail ». Ici **toutes les cartes démarrent repliées**,
qui est l'état par défaut de la page.

L'onglet du Figma est libellé « Expired (2) » : c'est un placeholder resté en
anglais, remplacé par « Expirées (2) ».

## Le score de complétion

Les quatre annonces portent les scores **30 / 50 / 90 %** de la maquette : c'est
la gradation qui s'y démontre. La couleur suit le score — rouge sous 40 %, jaune
jusqu'à 70 %, vert au-delà.

Le score n'est pas figé : enrichir la description le fait monter de 5 points.
Voir « Le score monte de 5 points » plus bas.

La jauge circulaire est dessinée en SVG calculé, pas reprise d'un fichier : un
SVG figé ne saurait rendre trois pourcentages différents. Les trois couleurs et
le tracé sont ceux du composant `Circle meter` de Spark.

## Brouillon et annonces publiées : deux mondes séparés

Le prototype ne mélange jamais les deux, ni à l'écriture ni à la lecture.

| | Brouillon | Annonce publiée |
|---|---|---|
| Ce que c'est | un dépôt en cours de saisie | une annonce en ligne, consultée |
| Contenu | ce que l'utilisateur saisit | `../ads-data.js` |
| Magasin | `Draft` | `AdEdits`, superposé à `ads-data.js` |
| Dans cette page | une carte en tête de liste | les quatre cartes |

**Le titre du dépôt est celui de l'utilisateur.** Créer une annonce part d'un
champ vide, toujours — rien ne lui est proposé. Recommencer le dépôt efface le
brouillon et redonne la même page vierge. Le titre et la description de la
maquette ne servent qu'en mode édition, où ils décrivent une annonce réelle.

Une seule exception : **« Finaliser l'annonce »** sur la carte de brouillon mène
à `../ad-insertion-titre.html?draft=1`, qui retrouve le titre déjà saisi. Sans
ce paramètre, l'étape ouvre un titre vide. Reprendre un dépôt entamé et en
créer un neuf sont deux gestes différents.

Côté écriture, chaque étape de dépôt regarde si elle est en mode édition :

- avec `ad=<id>` → elle écrit dans `AdEdits[id]`, et ne touche pas au brouillon.
  Corriger une annonce en ligne ne crée ni ne salit un dépôt en cours ;
- sans → elle écrit dans `Draft`, et ne touche pas aux annonces.

`../ads-data.js` est la **seule source** du contenu des annonces. « Mes
annonces » l'affiche, les étapes en mode édition y lisent ce qu'elles
pré-remplissent. Pour changer une annonce de la démonstration, c'est le seul
fichier à ouvrir.

## La carte de brouillon

Le parcours de dépôt (`../ad-insertion-*.html`) enregistre ce qu'il collecte
dans `localStorage`, via `../draft-store.js`. Cette page le relit et affiche une
carte de brouillon en tête de liste.

| Étape de dépôt | Ce qui est retenu |
|---|---|
| Titre | le titre, la catégorie retenue |
| Localisation | ville, code postal, adresse, et si elle est précise |
| Photos | le nombre, et la première en vignette |

Les photos ne sont pas stockées telles quelles : le quota de `localStorage`
(~5 Mo) ne le supporterait pas. Seule la première est gardée, réduite à 320 px
de large.

**Sans brouillon en mémoire, la carte n'apparaît pas** — la page montre alors les
quatre annonces seules. Pour en poser un, passer par le dépôt :
`../ad-insertion-titre.html`. La corbeille de la carte efface le brouillon.

## Modifier une annonce depuis le panneau de complétion

Les pistes du panneau mènent à l'étape de dépôt qui corrige le manque. On y
arrive sur une annonce **déjà déposée**, donc les champs sont pré-remplis.

| Piste | Destination | Ce qu'elle trouve |
|---|---|---|
| Ajouter des photos | `../ad-insertion-photos.html?photos=t3&ad=<id>` | les 4 photos de l'annonce dans la grille |
| Compléter la localisation | `../ad-insertion-localisation.html?ad=<id>` | champ vide, à saisir |
| Ajouter des caractéristiques | — | l'étape n'est pas construite |
| Enrichir ma description | `../ad-insertion-description.html?ad=<id>` | titre + description de 259 caractères |

Les trois écrans renvoient ici par « Continuer ». Au retour, le détail de
l'annonce retouchée se rouvre, pour que le changement se voie.

### Mode édition

Chaque lien porte `ad=<id>`. Ce paramètre dit à l'étape de dépôt qu'elle
**modifie une annonce existante** au lieu de recevoir un dépôt neuf, ce qui
change deux choses :

- le bouton du header devient **« Enregistrer et quitter »** et ramène
  directement ici, sur l'annonce — plus de dialog « Que souhaitez-vous faire
  maintenant ? », qui n'a de sens que sur un dépôt pas encore publié ;
- « Continuer » referme la boucle sur l'annonce, au lieu d'enchaîner sur
  l'étape suivante du dépôt.

C'est `../exit-dialog.js` qui tient le libellé et le comportement du bouton,
pour les deux modes. Une page qui a des champs à enregistrer avant de partir
expose `window.saveEdits()` ; `exit-dialog.js` l'appelle au clic. Seul l'écran
de description en a besoin — les autres écrivent déjà au fil de la saisie.

Sans `ad=<id>` dans l'URL, les étapes gardent leur comportement de dépôt neuf :
bouton « Quitter » et dialog de confirmation.

### Le score monte de 5 points

Enrichir la description fait passer l'annonce de **30 % à 35 %**, et la piste
affiche la nouvelle longueur du texte.

Trois garde-fous, pour que la démonstration reste honnête :

- le gain exige un texte **plus long** — raccourcir ou vider la description ne
  fait pas monter le score ;
- il ne s'accorde **qu'une fois** : repasser par l'écran n'empile pas 5 % de
  plus ;
- une fois acquis, il **reste acquis**, même si la description est vidée ensuite.

La valeur est la constante `GAIN_SCORE` dans
`../ad-insertion-description.html`.

Le gain est retenu comme un **écart**, pas comme un score absolu : l'écran de
description n'a donc pas besoin de connaître le score de départ de l'annonce,
c'est cette page qui l'ajoute au sien (plafonné à 100 %).

Seule la description produit un gain. Ajouter des photos ou compléter la
localisation ne bouge pas le score — ces étapes n'écrivent rien dans
`AdEdits`.

Pour remettre les scores à zéro, voir « Repartir propre » ci-dessous.

Le paramètre `?photos=t3` est ce qui distingue la modification du dépôt neuf :
sans lui, la grille de l'étape photos reste vide. Les quatre photos sont dans
`../assets/annonce-t3/` — cuisine, terrasse, séjour, vue.

La description fait **259 caractères**, le chiffre qu'annonce le panneau
(« 259 sur 1 300 caractères »). Le champ accepte 4 000 caractères : 1 300 est la
longueur recommandée, pas le maximum.

## Repartir propre

Les deux magasins vivent dans `localStorage` : ils survivent au rechargement,
au rechargement forcé et à la fermeture du navigateur. Un titre saisi lors d'un
essai réapparaît donc des jours plus tard, et les scores retouchés restent à
leur valeur gagnée.

**Ajouter `?reset` à l'adresse de n'importe quelle page du prototype** vide les
deux magasins, puis la page s'ouvre sur un état neuf :

```
http://127.0.0.1:8000/mes-annonces/index.html?reset
```

À garder en marque-page pour démarrer une démonstration. Le paramètre est retiré
de l'adresse aussitôt — le lien ne remet donc pas tout à zéro à chaque
rechargement, et les autres paramètres sont conservés (`?photos=t3&reset&ad=a2`
garde `photos=t3` et `ad=a2`).

Les autres sorties, plus ciblées :

| Geste | Ce qu'il efface |
|---|---|
| `?reset` | le brouillon **et** les retouches d'annonces |
| La corbeille de la carte de brouillon | le brouillon seul |
| « Quitter » → « Recommencer » | le brouillon seul |

## Démonstration

- « Performance » et « Afficher le détail » ouvrent le même panneau.
- `index.html?detail=2` ouvre d'emblée le détail de la 2ᵉ carte — pratique pour
  une capture ou un lien de démonstration, comme la vue du Figma.
- Cocher une annonce active la barre d'actions groupées ; la case de tête
  sélectionne tout.
- Les corbeilles retirent la carte et mettent le compteur de l'onglet à jour.

## Place dans le parcours

```
homepage → titre → localisation → photos → mes-annonces
                                    ↑            │  │
            Finaliser l'annonce ────┘            │  │
                                                 │  │
         photos?photos=t3  ←── Ajouter des photos┘  │
         description       ←── Enrichir ma description
         localisation      ←── Compléter la localisation
```

Le bouton « Continuer » de l'étape photos mène ici : les étapes suivantes du
dépôt ne sont pas construites, le dépôt atterrit donc en brouillon.

Le bouton « Quitter » du parcours de dépôt propose aussi de venir ici
(`../exit-dialog.js`).

## Tokens

Relevés dans le Figma avec `get_variable_defs`, déclarés en variables CSS en
haut de `index.html` : `--main: #ec5a13`, `--support: #094171`,
`--background-variant: #f4f9fe`, `--error: #ad291f`, `--alert: #ffaa00`,
rayons 4 / 8 / 16.

Typographie Nunito Sans, échelle Spark : Body 1 16/24, Body 2 14/20,
Caption 12/16, Subhead 16/24 bold, Headline 2 20/28 bold.

## Modifier le contenu

Le contenu des annonces est dans `../ads-data.js` — titre, prix, description,
nombre de photos, statistiques, et le score de chacune. Elles reprennent celles
du Figma : seul le score varie d'une carte à l'autre.

Les quatre pistes d'amélioration sont dans `QUALITY_ITEMS`, en bas d'`index.html`.
Celles des photos et de la description tirent leur mesure de l'annonce ; les
deux autres sont fixes.

## Responsive

- **> 1120 px** : page de 1086 px centrée, comme dans le Figma
- **≤ 1000 px** : le panneau de complétion passe sur une colonne
- **≤ 900 px** : la colonne de statistiques passe sous la carte, en ligne
- **≤ 720 px** : nav catégories défilante, photo pleine largeur
