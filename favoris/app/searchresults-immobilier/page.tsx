"use client"

import { useStore } from "@/lib/store"
import { SearchResultsView } from "@/components/SearchResultsView"

export default function SearchResultsImmobilier() {
  const { annonces } = useStore()
  const annoncesImmobilier = annonces.filter((a) => a.categorie === "immobilier")

  return (
    <SearchResultsView
      annonces={annoncesImmobilier}
      categorie="immobilier"
      backHref="/onboarding"
      defaultQuery=""
    />
  )
}
