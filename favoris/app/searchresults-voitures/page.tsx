"use client"

import { useStore } from "@/lib/store"
import { SearchResultsView } from "@/components/SearchResultsView"

export default function SearchResultsVoitures() {
  const { annonces } = useStore()
  const annoncesVoitures = annonces.filter((a) => a.categorie === "voitures")

  return (
    <SearchResultsView
      annonces={annoncesVoitures}
      categorie="voitures"
      backHref="/onboarding"
      defaultQuery=""
    />
  )
}
