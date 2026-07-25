"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { FavAdCard } from "@/components/FavAdCard"

type FavoriAvecAnnonce = {
  id: string
  annonceId: string
  listeId: string | null
  dateAjout: string
  annonce: {
    id: string
    titre: string
    prix: number
    localisation: string
    categorie: "immobilier" | "voitures" | "ameublement"
    image: string
  }
}

export default function TousLesFavorisPage() {
  const router = useRouter()
  const [favoris, setFavoris] = useState<FavoriAvecAnnonce[]>([])
  const [pendingDelete, setPendingDelete] = useState<Set<string>>(new Set())
  const pendingDeleteRef = useRef<Set<string>>(new Set())

  // Synchroniser la ref avec le state
  useEffect(() => {
    pendingDeleteRef.current = pendingDelete
  }, [pendingDelete])

  // Suppression effective au démontage
  useEffect(() => {
    return () => {
      const toDelete = pendingDeleteRef.current
      if (toDelete.size === 0) return
      for (const annonceId of toDelete) {
        fetch("/api/favoris", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ annonceId }),
        })
      }
    }
  }, [])

  useEffect(() => {
    fetch("/api/favoris")
      .then((r) => r.json())
      .then((data: FavoriAvecAnnonce[]) => setFavoris(data))
  }, [])

  function handleToggle(annonceId: string) {
    setPendingDelete((prev) => {
      const next = new Set(prev)
      if (next.has(annonceId)) {
        next.delete(annonceId)
      } else {
        next.add(annonceId)
      }
      return next
    })
  }

  return (
    <main className="flex flex-col min-h-screen">
      {/* Header */}
      <div
        className="flex items-center gap-2 px-4 h-14 sticky top-0 z-10"
        style={{ backgroundColor: "var(--base-surface)" }}
      >
        <button
          onClick={() => router.push("/favoris")}
          className="flex items-center justify-center w-10 h-10"
          aria-label="Retour"
        >
          <img src="/images/Arrow.svg" alt="" width={24} height={24} />
        </button>
        <h1 className="text-headline-2 flex-1 text-center" style={{ color: "var(--base-on-surface)" }}>
          Tous les favoris
        </h1>
      </div>

      {/* Liste */}
      <div className="flex flex-col px-4 pt-2 gap-4">
        {favoris.length === 0 ? (
          <p className="text-body-2 mt-8 text-center" style={{ color: "var(--dim-on-surface-dim-1-text)" }}>
            Aucun favori pour l'instant
          </p>
        ) : (
          favoris.map((fav) => (
            <FavAdCard
              key={fav.id}
              id={fav.annonceId}
              titre={fav.annonce.titre}
              prix={fav.annonce.prix}
              localisation={fav.annonce.localisation}
              categorie={fav.annonce.categorie}
              image={fav.annonce.image}
              isFavori={!pendingDelete.has(fav.annonceId)}
              dateAjout={fav.dateAjout}
              onToggleFavori={handleToggle}
            />
          ))
        )}
      </div>
    </main>
  )
}
