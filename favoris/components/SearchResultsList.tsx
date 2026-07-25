"use client"

import { AdCard, AdCardProps } from "@/components/AdCard"
import { Annonce } from "@/lib/store"

type Props = {
  annonces: Annonce[]
  categorie: "immobilier" | "voitures" | "ameublement"
  favorisIds: Set<string>
  onToggleFavori: (annonceId: string, isFavori: boolean) => void
}

export function SearchResultsList({ annonces, categorie, favorisIds, onToggleFavori }: Props) {
  const isAmeublement = categorie === "ameublement"

  return (
    <div
      className={
        isAmeublement
          ? "grid grid-cols-2 gap-x-4 gap-y-6"
          : "flex flex-col gap-6"
      }
    >
      {annonces.map((annonce) => {
        const props: AdCardProps = {
          id: annonce.id,
          categorie: annonce.categorie,
          titre: annonce.titre,
          prix: annonce.prix,
          localisation: annonce.localisation,
          image: annonce.image,
          datePublication: annonce.datePublication,
          vendeur: annonce.vendeur,
          annee: annonce.annee ?? undefined,
          kilometrage: annonce.kilometrage ?? undefined,
          energie: annonce.energie ?? undefined,
          isFavori: favorisIds.has(annonce.id),
          onToggleFavori,
        }
        return <AdCard key={annonce.id} {...props} />
      })}
    </div>
  )
}
