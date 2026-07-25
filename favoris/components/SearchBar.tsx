"use client"

import Image from "next/image"

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onBack?: () => void
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Rechercher sur leboncoin",
  onBack,
}: SearchBarProps) {
  return (
    <div
      className="flex items-center w-full h-16 gap-0"
      style={{ backgroundColor: "var(--base-surface)" }}
    >
      {/* Bouton retour */}
      <button
        onClick={onBack}
        aria-label="Retour"
        className="flex items-center justify-center shrink-0"
        style={{ width: 44, height: 44 }}
      >
        <Image
          src="/images/Arrow.svg"
          alt="Retour"
          width={24}
          height={24}
        />
      </button>

      {/* Champ pill */}
      <div
        className="flex items-center flex-1 px-4"
        style={{
          backgroundColor: "var(--feedback-neutral-container)",
          borderRadius: 80,
          height: 40,
        }}
      >
        {/* Loupe */}
        <Image
          src="/images/Magnifier.svg"
          alt=""
          width={16}
          height={16}
          style={{ marginRight: 8, flexShrink: 0 }}
        />

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none text-body-1 min-w-0"
          style={{
            color: value ? "var(--base-on-surface)" : "var(--dim-on-surface-dim-1-text)",
          }}
        />

        {/* Caméra */}
        <Image
          src="/images/CameraLens.svg"
          alt=""
          width={16}
          height={16}
          style={{ marginLeft: 8, flexShrink: 0 }}
        />
      </div>
    </div>
  )
}
