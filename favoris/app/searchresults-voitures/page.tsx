import { getAnnonces } from "@/lib/db/queries"
import { SearchResultsView } from "@/components/SearchResultsView"

export default function SearchResultsVoitures() {
  const annonces = getAnnonces("voitures")
  return (
    <SearchResultsView
      annonces={annonces}
      categorie="voitures"
      backHref="/onboarding"
      defaultQuery=""
    />
  )
}
