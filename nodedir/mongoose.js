import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
// Database name: myDatabase, Collection will be auto-generated from model name
mongoose.connect(process.env.MONGO_URI, {
  dbName: "mydatabase"
});

const studentSchema = new mongoose.Schema({
  name: String,
  role: String,
  rollno: Number,
});

const Student = mongoose.model("Student", studentSchema);

async function connectDB() {
  try {
    await mongoose.connection.once("open", () => {
      console.log("✅ Connected to MongoDB Atlas using Mongoose");
    });

    const newStudent = new Student({ name: "Vivek", role: "student", rollno: 101 });
    await newStudent.save();

    const data = await Student.findOne({ name: "Vivek" });
    console.log(data);
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
  } finally {
    await mongoose.connection.close();
  }
}

connectDB();
export default mongoose;