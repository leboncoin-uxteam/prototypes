import Database from "better-sqlite3"
import { drizzle } from "drizzle-orm/better-sqlite3"
import { annonces, listes, favoris } from "./schema"
import path from "path"

const DB_PATH = path.join(process.cwd(), "favoris.db")
const sqlite = new Database(DB_PATH)
sqlite.pragma("journal_mode = WAL")
sqlite.pragma("foreign_keys = ON")
const db = drizzle(sqlite)

// Recréer les tables depuis zéro (DROP + CREATE pour garantir le schéma à jour)
sqlite.exec(`
  DROP TABLE IF EXISTS favoris;
  DROP TABLE IF EXISTS annonces;
  DROP TABLE IF EXISTS listes;

  CREATE TABLE annonces (
    id TEXT PRIMARY KEY,
    titre TEXT NOT NULL,
    prix REAL NOT NULL,
    localisation TEXT NOT NULL,
    categorie TEXT NOT NULL,
    image TEXT NOT NULL,
    date_publication TEXT NOT NULL,
    vendeur TEXT NOT NULL,
    annee INTEGER,
    kilometrage INTEGER,
    energie TEXT
  );

  CREATE TABLE listes (
    id TEXT PRIMARY KEY,
    nom TEXT NOT NULL,
    description TEXT,
    date_creation TEXT NOT NULL,
    ordre INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE favoris (
    id TEXT PRIMARY KEY,
    annonce_id TEXT NOT NULL REFERENCES annonces(id) ON DELETE CASCADE,
    liste_id TEXT REFERENCES listes(id) ON DELETE SET NULL,
    date_ajout TEXT NOT NULL
  );
`)

