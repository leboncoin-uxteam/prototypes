"use client"

import { Img as Image } from "@/components/Img"
import { useRouter } from "next/navigation"

type TabBarProps = {
  activeTab: "recherche" | "favoris"
}

type TabItem = {
  id: string
  label: string
  iconInactive: string
  iconActive: string
  href?: string
  functional: boolean
}

const TABS: TabItem[] = [
  {
    id: "recherche",
    label: "Recherche",
    iconInactive: "/images/Magnifier.svg",
    iconActive: "/images/Magnifier copie.svg",
    href: "/onboarding",
    functional: true,
  },
  {
    id: "favoris",
    label: "Favoris",
    iconInactive: "/images/Heart.svg",
    iconActive: "/images/Heart-dark.svg",
    href: "/favoris",
    functional: true,
  },
  {
    id: "publier",
    label: "Publier",
    iconInactive: "/images/AddSquare.svg",
    iconActive: "/images/AddSquare.svg",
    functional: false,
  },
  {
    id: "messages",
    label: "Messages",
    iconInactive: "/images/BubbleText.svg",
    iconActive: "/images/BubbleText.svg",
    functional: false,
  },
  {
    id: "compte",
    label: "Compte",
    iconInactive: "/images/User.svg",
    iconActive: "/images/User.svg",
    functional: false,
  },
]

export function TabBar({ activeTab }: TabBarProps) {
  const router = useRouter()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex w-full z-50"
      style={{
        backgroundColor: "var(--base-surface)",
        borderTop: "1px solid var(--dim-neutral-dim-4-low-elements)",
        boxShadow: "0px -4px 8px rgba(108, 129, 157, 0.5)",
        padding: "4px 8px",
      }}
    >
      {TABS.map((tab) => {
        const isActive = tab.id === activeTab

        return (
          <button
            key={tab.id}
            onClick={() => {
              if (!tab.functional) return
              if (tab.id === "recherche" || tab.id === "favoris") {
                const stored = typeof window !== "undefined"
                  ? localStorage.getItem(`lbc_last_${tab.id}`)
                  : null
                const defaults: Record<string, string> = { recherche: "/onboarding", favoris: "/favoris" }
                router.push(stored ?? defaults[tab.id])
              }
            }}
            className="flex flex-col items-center justify-center flex-1 gap-[2px] py-1"
            style={{ cursor: tab.functional ? "pointer" : "default" }}
            aria-label={tab.label}
          >
            <Image
              src={isActive ? tab.iconActive : tab.iconInactive}
              alt=""
              width={24}
              height={24}
            />
            <span
              className={isActive ? "text-caption-hl" : "text-caption"}
              style={{ color: "var(--base-on-surface)" }}
            >
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
