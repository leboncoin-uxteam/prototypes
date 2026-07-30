"use client"

import { useEffect, useState } from "react"
import { ListeCard } from "@/components/ListeCard"

type FavoriBottomSheetProps = {
  isOpen: boolean
  onClose: () => void
  annonceId: string
  listes: { id: string; nom: string; images: string[] }[]
  onSelectListe: (listeId: string) => void
  onCreerListe: () => void
}

export function FavoriBottomSheet({
  isOpen,
  onClose,
  listes,
  onSelectListe,
  onCreerListe,
}: FavoriBottomSheetProps) {
  const [visible, setVisible] = useState(false)
  const [animated, setAnimated] = useState(false)

  // Fermer au clic Echap
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [isOpen, onClose])

  // Bloquer le scroll du body quand ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  // Gérer l'animation d'entrée/sortie
  useEffect(() => {
    if (isOpen) {
      setVisible(true)
      // Décaler d'un tick pour que la transition s'applique
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)))
    } else {
      setAnimated(false)
      const timer = setTimeout(() => setVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!visible) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[60]"
        style={{
          backgroundColor: "var(--base-overlay)",
          opacity: animated ? 1 : 0,
          transition: "opacity 300ms ease",
        }}
        onClick={onClose}
      />

      {/* Panel bottom */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[70] flex flex-col"
        style={{
          backgroundColor: "var(--base-surface)",
          borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
          maxHeight: "85vh",
          transform: animated ? "translateY(0)" : "translateY(100%)",
          transition: "transform 300ms cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div
            className="rounded-full"
            style={{
              width: 32,
              height: 4,
              backgroundColor: "var(--base-outline)",
            }}
          />
        </div>

        {/* Header */}
        <div className="px-4 pt-2 pb-4 shrink-0">
          <h2
            className="text-headline-1"
            style={{ color: "var(--base-on-surface)" }}
          >
            {listes.length === 0 ? "Créer une liste de favoris" : "Sélectionner une liste de favoris"}
          </h2>
        </div>

        {/* Contenu scrollable */}
        <div className="overflow-y-auto px-4 pb-8">
          {listes.length === 0 ? (
            /* Variant vide — aucune liste existante */
            <div className="flex flex-col gap-4">
              <p className="text-body-1" style={{ color: "var(--base-on-surface)" }}>
                Retrouvez plus facilement vos favoris en les regroupant par thématique. Votre favoris y sera ajouté directement.
              </p>
              <button
                onClick={() => onCreerListe()}
                className="w-full flex items-center justify-center text-callout rounded-full"
                style={{ height: 44, backgroundColor: "var(--main-main)", color: "var(--main-on-main)" }}
              >
                Créer une nouvelle liste
              </button>
            </div>
          ) : (
            <>
              {/* Grille des listes existantes */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {listes.map((liste) => (
                  <ListeCard
                    key={liste.id}
                    id={liste.id}
                    nom={liste.nom}
                    images={liste.images}
                    onClick={() => {
                      onSelectListe(liste.id)
                      onClose()
                    }}
                  />
                ))}
              </div>

              {/* Divider */}
              <hr className="my-4" style={{ border: "none", borderTop: "1px solid var(--base-outline)" }} />

              {/* Sous-titre */}
              <p className="text-subhead mb-3" style={{ color: "var(--base-on-surface)" }}>
                Ou créez une nouvelle liste
              </p>

              {/* Bouton main filled */}
              <button
                onClick={() => onCreerListe()}
                className="w-full flex items-center justify-center text-callout rounded-full"
                style={{ height: 44, backgroundColor: "var(--main-main)", color: "var(--main-on-main)" }}
              >
                Créer une nouvelle liste
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}
