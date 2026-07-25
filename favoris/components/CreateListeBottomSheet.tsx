"use client"

import { useEffect, useRef, useState } from "react"

type CreateListeBottomSheetProps = {
  isOpen: boolean
  onClose: () => void
  defaultTitre?: string
  onCreer: (nom: string) => void
}

export function CreateListeBottomSheet({
  isOpen,
  onClose,
  defaultTitre = "",
  onCreer,
}: CreateListeBottomSheetProps) {
  const [visible, setVisible] = useState(false)
  const [animated, setAnimated] = useState(false)
  const [titre, setTitre] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  // Fermer au clic Echap
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [isOpen, onClose])

  // Animation entrée/sortie
  useEffect(() => {
    if (isOpen) {
      setTitre("")
      setVisible(true)
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setAnimated(true)
        // Focus auto sur le champ
        setTimeout(() => inputRef.current?.focus(), 50)
      }))
    } else {
      setAnimated(false)
      const timer = setTimeout(() => setVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!visible) return null

  function handleCreer() {
    const nom = titre.trim() || defaultTitre
    if (nom) {
      onCreer(nom)
    }
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[80]"
        style={{
          backgroundColor: "var(--base-overlay)",
          opacity: animated ? 1 : 0,
          transition: "opacity 300ms ease",
        }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[90] flex flex-col"
        style={{
          backgroundColor: "var(--base-surface)",
          borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
          transform: animated ? "translateY(0)" : "translateY(100%)",
          transition: "transform 300ms cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div
            className="rounded-full"
            style={{ width: 32, height: 4, backgroundColor: "var(--base-outline)" }}
          />
        </div>

        {/* Contenu */}
        <div className="flex flex-col gap-6 px-4 pt-2 pb-8">
          {/* Titre */}
          <h2
            className="text-headline-1"
            style={{ color: "var(--base-on-surface)" }}
          >
            Nom de la liste
          </h2>

          {/* TextField */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="titre-liste"
              className="text-body-2"
              style={{ color: "var(--dim-on-surface-dim-1-text)" }}
            >
              Titre
            </label>
            <input
              ref={inputRef}
              id="titre-liste"
              type="text"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleCreer() }}
              placeholder={defaultTitre}
              className="w-full text-body-1 outline-none px-4"
              style={{
                height: 48,
                border: `1px solid var(--base-outline)`,
                borderRadius: "var(--radius-md)",
                backgroundColor: "var(--base-surface)",
                color: "var(--base-on-surface)",
              }}
            />
          </div>

          {/* Bouton Créer */}
          <button
            onClick={handleCreer}
            className="w-full flex items-center justify-center text-callout rounded-full"
            style={{
              height: 44,
              backgroundColor: "var(--main-main)",
              color: "var(--main-on-main)",
            }}
          >
            Créer la liste
          </button>
        </div>
      </div>
    </>
  )
}