const ANNONCES_SEED = [
  // --- IMMOBILIER ---
  {
    id: "immo-1",
    titre: "Appartement 5 pièces · 142 m²",
    prix: 395000,
    localisation: "Périgueux 24000 · Centre-ville - La Gare - Saint-Martin",
    categorie: "immobilier" as const,
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/82/45/60/82456005380430ce0c19c3ee36a5fe15a3bbe8c8.jpg?rule=ad-large",
    datePublication: "2024-07-15",
    vendeur: "AXE 24",
  },
  {
    id: "immo-2",
    titre: "Appartement 4 pièces · 79 m²",
    prix: 160000,
    localisation: "Périgueux, 24000",
    categorie: "immobilier" as const,
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/6f/c3/09/6fc3090f28c8e6aa5fc5bc55966c27cf981f5da6.jpg?rule=ad-large",
    datePublication: "2024-07-10",
    vendeur: "NETO-IMMO",
  },
  {
    id: "immo-3",
    titre: "Appartement 5 pièces · 152 m²",
    prix: 215100,
    localisation: "Périgueux 24000 · Centre-ville - La Gare - Saint-Martin",
    categorie: "immobilier" as const,
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/8e/43/cb/8e43cbd969161fb137401aeae1a9151cbe2c6c38.jpg?rule=ad-large",
    datePublication: "2024-07-18",
    vendeur: "ORPI Agence du Centre",
  },
  {
    id: "immo-4",
    titre: "Appartement 5 pièces · 80 m²",
    prix: 129000,
    localisation: "Périgueux, 24000",
    categorie: "immobilier" as const,
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/2f/f7/c1/2ff7c15cfef36ff4a8e6691d5d503c445e405542.jpg?rule=ad-large",
    datePublication: "2024-07-05",
    vendeur: "Guillaume LAFON Dr House",
  },
  {
    id: "immo-5",
    titre: "Appartement 4 pièces · 91 m²",
    prix: 162000,
    localisation: "Périgueux 24000 · Centre-ville - La Gare - Saint-Martin",
    categorie: "immobilier" as const,
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/fa/88/b7/fa88b72d5d3f602329267098508f1c8d087955af.jpg?rule=ad-large",
    datePublication: "2024-07-01",
    vendeur: "SELECTION HABITAT",
  },
  {
    id: "immo-6",
    titre: "Appartement 6 pièces · 152 m²",
    prix: 355800,
    localisation: "Périgueux 24000 · Centre-ville - La Gare - Saint-Martin",
    categorie: "immobilier" as const,
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/57/da/88/57da882398ff2d6ed761744a57cc91780211f5fb.jpg?rule=ad-large",
    datePublication: "2024-07-20",
    vendeur: "Guillaume LAFON Dr House",
  },
  {
    id: "immo-7",
    titre: "Appartement 4 pièces · 83 m²",
    prix: 239856,
    localisation: "Périgueux, 24000",
    categorie: "immobilier" as const,
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/e3/0e/98/e30e9836bd08791d00eea2d381c31fd299497e49.jpg?rule=ad-large",
    datePublication: "2024-07-08",
    vendeur: "HUMAN Immobilier",
  },
  {
    id: "immo-8",
    titre: "Appartement 4 pièces · 145 m²",
    prix: 229000,
    localisation: "Périgueux, 24000",
    categorie: "immobilier" as const,
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/af/96/63/af96637bf53dd28bbab950d571964d85a48e569f.jpg?rule=ad-large",
    datePublication: "2024-07-12",
    vendeur: "Agence immobilière Laforêt Perigueux",
  },
  {
    id: "immo-9",
    titre: "Appartement 5 pièces · 142 m²",
    prix: 395000,
    localisation: "Périgueux 24000 · Centre-ville - La Gare - Saint-Martin",
    categorie: "immobilier" as const,
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/f1/2c/23/f12c23c2a576befa69f7fafd998fab34940052cd.jpg?rule=ad-large",
    datePublication: "2024-07-14",
    vendeur: "ORPI Agence Cipierre",
  },
  {
    id: "immo-10",
    titre: "Appartement 6 pièces · 143 m²",
    prix: 394900,
    localisation: "Périgueux 24000 · Centre-ville - La Gare - Saint-Martin",
    categorie: "immobilier" as const,
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/ea/cc/1b/eacc1bdbb3956fa29bfeb89187ddc3cf1daaaf55.jpg?rule=ad-large",
    datePublication: "2024-07-16",
    vendeur: "Patrick GRENIER - 3G IMMO",
  },
  // --- VOITURES ---
  {
    id: "auto-1",
    titre: "Clio 4",
    prix: 6200,
    localisation: "Périgueux, 24000",
    categorie: "voitures" as const,
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/77/ab/5a/77ab5ac9cc2e85360deaa982035a91417d230908.jpg?rule=ad-large",
    datePublication: "2024-07-15",
    vendeur: "Loan (particulier)",
    annee: 2018,
    kilometrage: 151000,
    energie: "Diesel",
  },
  {
    id: "auto-2",
    titre: "Renault Clio 1.5 dCi 75 ch / Bluetooth GPS",
    prix: 5990,
    localisation: "Boulazac Isle Manoire, 24750",
    categorie: "voitures" as const,
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/f3/eb/dc/f3ebdca5e2351ceecdc732ceb95a095c42e68897.jpg?rule=ad-large",
    datePublication: "2024-07-10",
    vendeur: "EWIGO PERIGUEUX",
    annee: 2013,
    kilometrage: 240500,
    energie: "Diesel",
  },
  {
    id: "auto-3",
    titre: "Renault Clio IV Trend 0.9 TCe 75 · Garantie 12 mois",
    prix: 7990,
    localisation: "Marsac-sur-l'Isle, 24430",
    categorie: "voitures" as const,
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/54/b4/58/54b458cfce2958ccdba02e94254e0f0bcd54cdaf.jpg?rule=ad-large",
    datePublication: "2024-07-18",
    vendeur: "TRANSAKAUTO PERIGUEUX",
    annee: 2019,
    kilometrage: 108730,
    energie: "Essence",
  },
  {
    id: "auto-4",
    titre: "Renault Clio IV RS 1.6 Turbo 200 ch EDC6",
    prix: 9990,
    localisation: "Marsac-sur-l'Isle, 24430",
    categorie: "voitures" as const,
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/c7/6c/87/c76c87811f42374c60e17e33c691adc54c53a0a1.jpg?rule=ad-large",
    datePublication: "2024-07-05",
    vendeur: "TRANSAKAUTO PERIGUEUX",
    annee: 2014,
    kilometrage: 177000,
    energie: "Essence",
  },
  {
    id: "auto-5",
    titre: "Clio IV grise",
    prix: 8500,
    localisation: "Le Bugue, 24260",
    categorie: "voitures" as const,
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/04/29/57/042957d7047e5a9b1282c6759e14afb6e8636d1a.jpg?rule=ad-large",
    datePublication: "2024-07-01",
    vendeur: "Rlrom9 (particulier)",
    annee: 2017,
    kilometrage: 72135,
    energie: "Essence",
  },
  {
    id: "auto-6",
    titre: "Renault Clio IV 1.5 dCi 90 Business",
    prix: 9900,
    localisation: "Saint-Pierre-de-Chignac, 24330",
    categorie: "voitures" as const,
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/b1/52/eb/b152eb1d189e7d5fca268719b8f51b1f90ba5eeb.jpg?rule=ad-large",
    datePublication: "2024-07-20",
    vendeur: "ST PIERRE AUTOS",
    annee: 2015,
    kilometrage: 100900,
    energie: "Diesel",
  },
  {
    id: "auto-7",
    titre: "Clio 4 Diesel",
    prix: 8400,
    localisation: "Val de Louyre et Caudeau, 24150",
    categorie: "voitures" as const,
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/90/89/d7/9089d7af338bc3fb02f09a2f4fe22842049c5e87.jpg?rule=ad-large",
    datePublication: "2024-07-08",
    vendeur: "Bretout (particulier)",
    annee: 2017,
    kilometrage: 150000,
    energie: "Diesel",
  },
  {
    id: "auto-8",
    titre: "Clio 4 GTLine",
    prix: 9600,
    localisation: "Trélissac, 24750",
    categorie: "voitures" as const,
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/e5/1d/ed/e51ded26fd7dd5c3d423f2cd12f7cafd420519a4.jpg?rule=ad-large",
    datePublication: "2024-07-12",
    vendeur: "Dupont Alexis (particulier)",
    annee: 2017,
    kilometrage: 116500,
    energie: "Essence",
  },
  {
    id: "auto-9",
    titre: "Renault Clio 4 dCi 90 GT Line",
    prix: 8500,
    localisation: "Terrasson-Lavilledieu, 24120",
    categorie: "voitures" as const,
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/19/ba/f6/19baf60930f5236d993294601b565d14e27016d1.jpg?rule=ad-large",
    datePublication: "2024-07-14",
    vendeur: "Ophélie (particulier)",
    annee: 2015,
    kilometrage: 146000,
    energie: "Diesel",
  },
  {
    id: "auto-10",
    titre: "Renault Clio 4 Limited 0.9 TCe 90 Bluetooth",
    prix: 6590,
    localisation: "Trélissac, 24750",
    categorie: "voitures" as const,
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/1f/e4/1d/1fe41db5451545b4bf7938f044c97bd60121089b.jpg?rule=ad-large",
    datePublication: "2024-07-16",
    vendeur: "Yummy Car Trélissac",
    annee: 2014,
    kilometrage: 163593,
    energie: "Essence",
  },
  // --- AMEUBLEMENT ---
  {
    id: "meuble-1",
    titre: "Buffet bois",
    prix: 50,
    localisation: "Antonne-et-Trigonant, 24420",
    categorie: "ameublement" as const,
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/ba/ab/20/baab2082e25ea0d984bcd4bd3a59fa71deedb014.jpg?rule=ad-large",
    datePublication: "2024-07-15",
    vendeur: "fab24 (particulier)",
  },
  {
    id: "meuble-2",
    titre: "Buffet bas en bois",
    prix: 60,
    localisation: "Mussidan, 24400",
    categorie: "ameublement" as const,
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/27/cb/90/27cb901b10e0624e32e575a5854dacfcfa3041b4.jpg?rule=ad-large",
    datePublication: "2024-07-10",
    vendeur: "LOBRI (particulier)",
  },
  {
    id: "meuble-3",
    titre: "Buffet en bois massif",
    prix: 290,
    localisation: "Jumilhac-le-Grand, 24630",
    categorie: "ameublement" as const,
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/8c/b1/3e/8cb13e25c5f849328ee39abb52702f6a0be8a710.jpg?rule=ad-large",
    datePublication: "2024-07-18",
    vendeur: "JG (particulier)",
  },
  {
    id: "meuble-4",
    titre: "Buffet métal noir et bois",
    prix: 190,
    localisation: "Bassillac et Auberoche, 24330",
    categorie: "ameublement" as const,
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/14/c4/ed/14c4ed86083ce3e4ad153d4340440d7e6a258f54.jpg?rule=ad-large",
    datePublication: "2024-07-05",
    vendeur: "EmmaR (particulier)",
  },
  {
    id: "meuble-5",
    titre: "Buffet en bois massif, meuble ancien parisien",
    prix: 350,
    localisation: "Brantôme en Périgord, 24310",
    categorie: "ameublement" as const,
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/14/c8/f5/14c8f569c8b83deca9a3659c2c171a15852e63ab.jpg?rule=ad-large",
    datePublication: "2024-07-01",
    vendeur: "VINTAGE & COULEURS",
  },
  {
    id: "meuble-6",
    titre: "3 Buffets bas en bois",
    prix: 100,
    localisation: "Douzillac, 24190",
    categorie: "ameublement" as const,
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/7c/f8/ef/7cf8efe37db77f791071641ebf18a743074677ca.jpg?rule=ad-large",
    datePublication: "2024-07-20",
    vendeur: "LMB (particulier)",
  },
  {
    id: "meuble-7",
    titre: "Buffet salon 186",
    prix: 100,
    localisation: "Sorges et Ligueux en Périgord, 24420",
    categorie: "ameublement" as const,
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/f4/85/ae/f485ae79f5989dcd8bde3538856e41e95d885550.jpg?rule=ad-large",
    datePublication: "2024-07-08",
    vendeur: "Fr.sarah (particulier)",
  },
  {
    id: "meuble-8",
    titre: "Buffet salle à manger",
    prix: 50,
    localisation: "Limeuil, 24510",
    categorie: "ameublement" as const,
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/1c/44/05/1c440503deb11051e0eb38d07b0eb2b619d02fcf.jpg?rule=ad-large",
    datePublication: "2024-07-12",
    vendeur: "xdaveluy (particulier)",
  },
  {
    id: "meuble-9",
    titre: "Buffet 190 cm style industriel / chêne",
    prix: 220,
    localisation: "La Chapelle-Gonaguet, 24350",
    categorie: "ameublement" as const,
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/ef/32/e2/ef32e27f5923ea73aff80436dd7c9255ac2b164d.jpg?rule=ad-large",
    datePublication: "2024-07-14",
    vendeur: "Jr24 (particulier)",
  },
  {
    id: "meuble-10",
    titre: "Enfilade style Louis XVI - buffet",
    prix: 150,
    localisation: "Saint-Cyprien, 24220",
    categorie: "ameublement" as const,
    image: "https://img.leboncoin.fr/api/v1/lbcpb1/images/dc/76/87/dc76878d3b52c1bf2afeb03f540a840e714016bd.jpg?rule=ad-large",
    datePublication: "2024-07-16",
    vendeur: "Nathalie (particulier)",
  },
]

