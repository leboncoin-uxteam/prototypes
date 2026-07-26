"use client"

import { useEffect, useState } from "react"
import { Img as Image } from "@/components/Img"

type SnackbarProps = {
  isOpen: boolean
  nomListe: string
  onClose: () => void
  duration?: number
}

export function Snackbar({ isOpen, nomListe, onClose, duration = 4000 }: SnackbarProps) {
  const [visible, setVisible] = useState(false)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setVisible(true)
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)))

      const timer = setTimeout(() => {
        setAnimated(false)
        setTimeout(() => setVisible(false), 300)
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    } else {
      setAnimated(false)
      const timer = setTimeout(() => setVisible(false), 300)
      return () => clearTimeout(timer)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  if (!visible) return null

  return (
    <div
      className="fixed left-4 right-4 z-[55] flex items-start gap-3 px-4 py-3"
      style={{
        bottom: "calc(64px + 16px)", // tabbar 64px + 16px d'espace
        backgroundColor: "var(--feedback-success-container)",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--feedback-success)",
        boxShadow: "var(--shadow-md)",
        opacity: animated ? 1 : 0,
        transform: animated ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 250ms ease, transform 250ms ease",
      }}
    >
      {/* Icône CircleCheck */}
      <Image
        src="/images/info.svg"
        alt=""
        width={20}
        height={20}
        style={{ flexShrink: 0, marginTop: 2 }}
      />

      {/* Textes */}
      <div className="flex flex-col flex-1 min-w-0 gap-[2px]">
        <p
          className="text-body-1-hl"
          style={{ color: "var(--feedback-on-success-container)" }}
        >
          Annonce mise en favoris
        </p>
        <p
          className="text-body-2"
          style={{ color: "var(--feedback-on-success-container)" }}
        >
          dans la liste {nomListe}
        </p>
      </div>

      {/* Bouton fermer */}
      <button
        onClick={onClose}
        aria-label="Fermer"
        className="flex items-center justify-center shrink-0"
        style={{ width: 24, height: 24, marginTop: 2 }}
      >
        <Image src="/images/close-success.svg" alt="" width={16} height={16} />
      </button>
    </div>
  )
}
