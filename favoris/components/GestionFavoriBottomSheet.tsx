"use client"

import { useEffect, useState } from "react"
import { Img as Image } from "@/components/Img"

type ListeItem = {
  id: string
  nom: string
  images: string[]
}

type GestionFavoriBottomSheetProps = {
  isOpen: boolean
  onClose: () => void
  annonceId: string
  annonceTitre: string
  annonceImage: string
  listeActive: string | null
  listes: ListeItem[]
  onSupprimer: (annonceId: string) => void
  onDeplacerDansListe: (annonceId: string, listeId: string | null) => void
  onCreerNouvelleListeEtDeplacer: (annonceId: string) => void
}

export function GestionFavoriBottomSheet({
  isOpen,
  onClose,
  annonceId,
  annonceImage,
  listeActive,
  listes,
  onSupprimer,
  onDeplacerDansListe,
  onCreerNouvelleListeEtDeplacer,
}: GestionFavoriBottomSheetProps) {
  const [visible, setVisible] = useState(false)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [isOpen, onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      setVisible(true)
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

      {/* Panel */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[70] flex flex-col"
        style={{
          backgroundColor: "var(--base-surface)",
          borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
          transform: animated ? "translateY(0)" : "translateY(100%)",
          transition: "transform 300ms cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="rounded-full" style={{ width: 32, height: 4, backgroundColor: "var(--base-outline)" }} />
        </div>

        <div className="px-4 pb-8">
          {/* Ligne "Ajouté aux favoris" */}
          <div className="flex items-center gap-3 py-4">
            {/* Miniature annonce */}
            <div
              className="relative shrink-0 overflow-hidden"
              style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", backgroundColor: "var(--feedback-neutral-container)" }}
            >
              <Image src={annonceImage} alt="" fill className="object-cover" unoptimized />
            </div>

            {/* Texte */}
            <p className="text-body-1-hl flex-1" style={{ color: "var(--base-on-surface)" }}>
              Ajouté aux favoris
            </p>

            {/* Bouton supprimer — cœur toujours actif */}
            <button
              onClick={() => { onSupprimer(annonceId); onClose() }}
              className="flex items-center justify-center shrink-0"
              aria-label="Supprimer des favoris"
            >
              <Image src="/images/like.svg" alt="" width={24} height={24} />
            </button>
          </div>

          {/* Divider */}
          <hr style={{ border: "none", borderTop: "1px solid var(--base-outline)", margin: "0 0 8px" }} />

          {/* Titre Listes */}
          <p className="text-headline-1 pb-2 pt-4" style={{ color: "var(--base-on-surface)" }}>
            Listes
          </p>

          {/* Lignes de liste */}
          {listes.map((liste) => {
            const isActive = listeActive === liste.id
            return (
              <div key={liste.id} className="flex items-center gap-3 py-2">
                {/* Miniature liste */}
                <div
                  className="relative shrink-0 overflow-hidden"
                  style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", backgroundColor: "var(--feedback-neutral-container)" }}
                >
                  {liste.images[0] && (
                    <Image src={liste.images[0]} alt="" fill className="object-cover" unoptimized />
                  )}
                </div>

                {/* Nom */}
                <p className="text-body-1 flex-1" style={{ color: "var(--base-on-surface)" }}>
                  {liste.nom}
                </p>

                {/* Bouton cœur */}
                <button
                  onClick={() => {
                    if (isActive) {
                      // Retirer de la liste courante → favori général (listeId = null)
                      onDeplacerDansListe(annonceId, null as unknown as string)
                    } else {
                      onDeplacerDansListe(annonceId, liste.id)
                    }
                    onClose()
                  }}
                  className="flex items-center justify-center shrink-0"
                  aria-label={isActive ? `Retirer de ${liste.nom}` : `Déplacer dans ${liste.nom}`}
                >
                  <Image
                    src={isActive ? "/images/like.svg" : "/images/Heart.svg"}
                    alt=""
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            )
          })}

          {/* Ligne "Créer une nouvelle liste" */}
          <button
            onClick={() => { onCreerNouvelleListeEtDeplacer(annonceId); onClose() }}
            className="flex items-center gap-3 py-2 w-full text-left"
          >
            <div
              className="flex items-center justify-center shrink-0 rounded-full"
              style={{ width: 48, height: 48, backgroundColor: "var(--feedback-neutral-container)" }}
            >
              <Image src="/images/plus.svg" alt="" width={24} height={24} />
            </div>
            <p className="text-body-1" style={{ color: "var(--base-on-surface)" }}>
              Créer une nouvelle liste
            </p>
          </button>
        </div>
      </div>
    </>
  )
}