const LISTES_SEED = [
  {
    id: "liste-1",
    nom: "Appart à visiter",
    description: "Appartements et maisons à visiter ce mois-ci",
    dateCreation: "2024-07-01",
    ordre: 0,
  },
]

const FAVORIS_SEED = [
  // Dans liste "Appart à visiter"
  { id: "fav-1", annonceId: "immo-1", listeId: "liste-1", dateAjout: "2024-07-16T09:32:00" },
  { id: "fav-2", annonceId: "immo-3", listeId: "liste-1", dateAjout: "2024-07-17T14:15:00" },
  { id: "fav-3", annonceId: "immo-6", listeId: "liste-1", dateAjout: "2024-07-18T18:47:00" },
  // Favoris généraux (sans liste)
  { id: "fav-4", annonceId: "immo-2", listeId: null, dateAjout: "2024-07-19T11:03:00" },
  { id: "fav-5", annonceId: "immo-8", listeId: null, dateAjout: "2024-07-20T16:22:00" },
]

async function seed() {
  console.log("🌱 Seed en cours...")

  await db.insert(annonces).values(ANNONCES_SEED)
  console.log(`✅ ${ANNONCES_SEED.length} annonces insérées`)

  await db.insert(listes).values(LISTES_SEED)
  console.log(`✅ ${LISTES_SEED.length} listes insérées`)

  await db.insert(favoris).values(FAVORIS_SEED)
  console.log(`✅ ${FAVORIS_SEED.length} favoris insérés`)

  console.log("✅ Seed terminé")
}

seed().catch(console.error).finally(() => sqlite.close())
