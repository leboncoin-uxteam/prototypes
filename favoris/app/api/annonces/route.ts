import { NextRequest, NextResponse } from "next/server"
import { getAnnonces } from "@/lib/db/queries"

export function GET(req: NextRequest) {
  const categorie = req.nextUrl.searchParams.get("categorie") as
    | "immobilier"
    | "voitures"
    | "ameublement"
    | null
  const data = getAnnonces(categorie ?? undefined)
  return NextResponse.json(data)
}
