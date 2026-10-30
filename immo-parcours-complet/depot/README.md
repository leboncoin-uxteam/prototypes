# Dépôt d'annonce immobilière — prototype

Parcours de dépôt d'annonce immobilière et page d'accueil qui y mène. Prototypes HTML autonomes, sans build.

Construit pour la refonte du dépôt immobilier (location et achat).

## Parcours

```
homepage/  →  titre  →  localisation  →  photos
```

| Écran | Fichier | Ce qu'il démontre |
|---|---|---|
| Page d'accueil | `homepage/index.html` | Point d'entrée, les boutons « Déposer une annonce » lancent le parcours |
| Titre | `ad-insertion-titre.html` | Saisie du titre, suggestions de catégories révélées après une pause dans la frappe |
| Localisation | `ad-insertion-localisation.html` | Autocomplete d'adresse, carte, zoning du secteur |
| Photos | `ad-insertion-photos.html` | Ajout de photos, réordonnancement par glisser-déposer |

Le bouton « Quitter » de chaque étape ouvre une dialog de sortie, dont « Recommencer » renvoie à la première étape.

## Ouvrir

Double-cliquer sur `homepage/index.html` pour prendre le parcours depuis le début, ou sur n'importe quel `ad-insertion-*.html` pour entrer directement à une étape.

Certains écrans appellent des API externes (adresses, tuiles de carte) : il faut donc une connexion. Si le navigateur bloque les requêtes en `file://`, servir le dossier :

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

## Structure

```
depot/
├── homepage/                      page d'accueil (README dédié à l'intérieur)
├── ad-insertion-titre.html
├── ad-insertion-localisation.html
├── ad-insertion-photos.html
├── exit-dialog.js                 dialog de sortie, partagée par les 3 étapes
└── assets/                        SVG communs aux 3 étapes
```

`exit-dialog.js` s'accroche automatiquement à tout bouton portant le libellé « Quitter » : une seule source pour les trois écrans.

## Données externes

| Usage | Source |
|---|---|
| Autocomplete d'adresse | Base Adresse Nationale — `api-adresse.data.gouv.fr` |
| Fond de carte | OSM France — `tile.openstreetmap.fr/osmfr`, choisi car ses tuiles dessinent déjà les pictogrammes de transport (M, RER, gares) |

Aucune clé API n'est nécessaire. À noter : les tuiles Carto (`basemaps.cartocdn.com`) renvoient désormais une image « API KEY REQUIRED » avec un code HTTP 200 — ne pas les utiliser sans clé.

## Design system

Les tokens Spark sont déclarés en variables CSS en tête de chaque fichier : couleurs, espacements, rayons, durées. Typographie Nunito Sans.

Les états des composants sont implémentés, pas seulement leur apparence par défaut : `:hover`, `:active`, `:focus-visible`, et les états `disabled` et `error` (opacité `--dim-3`, couleur `--color-error`).

## Points ouverts

- **« Voir mes annonces »** dans la dialog de sortie n'a pas de page cible : la destination se branche via la constante `MES_ANNONCES` en tête de `exit-dialog.js`.
- **Pas d'état partagé entre les étapes** : chaque écran repart vierge, les saisies ne se propagent pas d'une étape à l'autre.
- **L'étape prix** existe mais n'est pas incluse ici, elle ne fait pas partie du parcours.
