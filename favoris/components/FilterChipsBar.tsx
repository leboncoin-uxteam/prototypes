"use client"

import { Img as Image } from "@/components/Img"

type FilterChipsBarProps = {
  categorie: "immobilier" | "voitures" | "ameublement"
  localisation: string
  rayon?: string
  filtres: string[]
  nombreFiltres: number
}

// Intent Basic — Enabled : fond transparent, bordure basic-container
// Intent Basic — Selected : fond basic-container, bordure basic
const CHIP_ENABLED = {
  border: "1px solid var(--basic-basic-container)",
  backgroundColor: "var(--base-surface)",
  color: "var(--basic-on-basic-container)",
}

const CHIP_SELECTED = {
  border: "1px solid var(--basic-basic)",
  backgroundColor: "var(--basic-basic-container)",
  color: "var(--basic-on-basic-container)",
}

const CHIP_SUPPORT = {
  border: "1px solid var(--support-support)",
  backgroundColor: "var(--base-surface)",
  color: "var(--basic-on-basic-container)",
}

type ChipProps = {
  selected?: boolean
  variant?: "basic" | "support"
  children: React.ReactNode
}

function Chip({ selected, variant = "basic", children }: ChipProps) {
  const style = variant === "support" ? CHIP_SUPPORT : selected ? CHIP_SELECTED : CHIP_ENABLED
  return (
    <div
      className="inline-flex items-center gap-1 px-3 shrink-0 rounded-full cursor-default select-none"
      style={{
        height: 32,
        fontSize: 14,
        fontWeight: 400,
        lineHeight: "20px",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function ChipIcon({ src }: { src: string }) {
  return <Image src={src} alt="" width={16} height={16} style={{ flexShrink: 0 }} />
}

function Badge({ count }: { count: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full shrink-0"
      style={{
        width: 18,
        height: 18,
        backgroundColor: "var(--basic-basic)",
        color: "var(--basic-on-basic)",
        fontSize: 10,
        fontWeight: 700,
        lineHeight: "14px",
      }}
    >
      {count}
    </span>
  )
}

export function FilterChipsBar({
  categorie,
  localisation,
  rayon,
  filtres,
  nombreFiltres,
}: FilterChipsBarProps) {
  const localisationText = rayon ? `${localisation} - ${rayon}` : localisation

  return (
    <div
      className="flex gap-2 overflow-x-auto px-4 py-2"
      style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
    >
      {/* Chip Carte — immobilier uniquement */}
      {categorie === "immobilier" && (
        <Chip variant="support">
          <ChipIcon src="/images/PaperMap.svg" />
          <span>Carte</span>
        </Chip>
      )}

      {/* Chip Filtres */}
      <Chip selected={nombreFiltres > 0}>
        <ChipIcon src="/images/Filter.svg" />
        <span>Filtres</span>
        {nombreFiltres > 0 && <Badge count={nombreFiltres} />}
      </Chip>

      {/* Chip Localisation */}
      <Chip selected={true}>
        <ChipIcon src="/images/Pin.svg" />
        <span
          style={{
            maxWidth: 178,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {localisationText}
        </span>
      </Chip>

      {/* Chips filtres actifs */}
      {filtres.map((filtre) => (
        <Chip key={filtre} selected={true}>
          <span>{filtre}</span>
          <ChipIcon src="/images/delete.svg" />
        </Chip>
      ))}

      {/* Chip Tri */}
      <Chip variant="support">
        <span>Tri : Pertinence</span>
      </Chip>
    </div>
  )
}
