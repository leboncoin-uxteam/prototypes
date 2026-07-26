"use client"

import { useEffect, useRef, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Img as Image } from "@/components/Img"
import { useStore } from "@/lib/store"
import { FavAdCard } from "@/components/FavAdCard"
import { GestionListeBottomSheet } from "@/components/GestionListeBottomSheet"
import { AlertDialogSuppression } from "@/components/AlertDialogSuppression"

function ListeFavorisContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const listeId = searchParams.get("id") ?? ""

  const { listes, getFavorisAvecAnnonces, retirerFavori, supprimerListe } = useStore()

  const liste = listes.find((l) => l.id === listeId)
  const nom = liste?.nom ?? "Ma liste"
  const favoris = getFavorisAvecAnnonces(listeId)

  const [pendingDelete, setPendingDelete] = useState<Set<string>>(new Set())
  const pendingDeleteRef = useRef<Set<string>>(new Set())
  const [gestionOpen, setGestionOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)

  useEffect(() => {
    pendingDeleteRef.current = pendingDelete
  }, [pendingDelete])

  useEffect(() => {
    return () => {
      const toDelete = pendingDeleteRef.current
      if (toDelete.size === 0) return
      Array.from(toDelete).forEach((annonceId) => {
        retirerFavori(annonceId)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function handleSupprimerListe() {
    supprimerListe(listeId)
    router.push("/favoris")
  }

  const options = [
    { icon: "/images/tri.svg", label: "Trier", onClick: () => {} },
    { icon: "/images/broomstick.svg", label: "Organiser", onClick: () => {} },
    { icon: "/images/plus.svg", label: "Ajouter un favoris", onClick: () => router.push("/onboarding") },
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
          {nom}
        </h1>
        <button
          onClick={() => setGestionOpen(true)}
          className="flex items-center justify-center w-10 h-10 shrink-0"
          aria-label="Options de la liste"
        >
          <Image src="/images/3dots.svg" alt="" width={24} height={24} />
        </button>
      </div>

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

      <GestionListeBottomSheet
        isOpen={gestionOpen}
        onClose={() => setGestionOpen(false)}
        options={options}
      />
      <AlertDialogSuppression
        isOpen={alertOpen}
        nomListe={nom}
        onConfirm={handleSupprimerListe}
        onCancel={() => setAlertOpen(false)}
      />
    </main>
  )
}

export default function ListeFavorisPage() {
  return (
    <Suspense>
      <ListeFavorisContent />
    </Suspense>
  )
}
