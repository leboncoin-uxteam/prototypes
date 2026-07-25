"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { TabBar } from "@/components/TabBar"

export function TabBarWrapper() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === "undefined") return
    if (pathname.startsWith("/favoris")) {
      localStorage.setItem("lbc_last_favoris", "/favoris")
    } else if (pathname === "/onboarding" || pathname.startsWith("/searchresults")) {
      localStorage.setItem("lbc_last_recherche", pathname)
    }
  }, [pathname])

  const TABBAR_VISIBLE_PATHS = [
    "/onboarding",
    "/searchresults-immobilier",
    "/searchresults-voitures",
    "/searchresults-ameublement",
    "/favoris",
  ]

  const isVisible = TABBAR_VISIBLE_PATHS.includes(pathname)
  if (!isVisible) return null

  const activeTab = pathname.startsWith("/favoris") ? "favoris" : "recherche"

  return <TabBar activeTab={activeTab} />
}
