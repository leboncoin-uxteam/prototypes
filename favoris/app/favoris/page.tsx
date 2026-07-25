"use client"

import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"
import { ListeCard } from "@/components/ListeCard"

export default function FavorisPage() {
  const router = useRouter()
  const { getListesAvecImages } = useStore()

  const listes = getListesAvecImages()

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
                  : `/favoris/liste?id=${liste.id}`
              )
            }
          />
        ))}
      </div>
    </main>
  )
}
