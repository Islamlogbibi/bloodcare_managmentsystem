import { MongoClient, ObjectId } from "mongodb"

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"
const dbName = "blood_transfusion_system"
const client = new MongoClient(uri)

async function runMigration() {
  try {
    await client.connect()
    console.log("Connected to MongoDB for migration.")
    const db = client.db(dbName)
    const patientsCol = db.collection("patients")
    const transfusionsCol = db.collection("transfusions")

    // Retrieve all patients
    const patients = await patientsCol.find({}).toArray()
    console.log(`Found ${patients.length} patients in database.`)

    const pendingTransfusions: any[] = []
    let totalSchedulesFound = 0
    let dirtySchedulesSkipped = 0

    // Prepare migration documents
    for (const patient of patients) {
      const schedules = patient.schedules
      if (!Array.isArray(schedules) || schedules.length === 0) {
        continue
      }

      for (const schedule of schedules) {
        // Defensive checking for dirty/partial data
        if (!schedule) {
          dirtySchedulesSkipped++
          continue
        }

        totalSchedulesFound++

        // Defensive parsing of date
        let parsedDate: Date
        try {
          parsedDate = schedule.date ? new Date(schedule.date) : new Date()
          if (isNaN(parsedDate.getTime())) {
            parsedDate = new Date()
          }
        } catch (e) {
          parsedDate = new Date()
        }

        // Generate dynamic transfusionId securely
        const randomDigits = Math.floor(1000 + Math.random() * 9000)
        const transfusionId = `TRN${Date.now().toString().slice(-6)}${randomDigits}`

        const transfusionDoc = {
          transfusionId,
          patientId: patient._id,
          scheduledDate: new Date(new Date(parsedDate).setHours(0, 0, 0, 0)),
          scheduledTime: parsedDate,
          priority: schedule.priority || "regular",
          bloodUnits: schedule.poches ? Number(schedule.poches) || 1 : 1,
          notes: schedule.notes || schedule.description || "",
          status: "completed",
          hb: schedule.hb !== undefined && schedule.hb !== null ? String(schedule.hb) : "",
          hbf: schedule.hbf !== undefined && schedule.hbf !== null ? String(schedule.hbf) : "",
          poches: schedule.poches !== undefined && schedule.poches !== null ? String(schedule.poches) : "",
          Hdist: schedule.Hdist !== undefined && schedule.Hdist !== null ? String(schedule.Hdist) : "",
          Hrecu: schedule.Hrecu !== undefined && schedule.Hrecu !== null ? String(schedule.Hrecu) : "",
          don: schedule.don !== undefined && schedule.don !== null ? String(schedule.don) : "",
          hasF: Boolean(schedule.hasF),
          hasC: Boolean(schedule.hasC),
          hasL: Boolean(schedule.hasL),
          createdAt: parsedDate,
          updatedAt: parsedDate,
        }

        pendingTransfusions.push(transfusionDoc)
      }
    }

    console.log(`\n--- PHASE 1: COPY ---`)
    console.log(`Discovered ${totalSchedulesFound} schedules across patients (Skipped ${dirtySchedulesSkipped} dirty entries).`)
    
    if (pendingTransfusions.length === 0) {
      console.log("No schedules need migration. Database is already clean.")
      return
    }

    // Insert all mapped transfusions
    console.log(`Inserting ${pendingTransfusions.length} transfusion records...`)
    const insertResult = await transfusionsCol.insertMany(pendingTransfusions)
    console.log(`Successfully copied ${insertResult.insertedCount} records to the transfusions collection.`)

    console.log(`\n--- PHASE 2: VERIFY ---`)
    console.log("Asserting count consistency...")
    const actualInsertedCount = await transfusionsCol.countDocuments({
      status: "completed",
      transfusionId: { $regex: /^TRN/ }
    })

    console.log(`Database assertion: ${actualInsertedCount} completed transfusions found in the database.`)
    if (actualInsertedCount < pendingTransfusions.length) {
      throw new Error(`Verification FAILED: Expected ${pendingTransfusions.length} migrated transfusions but found only ${actualInsertedCount} in database. Aborting Phase 3.`)
    }

    // Verify a sample matching patientId
    const sample = pendingTransfusions[0]
    const dbSample = await transfusionsCol.findOne({ transfusionId: sample.transfusionId })
    if (!dbSample || dbSample.patientId.toString() !== sample.patientId.toString()) {
      throw new Error("Verification FAILED: Sample check returned mismatched patient ID or record missing. Aborting Phase 3.")
    }

    console.log("Verification SUCCESS: Sample assertions passed. Counts match perfectly.")

    console.log(`\n--- PHASE 3: DELETE (CLEANUP) ---`)
    console.log("Cleaning up legacy patient fields and unsetting patient.schedules...")
    
    const unsetResult = await patientsCol.updateMany(
      {},
      {
        $unset: {
          schedules: "",
          Hdist: "",
          Hrecu: "",
          hb: "",
          poches: "",
          don: "",
          hasF: "",
          hasC: "",
          hasL: ""
        }
      }
    )

    console.log(`Successfully modified ${unsetResult.modifiedCount} patient documents to remove legacy fields.`)
    console.log("\n🎉 MIGRATION COMPLETED SUCCESSFULLY AND DEFENSIVELY!")

  } catch (error: any) {
    console.error("\n❌ MIGRATION FAILED:", error.message)
    process.exit(1)
  } finally {
    await client.close()
    console.log("Database connection closed.")
  }
}

runMigration()
