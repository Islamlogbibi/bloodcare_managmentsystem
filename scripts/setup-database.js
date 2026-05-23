const { MongoClient } = require("mongodb")

const client = new MongoClient(process.env.MONGODB_URI || "mongodb://localhost:27017")
const dbName = "blood_transfusion_system"

async function setupDatabase() {
  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db(dbName)

    // Create collections
    const collections = ["patients", "transfusions", "notifications", "audit_logs"]

    for (const collectionName of collections) {
      try {
        await db.createCollection(collectionName)
        console.log(`✅ Created collection: ${collectionName}`)
      } catch (error) {
        if (error.code === 48) {
          console.log(`ℹ️  Collection ${collectionName} already exists`)
        } else {
          throw error
        }
      }
    }

    // Create indexes
    console.log("\n📊 Creating indexes...")

    // Patients indexes
    await db.collection("patients").createIndex({ patientId: 1 }, { unique: true })
    await db.collection("patients").createIndex({ lastName: 1, firstName: 1 })
    await db.collection("patients").createIndex({ bloodType: 1 })
    await db.collection("patients").createIndex({ phone: 1 })
    await db.collection("patients").createIndex({ email: 1 }, { sparse: true })
    await db.collection("patients").createIndex({ status: 1 })
    await db.collection("patients").createIndex({ createdAt: -1 })
    console.log("✅ Created patients indexes")

    // Transfusions indexes
    await db.collection("transfusions").createIndex({ transfusionId: 1 }, { unique: true })
    await db.collection("transfusions").createIndex({ scheduledDate: 1 })
    await db.collection("transfusions").createIndex({ patientId: 1 })
    await db.collection("transfusions").createIndex({ priority: 1, status: 1 })
    await db.collection("transfusions").createIndex({ status: 1 })
    await db.collection("transfusions").createIndex({ createdAt: -1 })
    console.log("✅ Created transfusions indexes")

    // Notifications indexes
    await db.collection("notifications").createIndex({ read: 1 })
    await db.collection("notifications").createIndex({ createdAt: -1 })
    console.log("✅ Created notifications indexes")

    // Audit logs indexes
    await db.collection("audit_logs").createIndex({ action: 1 })
    await db.collection("audit_logs").createIndex({ timestamp: -1 })
    await db.collection("audit_logs").createIndex({ resourceType: 1, resourceId: 1 })
    console.log("✅ Created audit_logs indexes")

    console.log("\n🎉 Database setup completed successfully!")
    console.log("\n📋 Summary:")
    console.log(`   • Database: ${dbName}`)
    console.log(`   • Collections: ${collections.length}`)
    console.log("   • Indexes: Created for optimal performance")
  } catch (error) {
    console.error("❌ Error setting up database:", error)
    process.exit(1)
  } finally {
    await client.close()
  }
}

setupDatabase()
