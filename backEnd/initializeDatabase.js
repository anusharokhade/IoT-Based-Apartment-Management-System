// Database Initialization Script
// This script creates collections and sets up indexes for the apartment management system

const client = require("./dbconnect");
const mongoConfig = require("./mongoConfig");

async function initializeDatabase() {
  try {
    const db = client.db(mongoConfig.dbName);
    
    console.log("🔄 Initializing database collections...\n");

    // Create ownerandmaintainence collection
    try {
      await db.createCollection("ownerandmaintainence");
      console.log("✅ Created 'ownerandmaintainence' collection");
      
      // Create indexes
      await db.collection("ownerandmaintainence").createIndex({ "flatno": 1 });
      await db.collection("ownerandmaintainence").createIndex({ "Login": 1 });
      console.log("   └─ Indexes created");
    } catch (e) {
      console.log("⚠️  'ownerandmaintainence' collection may already exist");
    }

    // Create Expenses collection
    try {
      await db.createCollection("Expenses");
      console.log("✅ Created 'Expenses' collection");
      await db.collection("Expenses").createIndex({ "year": 1 });
      console.log("   └─ Indexes created");
    } catch (e) {
      console.log("⚠️  'Expenses' collection may already exist");
    }

    // Create notices collection
    try {
      await db.createCollection("notices");
      console.log("✅ Created 'notices' collection");
    } catch (e) {
      console.log("⚠️  'notices' collection may already exist");
    }

    // Create messages collection
    try {
      await db.createCollection("messages");
      console.log("✅ Created 'messages' collection");
    } catch (e) {
      console.log("⚠️  'messages' collection may already exist");
    }

    // Create counters collection
    try {
      await db.createCollection("counters");
      console.log("✅ Created 'counters' collection");
      
      // Initialize counter
      const result = await db.collection("counters").insertOne({
        _id: "financialyear",
        financialyear: "2024-2025"
      });
      console.log("   └─ Initialized financial year counter");
    } catch (e) {
      console.log("⚠️  'counters' collection may already exist");
    }

    // Create complaints collection
    try {
      await db.createCollection("complaints");
      console.log("✅ Created 'complaints' collection");
    } catch (e) {
      console.log("⚠️  'complaints' collection may already exist");
    }

    // Create visitors collection
    try {
      await db.createCollection("visitors");
      console.log("✅ Created 'visitors' collection");
    } catch (e) {
      console.log("⚠️  'visitors' collection may already exist");
    }

    // Create employees collection
    try {
      await db.createCollection("employees");
      console.log("✅ Created 'employees' collection");
    } catch (e) {
      console.log("⚠️  'employees' collection may already exist");
    }

    // Create maintenance_requests collection
    try {
      await db.createCollection("maintenance_requests");
      console.log("✅ Created 'maintenance_requests' collection");
    } catch (e) {
      console.log("⚠️  'maintenance_requests' collection may already exist");
    }

    console.log("\n✨ Database initialization complete!");
    console.log("\n📊 Collections created:");
    mongoConfig.collections.forEach(col => console.log(`   • ${col}`));

    process.exit(0);
  } catch (error) {
    console.error("❌ Error initializing database:", error);
    process.exit(1);
  }
}

// Run initialization
initializeDatabase();
