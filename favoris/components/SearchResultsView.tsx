"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useStore, type Annonce } from "@/lib/store"
import { SearchBar } from "@/components/SearchBar"
import { SearchResultsList } from "@/components/SearchResultsList"
import { FavoriBottomSheet } from "@/components/FavoriBottomSheet"
import { CreateListeBottomSheet } from "@/components/CreateListeBottomSheet"
import { Snackbar } from "@/components/Snackbar"
import { FilterChipsBar } from "@/components/FilterChipsBar"

const FILTER_CONFIG: Record<
  "immobilier" | "voitures" | "ameublement",
  { localisation: string; rayon?: string; filtres: string[]; nombreFiltres: number }
> = {
  immobilier: {
    localisation: "Périgueux (24000)",
    filtres: ["Ventes immobilières", "Max. 400 000 €", "Min. 3 chambres"],
    nombreFiltres: 3,
  },
  voitures: {
    localisation: "Périgueux (24000)",
    rayon: "50 km",
    filtres: ["Voitures", "Renault", "Clio", "Max. 10 000 €", "Manuelle"],
    nombreFiltres: 5,
  },
  ameublement: {
    localisation: "Périgueux (24000)",
    rayon: "5 km",
    filtres: ["Ameublement"],
    nombreFiltres: 1,
  },
}

type Props = {
  annonces: Annonce[]
  categorie: "immobilier" | "voitures" | "ameublement"
  backHref: string
  defaultQuery?: string
}

export function SearchResultsView({ annonces, categorie, backHref, defaultQuery = "" }: Props) {
  const router = useRouter()
  const { listes, estEnFavori, ajouterFavori, retirerFavori, creerListe, getListesAvecImages } = useStore()

  const [query, setQuery] = useState(defaultQuery)
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false)
  const [createListeOpen, setCreateListeOpen] = useState(false)
  const [annonceEnCours, setAnnonceEnCours] = useState<string | null>(null)
  const [titreAnnonceEnCours, setTitreAnnonceEnCours] = useState("")
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarListe, setSnackbarListe] = useState("")

  // Dériver les IDs favoris directement depuis le store
  const favorisIds = new Set(annonces.filter((a) => estEnFavori(a.id)).map((a) => a.id))

  // Listes réelles uniquement (sans la liste virtuelle "Tous les favoris")
  const listesReelles = listes.map((l) => {
    const avecImages = getListesAvecImages().find((li) => li.id === l.id)
    return {
      id: l.id,
      nom: l.nom,
      images: avecImages?.images ?? [],
    }
  })

  function handleToggleFavori(annonceId: string, isFavori: boolean) {
    if (isFavori) {
      retirerFavori(annonceId)
    } else {
      const annonce = annonces.find((a) => a.id === annonceId)
      setAnnonceEnCours(annonceId)
      setTitreAnnonceEnCours(annonce?.titre ?? "")
      setBottomSheetOpen(true)
    }
  }

  function handleSelectListe(listeId: string) {
    if (!annonceEnCours) return
    ajouterFavori(annonceEnCours, listeId)
    const liste = listesReelles.find((l) => l.id === listeId)
    setSnackbarListe(liste?.nom ?? "la liste")
    setSnackbarOpen(true)
    setAnnonceEnCours(null)
  }

  function handleCreerListe() {
    setBottomSheetOpen(false)
    setTimeout(() => setCreateListeOpen(true), 320)
  }

  function handleConfirmerCreationListe(nomListe: string) {
    if (!annonceEnCours) return

    const nouvelleListe = creerListe(nomListe)
    ajouterFavori(annonceEnCours, nouvelleListe.id)

    setSnackbarListe(nomListe)
    setSnackbarOpen(true)
    setAnnonceEnCours(null)
    setCreateListeOpen(false)
  }

  return (
    <main className="flex flex-col min-h-screen pb-[64px]">
      <div
        className="px-4 sticky top-0 z-10"
        style={{ backgroundColor: "var(--base-surface)" }}
      >
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Rechercher sur leboncoin"
          onBack={() => router.push(backHref)}
        />
      </div>
      <FilterChipsBar
        categorie={categorie}
        localisation={FILTER_CONFIG[categorie].localisation}
        rayon={FILTER_CONFIG[categorie].rayon}
        filtres={FILTER_CONFIG[categorie].filtres}
        nombreFiltres={FILTER_CONFIG[categorie].nombreFiltres}
      />

      <div className="px-4 py-4">
        <SearchResultsList
          annonces={annonces}
          categorie={categorie}
          favorisIds={favorisIds}
          onToggleFavori={handleToggleFavori}
        />
      </div>

      <FavoriBottomSheet
        isOpen={bottomSheetOpen}
        onClose={() => {
          setBottomSheetOpen(false)
          setAnnonceEnCours(null)
        }}
        annonceId={annonceEnCours ?? ""}
        listes={listesReelles}
        onSelectListe={handleSelectListe}
        onCreerListe={handleCreerListe}
      />

      <CreateListeBottomSheet
        isOpen={createListeOpen}
        onClose={() => {
          setCreateListeOpen(false)
          setAnnonceEnCours(null)
        }}
        defaultTitre={titreAnnonceEnCours}
        onCreer={handleConfirmerCreationListe}
      />

      <Snackbar
        isOpen={snackbarOpen}
        nomListe={snackbarListe}
        onClose={() => setSnackbarOpen(false)}
      />
    </main>
  )
}
