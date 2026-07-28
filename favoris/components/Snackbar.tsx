"use client"

import { useEffect, useState } from "react"
import { Img as Image } from "@/components/Img"

// Variante "deplacement" : titre + sous-titre "dans la liste X" + bouton fermer
// Variante "suppression" : titre + bouton Annuler + bouton fermer
type SnackbarProps =
  | {
      variant: "ajout"
      isOpen: boolean
      nomListe: string
      onClose: () => void
      duration?: number
      bottomOffset?: number
    }
  | {
      variant: "deplacement"
      isOpen: boolean
      nomListe: string
      onClose: () => void
      duration?: number
      bottomOffset?: number
    }
  | {
      variant: "suppression"
      isOpen: boolean
      onClose: () => void
      onAnnuler: () => void
      duration?: number
      bottomOffset?: number
    }

function useSnackbarAnimation(isOpen: boolean) {
  const [visible, setVisible] = useState(false)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setVisible(true)
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)))
    } else {
      setAnimated(false)
      const timer = setTimeout(() => setVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  return { visible, animated }
}

export function Snackbar(props: SnackbarProps) {
  const duration = props.duration ?? 4000
  const bottomOffset = props.bottomOffset ?? 80 // tabbar 64px + 16px par défaut
  const { visible, animated } = useSnackbarAnimation(props.isOpen)

  useEffect(() => {
    if (!props.isOpen) return
    const timer = setTimeout(() => props.onClose(), duration)
    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isOpen])

  if (!visible) return null

  const baseStyle: React.CSSProperties = {
    bottom: bottomOffset,
    backgroundColor: "var(--feedback-success-container)",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--feedback-success)",
    boxShadow: "var(--shadow-md)",
    opacity: animated ? 1 : 0,
    transform: animated ? "translateY(0)" : "translateY(12px)",
    transition: "opacity 250ms ease, transform 250ms ease",
  }

  if (props.variant === "ajout") {
    return (
      <div className="fixed left-4 right-4 z-[55] flex items-start gap-3 px-4 py-3" style={baseStyle}>
        <Image src="/images/info.svg" alt="" width={20} height={20} style={{ flexShrink: 0, marginTop: 2 }} />
        <div className="flex flex-col flex-1 min-w-0 gap-[2px]">
          <p className="text-body-1-hl" style={{ color: "var(--feedback-on-success-container)" }}>
            Annonce mise en favoris
          </p>
          <p className="text-body-2" style={{ color: "var(--feedback-on-success-container)" }}>
            dans la liste {props.nomListe}
          </p>
        </div>
        <button onClick={props.onClose} aria-label="Fermer" className="flex items-center justify-center shrink-0" style={{ width: 24, height: 24, marginTop: 2 }}>
          <Image src="/images/close-success.svg" alt="" width={16} height={16} />
        </button>
      </div>
    )
  }

  if (props.variant === "deplacement") {
    return (
      <div className="fixed left-4 right-4 z-[55] flex items-start gap-3 px-4 py-3" style={baseStyle}>
        <Image src="/images/info.svg" alt="" width={20} height={20} style={{ flexShrink: 0, marginTop: 2 }} />
        <div className="flex flex-col flex-1 min-w-0 gap-[2px]">
          <p className="text-body-1-hl" style={{ color: "var(--feedback-on-success-container)" }}>
            Annonce déplacée
          </p>
          <p className="text-body-2" style={{ color: "var(--feedback-on-success-container)" }}>
            dans la liste {props.nomListe}
          </p>
        </div>
        <button onClick={props.onClose} aria-label="Fermer" className="flex items-center justify-center shrink-0" style={{ width: 24, height: 24, marginTop: 2 }}>
          <Image src="/images/close-success.svg" alt="" width={16} height={16} />
        </button>
      </div>
    )
  }

  // variante "suppression"
  return (
    <div className="fixed left-4 right-4 z-[55] flex flex-col gap-2 px-4 py-3" style={baseStyle}>
      <div className="flex items-center gap-3">
        <Image src="/images/info.svg" alt="" width={20} height={20} style={{ flexShrink: 0 }} />
        <p className="text-body-1-hl flex-1" style={{ color: "var(--feedback-on-success-container)" }}>
          L&apos;annonce a bien été supprimée
        </p>
        <button onClick={props.onClose} aria-label="Fermer" className="flex items-center justify-center shrink-0" style={{ width: 24, height: 24 }}>
          <Image src="/images/close-success.svg" alt="" width={16} height={16} />
        </button>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => { props.onAnnuler(); props.onClose() }}
          className="text-callout px-3 py-1 rounded-full"
          style={{ color: "var(--feedback-on-success-container)", fontWeight: 700 }}
        >
          Annuler
        </button>
      </div>
    </div>
  )
}
