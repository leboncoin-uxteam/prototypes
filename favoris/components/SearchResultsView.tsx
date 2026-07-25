"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SearchBar } from "@/components/SearchBar"
import { SearchResultsList } from "@/components/SearchResultsList"
import { FavoriBottomSheet } from "@/components/FavoriBottomSheet"
import { CreateListeBottomSheet } from "@/components/CreateListeBottomSheet"
import { Snackbar } from "@/components/Snackbar"
import { FilterChipsBar } from "@/components/FilterChipsBar"
import { Annonce } from "@/lib/db/schema"

type ListeAvecImages = {
  id: string
  nom: string
  images: string[]
}

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
  const [query, setQuery] = useState(defaultQuery)
  const [favorisIds, setFavorisIds] = useState<Set<string>>(new Set())
  const [listes, setListes] = useState<ListeAvecImages[]>([])
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false)
  const [createListeOpen, setCreateListeOpen] = useState(false)
  const [annonceEnCours, setAnnonceEnCours] = useState<string | null>(null)
  const [titreAnnonceEnCours, setTitreAnnonceEnCours] = useState("")
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarListe, setSnackbarListe] = useState("")

  // Charger les favoris existants et les listes au montage
  useEffect(() => {
    fetch("/api/favoris")
      .then((r) => r.json())
      .then((data: { annonceId: string }[]) => {
        setFavorisIds(new Set(data.map((f) => f.annonceId)))
      })

    fetch("/api/favoris/listes")
      .then((r) => r.json())
      .then((data: ListeAvecImages[]) => {
        // Exclure la liste virtuelle "Tous les favoris"
        setListes(data.filter((l) => l.id !== "__tous__"))
      })
  }, [])

  function handleToggleFavori(annonceId: string, isFavori: boolean) {
    if (isFavori) {
      fetch("/api/favoris", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ annonceId }),
      })
      setFavorisIds((prev) => {
        const next = new Set(prev)
        next.delete(annonceId)
        return next
      })
    } else {
      const annonce = annonces.find((a) => a.id === annonceId)
      setAnnonceEnCours(annonceId)
      setTitreAnnonceEnCours(annonce?.titre ?? "")
      setBottomSheetOpen(true)
    }
  }

  async function handleSelectListe(listeId: string) {
    if (!annonceEnCours) return
    await fetch("/api/favoris", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ annonceId: annonceEnCours, listeId }),
    })
    setFavorisIds((prev) => new Set([...prev, annonceEnCours]))
    const liste = listes.find((l) => l.id === listeId)
    setSnackbarListe(liste?.nom ?? "la liste")
    setSnackbarOpen(true)
    setAnnonceEnCours(null)
  }

  function handleCreerListe() {
    // Ouvrir la deuxième bottom sheet
    setBottomSheetOpen(false)
    setTimeout(() => setCreateListeOpen(true), 320)
  }

  async function handleConfirmerCreationListe(nomListe: string) {
    if (!annonceEnCours) return

    // 1. Créer la liste
    const resList = await fetch("/api/listes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom: nomListe }),
    })
    const nouvelleListe = await resList.json()

    // 2. Ajouter le favori dans cette nouvelle liste
    await fetch("/api/favoris", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ annonceId: annonceEnCours, listeId: nouvelleListe.id }),
    })

    setFavorisIds((prev) => new Set([...prev, annonceEnCours]))

    // 3. Mettre à jour la liste des listes
    const resListes = await fetch("/api/favoris/listes")
    const data = await resListes.json()
    setListes(data.filter((l: ListeAvecImages) => l.id !== "__tous__"))

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
        listes={listes}
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
