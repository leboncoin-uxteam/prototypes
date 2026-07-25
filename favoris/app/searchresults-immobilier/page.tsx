import { getAnnonces } from "@/lib/db/queries"
import { SearchResultsView } from "@/components/SearchResultsView"

export default function SearchResultsImmobilier() {
  const annonces = getAnnonces("immobilier")
  return (
    <SearchResultsView
      annonces={annonces}
      categorie="immobilier"
      backHref="/onboarding"
      defaultQuery=""
    />
  )
}
