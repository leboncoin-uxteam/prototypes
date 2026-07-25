import { NextRequest, NextResponse } from "next/server"
import { getFavorisAvecAnnonces, ajouterFavori, retirerFavori } from "@/lib/db/queries"

export function GET(req: NextRequest) {
  const listeId = req.nextUrl.searchParams.get("listeId")
  // listeId=null → favoris généraux, absent → tous
  const data = listeId !== null
    ? getFavorisAvecAnnonces(listeId === "null" ? null : listeId)
    : getFavorisAvecAnnonces()
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const { annonceId, listeId } = await req.json()
  if (!annonceId) return NextResponse.json({ error: "annonceId requis" }, { status: 400 })
  const favori = ajouterFavori(annonceId, listeId)
  return NextResponse.json(favori, { status: 201 })
}

export async function DELETE(req: NextRequest) {
  const { annonceId } = await req.json()
  if (!annonceId) return NextResponse.json({ error: "annonceId requis" }, { status: 400 })
  retirerFavori(annonceId)
  return NextResponse.json({ ok: true })
}
