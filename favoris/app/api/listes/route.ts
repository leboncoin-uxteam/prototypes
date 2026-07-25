import { NextRequest, NextResponse } from "next/server"
import { getListes, creerListe } from "@/lib/db/queries"

export function GET() {
  return NextResponse.json(getListes())
}

export async function POST(req: NextRequest) {
  const { nom, description } = await req.json()
  if (!nom) return NextResponse.json({ error: "nom requis" }, { status: 400 })
  const liste = creerListe(nom, description)
  return NextResponse.json(liste, { status: 201 })
}
