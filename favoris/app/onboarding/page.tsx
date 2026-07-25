"use client"

import { useRouter } from "next/navigation"
import { CategoryButton } from "@/components/CategoryButton"

const CATEGORIES = [
  {
    id: "immobilier",
    label: "Ventes Immobilières",
    icon: "/images/house.svg",
    href: "/searchresults-immobilier",
  },
  {
    id: "voitures",
    label: "Voitures",
    icon: "/images/car.svg",
    href: "/searchresults-voitures",
  },
  {
    id: "ameublement",
    label: "Ameublement",
    icon: "/images/Couch.svg",
    href: "/searchresults-ameublement",
  },
]

export default function OnboardingPage() {
  const router = useRouter()

  return (
    <main className="flex items-center justify-center min-h-screen pb-[64px]">
      <div className="flex items-center gap-[32px]">
        {CATEGORIES.map((cat) => (
          <CategoryButton
            key={cat.id}
            icon={cat.icon}
            label={cat.label}
            onClick={() => router.push(cat.href)}
          />
        ))}
      </div>
    </main>
  )
}
