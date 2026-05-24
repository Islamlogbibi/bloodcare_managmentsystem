import { getDatabase } from "@/lib/mongodb"
import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date")
  if (!date) return NextResponse.json([], { status: 400 })

  const db = await getDatabase()
  const transfusions = db.collection("transfusions")
  const start = new Date(date)
  const end = new Date(date)
  end.setDate(end.getDate() + 1)

  const result = await transfusions.aggregate([
    {
      $match: {
        scheduledTime: {
          $gte: start,
          $lt: end,
        },
      },
    },
    {
      $lookup: {
        from: "patients",
        localField: "patientId",
        foreignField: "_id",
        as: "patient",
      },
    },
    { $unwind: "$patient" },
    { $sort: { scheduledTime: 1 } },
  ]).toArray()
  

  return NextResponse.json(result)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { patientId, date, priority, hb, poches, Hdist, Hrecu, description, hasF, hasC, hasL } = body

    if (!patientId || !date) {
      return NextResponse.json({ error: "Patient ID and date are required" }, { status: 400 })
    }

    const db = await getDatabase()
    const transfusions = db.collection("transfusions")

    // Create the scheduled time from the date
    const scheduledTime = new Date(date)
    scheduledTime.setHours(8, 0, 0, 0) // Default to 8:00 AM

    const newTransfusion = {
      patientId: new ObjectId(patientId),
      scheduledDate: new Date(new Date(date).setHours(0, 0, 0, 0)),
      scheduledTime,
      priority: priority || "normal",
      description: description || "",
      status: "scheduled",
      hb: hb || "",
      poches: poches || "",
      Hdist: Hdist || "",
      Hrecu: Hrecu || "",
      hasF: hasF || false,
      hasC: hasC || false,
      hasL: hasL || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await transfusions.insertOne(newTransfusion)

    return NextResponse.json({ 
      success: true, 
      id: result.insertedId,
      message: "Transfusion ajoutée avec succès" 
    }, { status: 201 })

  } catch (error) {
    console.error("Error adding history entry:", error)
    return NextResponse.json({ error: "Failed to add history entry" }, { status: 500 })
  }
}
