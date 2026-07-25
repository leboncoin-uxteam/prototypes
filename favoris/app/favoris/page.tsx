"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ListeCard } from "@/components/ListeCard"

type ListeAvecImages = {
  id: string
  nom: string
  images: string[]
  count: number
}

export default function FavorisPage() {
  const router = useRouter()
  const [listes, setListes] = useState<ListeAvecImages[]>([])

  useEffect(() => {
    fetch("/api/favoris/listes")
      .then((r) => r.json())
      .then(setListes)
  }, [])

  return (
    <main className="flex flex-col min-h-screen px-4 py-6 pb-[64px]">
      <h1
        className="text-headline-1 mb-6"
        style={{ color: "var(--base-on-surface)" }}
      >
        Mes favoris
      </h1>

      <div className="grid grid-cols-2 gap-4">
        {listes.map((liste) => (
          <ListeCard
            key={liste.id}
            id={liste.id}
            nom={liste.nom}
            images={liste.images}
            onClick={() =>
              router.push(
                liste.id === "__tous__"
                  ? "/favoris/tous"
                  : `/favoris/${liste.id}`
              )
            }
          />
        ))}
      </div>
    </main>
  )
}
