"use client"

import Image from "next/image"

export type FavAdCardProps = {
  id: string
  titre: string
  prix: number
  localisation: string
  categorie: "immobilier" | "voitures" | "ameublement"
  image: string
  isFavori: boolean
  dateAjout?: string
  onToggleFavori: (id: string) => void
}

function formatDateAjout(dateAjout: string): string {
  const date = new Date(dateAjout)
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date)
}

const CATEGORIE_LABEL: Record<FavAdCardProps["categorie"], string> = {
  immobilier: "Ventes immobilières",
  voitures: "Voitures",
  ameublement: "Ameublement",
}

function formatPrix(prix: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(prix)
}

export function FavAdCard({
  id,
  titre,
  prix,
  localisation,
  categorie,
  image,
  isFavori,
  dateAjout,
  onToggleFavori,
}: FavAdCardProps) {
  return (
    <article
      className="flex flex-row gap-2 pb-4"
      style={{ borderBottom: "1px solid rgba(98, 124, 147, 0.16)" }}
    >
      {/* Image carrée + bouton favori */}
      <div
        className="relative shrink-0"
        style={{
          width: 140,
          height: 140,
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
          backgroundColor: "var(--feedback-neutral-container)",
        }}
      >
        <Image
          src={image}
          alt={titre}
          fill
          className="object-cover"
          unoptimized
        />

        {/* Bouton favori */}
        <button
          onClick={() => onToggleFavori(id)}
          aria-label={isFavori ? "Retirer des favoris" : "Ajouter aux favoris"}
          className="absolute top-2 right-2 flex items-center justify-center rounded-full"
          style={{
            width: 32,
            height: 32,
            backgroundColor: "var(--base-surface)",
          }}
        >
          {isFavori ? (
            <Image src="/images/like.svg" alt="" width={16} height={16} />
          ) : (
            <Image src="/images/Heart.svg" alt="" width={16} height={16} />
          )}
        </button>
      </div>

      {/* Section description */}
      <div className="flex flex-col flex-1 min-w-0 justify-between">
        <div className="flex flex-col gap-[2px]">
          {/* Titre */}
          <p
            className="text-body-1-hl truncate"
            style={{ color: "var(--base-on-surface)" }}
          >
            {titre}
          </p>

          {/* Prix */}
          <p
            className="text-body-2-hl"
            style={{ color: "var(--base-on-surface)" }}
          >
            {formatPrix(prix)}
          </p>

          {/* Catégorie · Localisation */}
          <p
            className="text-caption truncate"
            style={{ color: "var(--feedback-neutral)" }}
          >
            {CATEGORIE_LABEL[categorie]} · {localisation}
          </p>

          {/* Date d'ajout aux favoris */}
          {dateAjout && (
            <p
              className="text-caption"
              style={{ color: "var(--dim-on-surface-dim-1-text)" }}
            >
              Ajouté le {formatDateAjout(dateAjout)}
            </p>
          )}

        </div>

        {/* Actions — alignées à droite en bas */}
        <div className="flex justify-end gap-0">
          <button
            aria-label="Contacter"
            style={{ width: 32, height: 32, pointerEvents: "none", cursor: "default" }}
            className="flex items-center justify-center"
          >
            <Image src="/images/BubbleText.svg" alt="" width={24} height={24} />
          </button>
          <button
            aria-label="Partager"
            style={{ width: 32, height: 32, pointerEvents: "none", cursor: "default" }}
            className="flex items-center justify-center"
          >
            <Image src="/images/partage.svg" alt="" width={24} height={24} />
          </button>
        </div>
      </div>
    </article>
  )
}
