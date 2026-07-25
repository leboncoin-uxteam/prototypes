"use client"

import { useEffect, useState } from "react"

type AlertDialogSuppressionProps = {
  isOpen: boolean
  nomListe: string
  onConfirm: () => void
  onCancel: () => void
}

export function AlertDialogSuppression({ isOpen, nomListe, onConfirm, onCancel }: AlertDialogSuppressionProps) {
  const [visible, setVisible] = useState(false)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setVisible(true)
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)))
    } else {
      setAnimated(false)
      const timer = setTimeout(() => setVisible(false), 200)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onCancel() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [isOpen, onCancel])

  if (!visible) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[80]"
        style={{
          backgroundColor: "var(--base-overlay)",
          opacity: animated ? 1 : 0,
          transition: "opacity 200ms ease",
        }}
        onClick={onCancel}
      />

      {/* Dialog */}
      <div
        className="fixed z-[90] left-4 right-4 flex flex-col gap-4 p-6"
        style={{
          top: "50%",
          transform: animated ? "translate(0, -50%) scale(1)" : "translate(0, -50%) scale(0.95)",
          opacity: animated ? 1 : 0,
          transition: "opacity 200ms ease, transform 200ms ease",
          backgroundColor: "var(--base-surface)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        {/* Titre */}
        <h2 className="text-headline-1" style={{ color: "var(--base-on-surface)" }}>
          Supprimer la liste
        </h2>

        {/* Corps */}
        <p className="text-body-1" style={{ color: "var(--base-on-surface)" }}>
          Êtes-vous sûr de vouloir supprimer la liste {nomListe} ?
        </p>

        {/* Boutons */}
        <div className="flex items-center justify-end gap-3 mt-2">
          <button
            onClick={onCancel}
            className="text-callout px-4 py-2 rounded-full"
            style={{
              color: "var(--support-support)",
              backgroundColor: "transparent",
            }}
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="text-callout px-4 py-2 rounded-full"
            style={{
              color: "var(--feedback-on-error)",
              backgroundColor: "var(--feedback-error)",
            }}
          >
            Supprimer
          </button>
        </div>
      </div>
    </>
  )
}
