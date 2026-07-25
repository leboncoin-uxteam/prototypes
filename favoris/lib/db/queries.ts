import { db } from "./client"
import { annonces, listes, favoris } from "./schema"
import { eq, asc, desc, isNull, and } from "drizzle-orm"

// --- ANNONCES ---

export function getAnnonces(categorie?: "immobilier" | "voitures" | "ameublement") {
  if (categorie) {
    return db.select().from(annonces).where(eq(annonces.categorie, categorie)).all()
  }
  return db.select().from(annonces).all()
}

export function getAnnonceById(id: string) {
  return db.select().from(annonces).where(eq(annonces.id, id)).get()
}

// --- LISTES ---

export function getListes() {
  return db.select().from(listes).orderBy(asc(listes.ordre)).all()
}

export function getListeById(id: string) {
  return db.select().from(listes).where(eq(listes.id, id)).get()
}

export function creerListe(nom: string, description?: string) {
  const existantes = getListes()
  const maxOrdre = existantes.length > 0 ? Math.max(...existantes.map((l) => l.ordre)) : -1
  const id = `liste-${Date.now()}`
  db.insert(listes)
    .values({
      id,
      nom,
      description: description ?? null,
      dateCreation: new Date().toISOString().split("T")[0],
      ordre: maxOrdre + 1,
    })
    .run()
  return getListeById(id)
}

export function supprimerListe(id: string) {
  // Les favoris dans cette liste deviennent des favoris généraux (liste_id = null via ON DELETE SET NULL)
  db.delete(listes).where(eq(listes.id, id)).run()
}

export function reordonnerListes(ordreIds: string[]) {
  for (let i = 0; i < ordreIds.length; i++) {
    db.update(listes).set({ ordre: i }).where(eq(listes.id, ordreIds[i])).run()
  }
}

// --- FAVORIS ---

export function getFavoris(listeId?: string | null) {
  if (listeId === undefined) {
    return db.select().from(favoris).orderBy(desc(favoris.dateAjout)).all()
  }
  if (listeId === null) {
    return db.select().from(favoris).where(isNull(favoris.listeId)).orderBy(desc(favoris.dateAjout)).all()
  }
  return db.select().from(favoris).where(eq(favoris.listeId, listeId)).orderBy(desc(favoris.dateAjout)).all()
}

export function getFavoriByAnnonceId(annonceId: string) {
  return db.select().from(favoris).where(eq(favoris.annonceId, annonceId)).get()
}

export function ajouterFavori(annonceId: string, listeId?: string) {
  const existant = getFavoriByAnnonceId(annonceId)
  if (existant) return existant

  const id = `fav-${Date.now()}`
  db.insert(favoris)
    .values({
      id,
      annonceId,
      listeId: listeId ?? null,
      dateAjout: new Date().toISOString(),
    })
    .run()
  return db.select().from(favoris).where(eq(favoris.id, id)).get()
}

export function retirerFavori(annonceId: string) {
  db.delete(favoris).where(eq(favoris.annonceId, annonceId)).run()
}

export function supprimerFavori(favoriId: string) {
  db.delete(favoris).where(eq(favoris.id, favoriId)).run()
}

export function deplacerFavoriDansListe(favoriId: string, listeId: string | null) {
  db.update(favoris).set({ listeId }).where(eq(favoris.id, favoriId)).run()
}

export function getFavorisAvecAnnonces(listeId?: string | null) {
  const favorisList = getFavoris(listeId)
  return favorisList.map((fav) => ({
    ...fav,
    annonce: getAnnonceById(fav.annonceId)!,
  }))
}

export function getFavorisTriesParDate(listeId: string, ordre: "asc" | "desc" = "desc") {
  const query = db.select().from(favoris).where(eq(favoris.listeId, listeId))
  const results = ordre === "asc"
    ? query.orderBy(asc(favoris.dateAjout)).all()
    : query.orderBy(desc(favoris.dateAjout)).all()

  return results.map((fav) => ({
    ...fav,
    annonce: getAnnonceById(fav.annonceId)!,
  }))
}

export function estEnFavori(annonceId: string): boolean {
  const fav = getFavoriByAnnonceId(annonceId)
  return fav !== undefined
}

// Retourne toutes les listes avec les 4 premières images de leurs favoris
// + la liste virtuelle "Tous les favoris" en premier
export function getListesAvecImages() {
  // Liste virtuelle "Tous les favoris" — tous les favoris sans distinction
  const tousFavoris = db.select().from(favoris).orderBy(asc(favoris.dateAjout)).all()
  const tousImages = tousFavoris
    .slice(0, 4)
    .map((f) => getAnnonceById(f.annonceId)?.image)
    .filter((img): img is string => Boolean(img))

  const listeTousLesFavoris = {
    id: "__tous__",
    nom: "Tous les favoris",
    images: tousImages,
    count: tousFavoris.length,
  }

  // Listes réelles
  const listesReelles = getListes()
  const listesAvecImages = listesReelles.map((liste) => {
    const favsDeLaListe = db
      .select()
      .from(favoris)
      .where(eq(favoris.listeId, liste.id))
      .orderBy(asc(favoris.dateAjout))
      .all()

    const images = favsDeLaListe
      .slice(0, 4)
      .map((f) => getAnnonceById(f.annonceId)?.image)
      .filter((img): img is string => Boolean(img))

    return {
      id: liste.id,
      nom: liste.nom,
      images,
      count: favsDeLaListe.length,
    }
  })

  return [listeTousLesFavoris, ...listesAvecImages]
}
