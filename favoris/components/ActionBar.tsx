"use client"

import { useEffect, useRef, useState } from "react"
import { Img as Image } from "@/components/Img"

type ActionBarAction = {
  icon: string
  label: string
  onClick: () => void
}

type ActionBarProps = {
  actions: ActionBarAction[]
}

export function ActionBar({ actions }: ActionBarProps) {
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY
      if (currentY <= 0) {
        setVisible(true)
      } else if (currentY > lastScrollY.current) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      lastScrollY.current = currentY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className="flex items-center z-50"
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: visible
          ? "translateX(-50%) translateY(0)"
          : "translateX(-50%) translateY(calc(100% + 24px))",
        opacity: visible ? 1 : 0,
        transition: "transform 250ms ease, opacity 200ms ease",
        width: "fit-content",
        backgroundColor: "var(--base-surface)",
        border: "1px solid rgba(58, 71, 87, 0.16)",
        borderRadius: "var(--radius-full)",
        boxShadow: "0px 6px 12px rgba(108, 129, 157, 0.5)",
        padding: "4px 8px",
        gap: 4,
      }}
    >
      {actions.map((action, i) => (
        <button
          key={i}
          onClick={action.onClick}
          className="flex flex-col items-center"
          style={{ gap: 2, padding: 4, minWidth: 64, background: "transparent", border: "none" }}
        >
          <Image src={action.icon} alt="" width={24} height={24} />
          <span className="text-caption" style={{ color: "var(--base-on-surface)" }}>
            {action.label}
          </span>
        </button>
      ))}
    </div>
  )
}
