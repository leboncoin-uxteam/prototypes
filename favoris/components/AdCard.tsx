"use client"

import { Img as Image } from "@/components/Img"

export type AdCardProps = {
  id: string
  categorie: "immobilier" | "voitures" | "ameublement"
  titre: string
  prix: number
  localisation: string
  image: string
  datePublication: string
  vendeur: string
  annee?: number | null
  kilometrage?: number | null
  energie?: string | null
  isFavori?: boolean
  onToggleFavori?: (annonceId: string, isFavori: boolean) => void
  onClick?: () => void
}

function formatPrix(prix: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(prix)
}

function formatKilometrage(km: number): string {
  return new Intl.NumberFormat("fr-FR").format(km) + " km"
}

function getCriteres(props: AdCardProps): string[] {
  const { categorie, titre, annee, kilometrage, energie } = props

  if (categorie === "immobilier") {
    return titre.split(" · ").filter(Boolean)
  }

  if (categorie === "voitures") {
    const criteres: string[] = []
    if (annee) criteres.push(String(annee))
    if (kilometrage) criteres.push(formatKilometrage(kilometrage))
    if (energie) criteres.push(energie)
    return criteres
  }

  return []
}


export function AdCard(props: AdCardProps) {
  const { id, categorie, titre, prix, localisation, image, isFavori = false, onToggleFavori, onClick } = props

  const isAmeublement = categorie === "ameublement"
  const criteres = getCriteres(props)
  const imageAspect = isAmeublement ? "aspect-[9/12]" : "aspect-[16/9]"

  function handleFavori(e: React.MouseEvent) {
    e.stopPropagation()
    onToggleFavori?.(id, isFavori)
  }

  return (
    <article onClick={onClick} className="flex flex-col cursor-pointer w-full">
      {/* Image + bouton favori */}
      <div
        className={`relative w-full overflow-hidden ${imageAspect}`}
        style={{
          borderRadius: "var(--radius-md)",
          backgroundColor: "var(--feedback-neutral-container)",
        }}
      >
        <Image
          src={image}
          alt={titre}
          fill
          className="object-cover"
          sizes={isAmeublement ? "50vw" : "100vw"}
          unoptimized
        />

        {/* Bouton favori */}
        <button
          onClick={handleFavori}
          aria-label={isFavori ? "Retirer des favoris" : "Ajouter aux favoris"}
          className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full"
          style={{ backgroundColor: "var(--base-surface)" }}
        >
          {isFavori ? (
            // like.svg plein — feedback/error
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.07332 2C2.98142 2 1.33301 3.86446 1.33301 6.10481C1.33301 7.94282 2.26551 9.26562 2.64778 9.77407C3.90591 11.4487 5.60104 12.5578 7.17067 13.5847C7.34049 13.6958 7.50883 13.8059 7.675 13.9157C7.84089 14.0253 8.05132 14.0282 8.21994 13.9233C8.36369 13.8339 8.50895 13.7442 8.6553 13.6538C10.2945 12.6414 12.0689 11.5456 13.3673 9.79637C13.7981 9.21686 14.6661 7.90429 14.6663 6.10317C14.6686 3.86427 13.0197 2 10.928 2C9.73487 2 8.68194 2.61097 8.0002 3.55003C7.3193 2.6108 6.26626 2 5.07332 2Z"
                fill="var(--feedback-error)"
              />
            </svg>
          ) : (
            // Icon.svg outline — base-on-surface
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8552 2C9.71078 2 8.69412 2.55135 7.99967 3.4045C7.30523 2.55135 6.28856 2 5.14412 2C3.00523 2 1.33301 3.89781 1.33301 6.16126C1.33301 8.00684 2.2719 9.33009 2.64967 9.83501C3.89412 11.4833 5.56634 12.5744 7.09412 13.5668H7.10523C7.2719 13.6829 7.43301 13.7873 7.59412 13.8918C7.81079 14.0311 8.07745 14.0369 8.29967 13.9034C8.43856 13.8164 8.58301 13.7293 8.7219 13.6422H8.73301C10.3275 12.6556 12.0775 11.5761 13.3663 9.85242C13.7941 9.27785 14.6663 7.96621 14.6663 6.16126C14.6663 3.89781 12.9941 2.0058 10.8552 2.0058V2ZM5.14412 3.4103C6.11634 3.4103 6.98301 4.04871 7.37745 5.00632C7.48301 5.26168 7.72745 5.42999 7.99412 5.42999C8.26079 5.42999 8.50523 5.26168 8.61079 5.00632C9.01079 4.04871 9.87745 3.4103 10.8497 3.4103C12.1775 3.4103 13.3163 4.60587 13.3108 6.16126C13.3108 7.49611 12.6608 8.49435 12.2941 8.98767C11.1775 10.4908 9.63856 11.4368 8.00523 12.4467L7.95523 12.4757L7.81634 12.3886C6.26079 11.373 4.78856 10.4096 3.69967 8.96445C3.36079 8.51757 2.6719 7.51352 2.6719 6.16706C2.6719 4.61167 3.80523 3.41611 5.13856 3.41611L5.14412 3.4103Z"
                fill="var(--base-on-surface)"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Section description */}
      <div className="flex flex-col gap-[2px] pt-2">
        <p
          className="text-body-1-hl truncate"
          style={{ color: "var(--base-on-surface)" }}
        >
          {titre}
        </p>

        {criteres.length > 0 && (
          <p
            className="text-body-2"
            style={{ color: "var(--dim-on-surface-dim-1-text)" }}
          >
            {criteres.join(" · ")}
          </p>
        )}

        <p
          className="text-body-1-hl"
          style={{ color: "var(--base-on-surface)" }}
        >
          {formatPrix(prix)}
        </p>

        <p
          className="text-caption"
          style={{ color: "var(--dim-on-surface-dim-1-text)" }}
        >
          {localisation}
        </p>
      </div>
    </article>
  )
}
