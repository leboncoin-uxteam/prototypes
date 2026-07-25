import { getAnnonces } from "@/lib/db/queries"
import { SearchResultsView } from "@/components/SearchResultsView"

export default function SearchResultsAmeublement() {
  const annonces = getAnnonces("ameublement")
  return (
    <SearchResultsView
      annonces={annonces}
      categorie="ameublement"
      backHref="/onboarding"
      defaultQuery="buffet bois"
    />
  )
}
