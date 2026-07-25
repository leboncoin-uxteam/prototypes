"use client"

import { useStore } from "@/lib/store"
import { SearchResultsView } from "@/components/SearchResultsView"

export default function SearchResultsAmeublement() {
  const { annonces } = useStore()
  const annoncesAmeublement = annonces.filter((a) => a.categorie === "ameublement")

  return (
    <SearchResultsView
      annonces={annoncesAmeublement}
      categorie="ameublement"
      backHref="/onboarding"
      defaultQuery="buffet bois"
    />
  )
}
