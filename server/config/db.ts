import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export async function connectDB() {
  if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI environment variable is not set!");
    console.error("\n📝 To fix this:");
    console.error("1. Create a .env file in the project root");
    console.error("2. Add: MONGODB_URI=your_mongodb_connection_string");
    console.error("\n💡 Important: Special characters in password must be URL-encoded");
    console.error("   Example: '@' becomes '%40', '#' becomes '%23'");
    console.error("\n   Your connection string should look like:");
    console.error("   mongodb+srv://username:password@cluster.mongodb.net/database");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB Atlas connected successfully");
    console.log(`📊 Database: ${mongoose.connection.db?.databaseName || 'connected'}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:");
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    } else {
      console.error(error);
    }
    console.error("\n💡 Tip: Ensure your MongoDB connection string has URL-encoded special characters");
    console.error("💡 Example: '@' should be '%40' in passwords");
    process.exit(1);
  }
}

mongoose.connection.on("disconnected", () => {
  console.log("⚠️  MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB error:", err);
});
