import { NextRequest, NextResponse } from "next/server"
import { reordonnerListes } from "@/lib/db/queries"

export async function POST(req: NextRequest) {
  const { ordreIds } = await req.json()
  if (!Array.isArray(ordreIds)) return NextResponse.json({ error: "ordreIds requis" }, { status: 400 })
  reordonnerListes(ordreIds)
  return NextResponse.json({ ok: true })
}
