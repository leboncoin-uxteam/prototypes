import { NextResponse } from "next/server"
import { getListesAvecImages } from "@/lib/db/queries"

export function GET() {
  return NextResponse.json(getListesAvecImages())
}
