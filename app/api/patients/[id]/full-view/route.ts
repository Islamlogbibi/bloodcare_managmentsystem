import { NextRequest, NextResponse } from "next/server"
import { getPatientTransfusionView } from "@/app/lib/actions"

export async function GET(req: NextRequest, { params }: { params: any }) {
  try {
    const resolvedParams = await params
    const id = resolvedParams?.id
    if (!id) {
      return NextResponse.json({ error: "Missing patient ID" }, { status: 400 })
    }
    const view = await getPatientTransfusionView(id)
    if (!view) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 })
    }
    return NextResponse.json(view)
  } catch (error) {
    console.error("Error in patient full-view endpoint:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
