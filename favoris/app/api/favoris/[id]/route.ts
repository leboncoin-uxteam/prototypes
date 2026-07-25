import { NextRequest, NextResponse } from "next/server"
import { supprimerFavori, deplacerFavoriDansListe } from "@/lib/db/queries"

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { listeId } = await req.json()
  deplacerFavoriDansListe(params.id, listeId ?? null)
  return NextResponse.json({ ok: true })
}

export function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  supprimerFavori(params.id)
  return NextResponse.json({ ok: true })
}
