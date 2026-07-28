"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Img as Image } from "@/components/Img"
import { useStore } from "@/lib/store"
import { FavAdCard } from "@/components/FavAdCard"
import { ActionBar } from "@/components/ActionBar"
import { FavoriBottomSheet } from "@/components/FavoriBottomSheet"
import { CreateListeBottomSheet } from "@/components/CreateListeBottomSheet"
import { GestionFavoriBottomSheet } from "@/components/GestionFavoriBottomSheet"
import { Snackbar } from "@/components/Snackbar"

export default function TousLesFavorisPage() {
  const router = useRouter()
  const { getFavorisAvecAnnonces, retirerFavori, deplacerFavoris, creerListe, getListesAvecImages } = useStore()

  const favoris = getFavorisAvecAnnonces(undefined)

  // Mode sélection
  const [selectionMode, setSelectionMode] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [deplacerOpen, setDeplacerOpen] = useState(false)
  const [creerListeOpen, setCreerListeOpen] = useState(false)
  const [gestionFavoriOpen, setGestionFavoriOpen] = useState(false)
  const [annonceSelectionnee, setAnnonceSelectionnee] = useState<string | null>(null)
  // Snackbars
  const [snackDeplacement, setSnackDeplacement] = useState(false)
  const [snackNomListe, setSnackNomListe] = useState("")
  const [snackSuppression, setSnackSuppression] = useState(false)
  const [favoriSupprimeId, setFavoriSupprimeId] = useState<string | null>(null)
  const suppressionConfirmeeRef = useRef(false)
  // IDs masqués visuellement en attente de confirmation de suppression
  const [masquesIds, setMasquesIds] = useState<Set<string>>(new Set())

  // Suppression différée (mode default)
  const [pendingDelete, setPendingDelete] = useState<Set<string>>(new Set())
  const pendingDeleteRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    pendingDeleteRef.current = pendingDelete
  }, [pendingDelete])

  useEffect(() => {
    return () => {
      const toDelete = pendingDeleteRef.current
      if (toDelete.size === 0) return
      Array.from(toDelete).forEach((annonceId) => retirerFavori(annonceId))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleToggle(annonceId: string) {
    setPendingDelete((prev) => {
      const next = new Set(prev)
      next.has(annonceId) ? next.delete(annonceId) : next.add(annonceId)
      return next
    })
  }

  function handleToggleSelection(annonceId: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      next.has(annonceId) ? next.delete(annonceId) : next.add(annonceId)
      return next
    })
  }

  function activerSelection() {
    setSelectionMode(true)
    setSelectedIds(new Set())
  }

  function quitterSelection() {
    setSelectionMode(false)
    setSelectedIds(new Set())
  }

  function handleSelectListe(listeId: string) {
    deplacerFavoris(Array.from(selectedIds), listeId)
    quitterSelection()
    setDeplacerOpen(false)
  }

  const listesDisponibles = getListesAvecImages().filter((l) => l.id !== "__tous__")

  return (
    <main className="flex flex-col min-h-screen pb-[88px]">
      {/* Header */}
      <div
        className="flex items-center gap-2 px-4 h-14 sticky top-0 z-10"
        style={{ backgroundColor: "var(--base-surface)" }}
      >
        {selectionMode ? (
          <>
            <button
              onClick={quitterSelection}
              className="flex items-center justify-center w-10 h-10"
              aria-label="Annuler"
            >
              <Image src="/images/Arrow.svg" alt="" width={24} height={24} />
            </button>
            <p className="text-headline-2 flex-1 text-center" style={{ color: "var(--base-on-surface)" }}>
              {selectedIds.size} sélectionné{selectedIds.size > 1 ? "s" : ""}
            </p>
            <div className="w-10 h-10" />
          </>
        ) : (
          <>
            <button
              onClick={() => router.push("/favoris")}
              className="flex items-center justify-center w-10 h-10"
              aria-label="Retour"
            >
              <Image src="/images/Arrow.svg" alt="" width={24} height={24} />
            </button>
            <h1 className="text-headline-2 flex-1 text-center" style={{ color: "var(--base-on-surface)" }}>
              Tous les favoris
            </h1>
            <div className="w-10 h-10" />
          </>
        )}
      </div>

      {/* Liste */}
      <div className="flex flex-col px-4 pt-2 gap-4">
        {favoris.length === 0 ? (
          <p className="text-body-2 mt-8 text-center" style={{ color: "var(--dim-on-surface-dim-1-text)" }}>
            Aucun favori pour l&apos;instant
          </p>
        ) : (
          favoris.filter((fav) => !masquesIds.has(fav.annonceId)).map((fav) => (
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
              onFavoriPress={(id) => { setAnnonceSelectionnee(id); setGestionFavoriOpen(true) }}
              mode={selectionMode ? "selection" : "default"}
              isSelected={selectedIds.has(fav.annonceId)}
              onToggleSelection={handleToggleSelection}
            />
          ))
        )}
      </div>

      {/* ActionBar */}
      {selectionMode ? (
        <ActionBar
          alwaysVisible
          actions={[
            {
              icon: "/images/RedoArrow.svg",
              label: "Déplacer",
              onClick: () => selectedIds.size > 0 && setDeplacerOpen(true),
            },
          ]}
        />
      ) : (
        <ActionBar
          actions={[
            { icon: "/images/tri.svg", label: "Trier", onClick: () => {} },
            { icon: "/images/broomstick.svg", label: "Organiser", onClick: activerSelection },
            { icon: "/images/plus.svg", label: "Ajouter", onClick: () => router.push("/onboarding") },
          ]}
        />
      )}

      {/* GestionFavoriBottomSheet */}
      {annonceSelectionnee && (() => {
        const fav = favoris.find((f) => f.annonceId === annonceSelectionnee)
        return (
          <GestionFavoriBottomSheet
            isOpen={gestionFavoriOpen}
            onClose={() => setGestionFavoriOpen(false)}
            annonceId={annonceSelectionnee}
            annonceTitre={fav?.annonce.titre ?? ""}
            annonceImage={fav?.annonce.image ?? ""}
            listeActive={fav?.listeId ?? null}
            listes={getListesAvecImages().filter((l) => l.id !== "__tous__")}
            onSupprimer={(id) => {
              setFavoriSupprimeId(id)
              suppressionConfirmeeRef.current = false
              setGestionFavoriOpen(false)
              // Masquer immédiatement la carte
              setMasquesIds((prev) => new Set(Array.from(prev).concat(id)))
              setSnackSuppression(true)
            }}
            onDeplacerDansListe={(id, listeId) => {
              deplacerFavoris([id], listeId)
              setGestionFavoriOpen(false)
              const liste = getListesAvecImages().find((l) => l.id === listeId)
              setSnackNomListe(listeId === null ? "Tous les favoris" : (liste?.nom ?? "la liste"))
              setSnackDeplacement(true)
            }}
            onCreerNouvelleListeEtDeplacer={(id) => {
              setAnnonceSelectionnee(id)
              setGestionFavoriOpen(false)
              setTimeout(() => setCreerListeOpen(true), 320)
            }}
          />
        )
      })()}

      <FavoriBottomSheet
        isOpen={deplacerOpen}
        onClose={() => setDeplacerOpen(false)}
        annonceId=""
        listes={listesDisponibles}
        onSelectListe={handleSelectListe}
        onCreerListe={() => {
          setDeplacerOpen(false)
          setTimeout(() => setCreerListeOpen(true), 320)
        }}
      />
      <CreateListeBottomSheet
        isOpen={creerListeOpen}
        onClose={() => setCreerListeOpen(false)}
        onCreer={(nom) => {
          const nouvelleListe = creerListe(nom)
          if (annonceSelectionnee) {
            // Venu de GestionFavoriBottomSheet → déplacer l'annonce ciblée
            deplacerFavoris([annonceSelectionnee], nouvelleListe.id)
            setAnnonceSelectionnee(null)
            setSnackNomListe(nouvelleListe.nom)
            setSnackDeplacement(true)
          } else {
            // Venu du mode sélection → déplacer les ids sélectionnés
            deplacerFavoris(Array.from(selectedIds), nouvelleListe.id)
            quitterSelection()
          }
          setCreerListeOpen(false)
        }}
      />

      <Snackbar
        variant="deplacement"
        isOpen={snackDeplacement}
        nomListe={snackNomListe}
        onClose={() => setSnackDeplacement(false)}
        bottomOffset={100}
      />
      <Snackbar
        variant="suppression"
        isOpen={snackSuppression}
        bottomOffset={100}
        onClose={() => {
          if (favoriSupprimeId && !suppressionConfirmeeRef.current) {
            retirerFavori(favoriSupprimeId)
          }
          setMasquesIds((prev) => { const next = new Set(prev); next.delete(favoriSupprimeId ?? ""); return next })
          setFavoriSupprimeId(null)
          setSnackSuppression(false)
        }}
        onAnnuler={() => {
          // Restaurer la carte
          suppressionConfirmeeRef.current = true
          setMasquesIds((prev) => { const next = new Set(prev); next.delete(favoriSupprimeId ?? ""); return next })
          setFavoriSupprimeId(null)
          setSnackSuppression(false)
        }}
      />
    </main>
  )
}
