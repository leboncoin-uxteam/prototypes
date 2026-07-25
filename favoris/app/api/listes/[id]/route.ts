import { NextRequest, NextResponse } from "next/server"
import { supprimerListe, getFavorisTriesParDate } from "@/lib/db/queries"

export function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const ordre = (req.nextUrl.searchParams.get("tri") as "asc" | "desc") ?? "desc"
  const data = getFavorisTriesParDate(params.id, ordre)
  return NextResponse.json(data)
}

export function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  supprimerListe(params.id)
  return NextResponse.json({ ok: true })
}
