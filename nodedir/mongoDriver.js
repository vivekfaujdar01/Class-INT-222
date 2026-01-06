import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db("mydatabase");
const users = db.collection("users");

// Connect to database
async function connectDB() {
  await client.connect();
  console.log("✅ Connected to MongoDB Atlas");
}

// CREATE - Insert one document
async function createOne(data) {
  const result = await users.insertOne(data);
  console.log("Inserted:", result);
  return result;
}

// CREATE - Insert many documents
async function createMany(dataArray) {
  const result = await users.insertMany(dataArray);
  console.log("Inserted:", result);
  return result;
}

// READ - Find one document
async function findOne(query) {
  const result = await users.findOne(query);
  console.log("Found:", result);
  return result;
}

// READ - Find all documents
async function findAll(query = {}) {
  const result = await users.find(query).toArray();
  console.log("Found:", result.length, "documents");
  return result;
}

// UPDATE - Update one document
async function updateOne(filter, update) {
  const result = await users.updateOne(filter, { $set: update });
  console.log("Modified:", result.modifiedCount, "document");
  return result;
}

// UPDATE - Update many documents
async function updateMany(filter, update) {
  const result = await users.updateMany(filter, { $set: update });
  console.log("Modified:", result.modifiedCount, "documents");
  return result;
}

// DELETE - Delete one document
async function deleteOne(filter) {
  const result = await users.deleteOne(filter);
  console.log("Deleted:", result.deletedCount, "document");
  return result;
}

// DELETE - Delete many documents
async function deleteMany(filter) {
  const result = await users.deleteMany(filter);
  console.log("Deleted:", result.deletedCount, "documents");
  return result;
}

// Close connection
async function closeDB() {
  await client.close();
  console.log("🔌 Connection closed");
}

// Demo all CRUD operations
async function demo() {
  await connectDB();

  // CREATE
  await createOne({ name: "Vivek", role: "student" });
  await createMany([
    { name: "Rahul", role: "teacher" },
    { name: "Priya", role: "student" },
  ]);

  // READ
  await findOne({ name: "Vivek" });
  await findAll({ role: "student" });

  // UPDATE
  await updateOne({ name: "Vivek" }, { role: "admin" });
  await updateMany({ role: "student" }, { status: "active" });

  // DELETE
  await deleteOne({ name: "Rahul" });
  await deleteMany({ role: "student" });

  await closeDB();
}

demo();
