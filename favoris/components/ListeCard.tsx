"use client"

import Image from "next/image"

export type ListeCardProps = {
  id: string
  nom: string
  images: string[]
  onClick?: () => void
}

const R = "var(--radius-md)" // 8px

function ImageBloc({ images }: { images: string[] }) {
  const count = Math.min(images.length, 4)

  // État 0 — liste vide
  if (count === 0) {
    return (
      <div
        className="w-full aspect-square"
        style={{
          backgroundColor: "var(--feedback-neutral-container)",
          borderRadius: R,
        }}
      />
    )
  }

  // État 1 — 1 image
  if (count === 1) {
    return (
      <div
        className="relative w-full aspect-square overflow-hidden"
        style={{ borderRadius: R }}
      >
        <Image src={images[0]} alt="" fill className="object-cover" unoptimized />
      </div>
    )
  }

  // État 2 — 2 images côte à côte
  if (count === 2) {
    return (
      <div className="w-full aspect-square flex gap-[4px]">
        <div className="relative flex-1 h-full overflow-hidden" style={{ borderRadius: "8px 0 0 8px" }}>
          <Image src={images[0]} alt="" fill className="object-cover" unoptimized />
        </div>
        <div className="relative flex-1 h-full overflow-hidden" style={{ borderRadius: "0 8px 8px 0" }}>
          <Image src={images[1]} alt="" fill className="object-cover" unoptimized />
        </div>
      </div>
    )
  }

  // État 3 — 3 images : 1 gauche + 2 droite
  if (count === 3) {
    return (
      <div className="w-full aspect-square flex gap-[4px]">
        {/* Colonne gauche */}
        <div className="relative flex-1 h-full overflow-hidden" style={{ borderRadius: "8px 0 0 8px" }}>
          <Image src={images[0]} alt="" fill className="object-cover" unoptimized />
        </div>
        {/* Colonne droite */}
        <div className="flex-1 flex flex-col gap-[4px]">
          <div className="relative flex-1 overflow-hidden" style={{ borderRadius: "0 8px 0 0" }}>
            <Image src={images[1]} alt="" fill className="object-cover" unoptimized />
          </div>
          <div className="relative flex-1 overflow-hidden" style={{ borderRadius: "0 0 8px 0" }}>
            <Image src={images[2]} alt="" fill className="object-cover" unoptimized />
          </div>
        </div>
      </div>
    )
  }

  // État 4 — 4 images en grille 2×2
  return (
    <div className="w-full aspect-square flex flex-col gap-[4px]">
      {/* Ligne du haut */}
      <div className="flex flex-1 gap-[4px]">
        <div className="relative flex-1 overflow-hidden" style={{ borderRadius: "8px 0 0 0" }}>
          <Image src={images[0]} alt="" fill className="object-cover" unoptimized />
        </div>
        <div className="relative flex-1 overflow-hidden" style={{ borderRadius: "0 8px 0 0" }}>
          <Image src={images[1]} alt="" fill className="object-cover" unoptimized />
        </div>
      </div>
      {/* Ligne du bas */}
      <div className="flex flex-1 gap-[4px]">
        <div className="relative flex-1 overflow-hidden" style={{ borderRadius: "0 0 0 8px" }}>
          <Image src={images[2]} alt="" fill className="object-cover" unoptimized />
        </div>
        <div className="relative flex-1 overflow-hidden" style={{ borderRadius: "0 0 8px 0" }}>
          <Image src={images[3]} alt="" fill className="object-cover" unoptimized />
        </div>
      </div>
    </div>
  )
}

export function ListeCard({ nom, images, onClick }: ListeCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-2 w-full text-left cursor-pointer bg-transparent border-none p-0"
    >
      <ImageBloc images={images} />
      <p
        className="text-body-1 truncate w-full"
        style={{ color: "var(--base-on-surface)" }}
      >
        {nom}
      </p>
    </button>
  )
}
