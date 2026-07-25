"use client"

import { useEffect, useRef, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { FavAdCard } from "@/components/FavAdCard"
import { GestionListeBottomSheet } from "@/components/GestionListeBottomSheet"
import { AlertDialogSuppression } from "@/components/AlertDialogSuppression"

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

export default function ListeFavorisPage() {
  const router = useRouter()
  const params = useParams()
  const listeId = params.id as string

  const [nom, setNom] = useState("")
  const [favoris, setFavoris] = useState<FavoriAvecAnnonce[]>([])
  const [pendingDelete, setPendingDelete] = useState<Set<string>>(new Set())
  const pendingDeleteRef = useRef<Set<string>>(new Set())
  const [gestionOpen, setGestionOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)

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
    fetch("/api/listes")
      .then((r) => r.json())
      .then((listes: { id: string; nom: string }[]) => {
        const liste = listes.find((l) => l.id === listeId)
        if (liste) setNom(liste.nom)
      })

    fetch(`/api/favoris?listeId=${listeId}`)
      .then((r) => r.json())
      .then((data: FavoriAvecAnnonce[]) => setFavoris(data))
  }, [listeId])

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

  async function handleSupprimerListe() {
    await fetch(`/api/listes/${listeId}`, { method: "DELETE" })
    router.push("/favoris")
  }

  const options = [
    {
      icon: "/images/tri.svg",
      label: "Trier",
      onClick: () => {},
    },
    {
      icon: "/images/broomstick.svg",
      label: "Organiser",
      onClick: () => {},
    },
    {
      icon: "/images/plus.svg",
      label: "Ajouter un favoris",
      onClick: () => router.push("/onboarding"),
    },
    {
      icon: "/images/trash.svg",
      label: "Supprimer la liste",
      danger: true,
      onClick: () => {
        setGestionOpen(false)
        setTimeout(() => setAlertOpen(true), 320)
      },
    },
  ]

  return (
    <main className="flex flex-col min-h-screen">
      {/* Header */}
      <div
        className="flex items-center px-2 h-14 sticky top-0 z-10"
        style={{ backgroundColor: "var(--base-surface)" }}
      >
        <button
          onClick={() => router.push("/favoris")}
          className="flex items-center justify-center w-10 h-10 shrink-0"
          aria-label="Retour"
        >
          <Image src="/images/Arrow.svg" alt="" width={24} height={24} />
        </button>

        <h1 className="text-headline-2 truncate flex-1 text-center" style={{ color: "var(--base-on-surface)" }}>
          {nom || "Ma liste"}
        </h1>

        {/* Bouton 3 points */}
        <button
          onClick={() => setGestionOpen(true)}
          className="flex items-center justify-center w-10 h-10 shrink-0"
          aria-label="Options de la liste"
        >
          <Image src="/images/3dots.svg" alt="" width={24} height={24} />
        </button>
      </div>

      {/* Liste */}
      <div className="flex flex-col px-4 pt-2 gap-4">
        {favoris.length === 0 ? (
          <p className="text-body-2 mt-8 text-center" style={{ color: "var(--dim-on-surface-dim-1-text)" }}>
            Aucun favori dans cette liste
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

      {/* Bottom sheet gestion */}
      <GestionListeBottomSheet
        isOpen={gestionOpen}
        onClose={() => setGestionOpen(false)}
        options={options}
      />

      {/* Alert dialog suppression */}
      <AlertDialogSuppression
        isOpen={alertOpen}
        nomListe={nom}
        onConfirm={handleSupprimerListe}
        onCancel={() => setAlertOpen(false)}
      />
    </main>
  )
}
