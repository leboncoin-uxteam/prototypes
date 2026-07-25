import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core"

export const annonces = sqliteTable("annonces", {
  id: text("id").primaryKey(),
  titre: text("titre").notNull(),
  prix: real("prix").notNull(),
  localisation: text("localisation").notNull(),
  categorie: text("categorie", { enum: ["immobilier", "voitures", "ameublement"] }).notNull(),
  image: text("image").notNull(),
  datePublication: text("date_publication").notNull(),
  vendeur: text("vendeur").notNull(),
  // Champs spécifiques voitures
  annee: integer("annee"),
  kilometrage: integer("kilometrage"),
  energie: text("energie"),
})

export const listes = sqliteTable("listes", {
  id: text("id").primaryKey(),
  nom: text("nom").notNull(),
  description: text("description"),
  dateCreation: text("date_creation").notNull(),
  ordre: integer("ordre").notNull().default(0),
})

export const favoris = sqliteTable("favoris", {
  id: text("id").primaryKey(),
  annonceId: text("annonce_id").notNull().references(() => annonces.id, { onDelete: "cascade" }),
  listeId: text("liste_id").references(() => listes.id, { onDelete: "set null" }),
  dateAjout: text("date_ajout").notNull(),
})

export type Annonce = typeof annonces.$inferSelect
export type Liste = typeof listes.$inferSelect
export type Favori = typeof favoris.$inferSelect
export type NewAnnonce = typeof annonces.$inferInsert
export type NewListe = typeof listes.$inferInsert
export type NewFavori = typeof favoris.$inferInsert
