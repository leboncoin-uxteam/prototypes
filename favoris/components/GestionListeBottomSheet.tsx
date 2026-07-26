"use client"

import { useEffect, useState } from "react"
import { Img as Image } from "@/components/Img"

type Option = {
  icon: string
  label: string
  onClick: () => void
  danger?: boolean
}

type GestionListeBottomSheetProps = {
  isOpen: boolean
  onClose: () => void
  options: Option[]
}

export function GestionListeBottomSheet({ isOpen, onClose, options }: GestionListeBottomSheetProps) {
  const [visible, setVisible] = useState(false)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [isOpen, onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

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

  if (!visible) return null

  return (
    <>
      <div
        className="fixed inset-0 z-[60]"
        style={{
          backgroundColor: "var(--base-overlay)",
          opacity: animated ? 1 : 0,
          transition: "opacity 300ms ease",
        }}
        onClick={onClose}
      />
      <div
        className="fixed bottom-0 left-0 right-0 z-[70] flex flex-col"
        style={{
          backgroundColor: "var(--base-surface)",
          borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
          transform: animated ? "translateY(0)" : "translateY(100%)",
          transition: "transform 300ms cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="rounded-full" style={{ width: 32, height: 4, backgroundColor: "var(--base-outline)" }} />
        </div>

        {/* Titre */}
        <div className="px-4 pt-2 pb-4 shrink-0">
          <h2 className="text-headline-1" style={{ color: "var(--base-on-surface)" }}>
            Organiser la liste de favoris
          </h2>
        </div>

        {/* Options */}
        <div className="flex flex-col pb-8">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => { opt.onClick(); onClose() }}
              className="flex items-center gap-4 px-4 py-4 text-left w-full"
              style={{ backgroundColor: "transparent" }}
            >
              <Image src={opt.icon} alt="" width={24} height={24} />
              <span
                className="text-callout"
                style={{ color: "var(--base-on-surface)" }}
              >
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
