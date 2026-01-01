import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");

    const db = client.db("mydatabase");
    const users = db.collection("users");

    await users.insertOne({ name: "Vivek", role: "student" });
    const data = await users.findOne({ name: "Vivek" });

    console.log(data);
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
  } finally {
    await client.close();
  }
}

connectDB();
export default client;