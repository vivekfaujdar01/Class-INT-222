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

// ==================== CRUD OPERATIONS ====================

// CREATE - Add a new student
async function createStudent(name, role, rollno) {
  const newStudent = new Student({ name, role, rollno });
  const savedStudent = await newStudent.save();
  console.log("✅ Student created:", savedStudent);
  return savedStudent;
}

// READ - Get all students
async function getAllStudents() {
  const students = await Student.find();
  console.log("📚 All students:", students);
  return students;
}

// READ - Get student by ID
async function getStudentById(id) {
  const student = await Student.findById(id);
  console.log("🔍 Student found:", student);
  return student;
}

// READ - Get student by any field (e.g., name, rollno)
async function getStudentByField(query) {
  const student = await Student.findOne(query);
  console.log("🔍 Student found:", student);
  return student;
}

// UPDATE - Update student by ID
async function updateStudent(id, updateData) {
  const updatedStudent = await Student.findByIdAndUpdate(id, updateData, {
    new: true, // Returns the updated document
    runValidators: true, // Validates the update
  });
  console.log("✏️ Student updated:", updatedStudent);
  return updatedStudent;
}

// UPDATE - Update student by field
async function updateStudentByField(query, updateData) {
  const updatedStudent = await Student.findOneAndUpdate(query, updateData, {
    new: true,
    runValidators: true,
  });
  console.log("✏️ Student updated:", updatedStudent);
  return updatedStudent;
}

// DELETE - Delete student by ID
async function deleteStudent(id) {
  const deletedStudent = await Student.findByIdAndDelete(id);
  console.log("🗑️ Student deleted:", deletedStudent);
  return deletedStudent;
}

// DELETE - Delete student by field
async function deleteStudentByField(query) {
  const deletedStudent = await Student.findOneAndDelete(query);
  console.log("🗑️ Student deleted:", deletedStudent);
  return deletedStudent;
}

// ==================== DEMO FUNCTION ====================

async function runCRUDDemo() {
  await mongoose.connection.once("open", () => {
    console.log("✅ Connected to MongoDB Atlas using Mongoose");
  });

  console.log("\n--- CREATE ---");
  const student1 = await createStudent("Vivek", "student", 101);
  const student2 = await createStudent("Rahul", "student", 102);

  console.log("\n--- READ ALL ---");
  await getAllStudents();

  console.log("\n--- READ BY ID ---");
  await getStudentById(student1._id);

  console.log("\n--- READ BY FIELD ---");
  await getStudentByField({ name: "Rahul" });

  console.log("\n--- UPDATE BY ID ---");
  await updateStudent(student1._id, { role: "class_representative" });

  console.log("\n--- UPDATE BY FIELD ---");
  await updateStudentByField({ name: "Rahul" }, { rollno: 103 });

  console.log("\n--- DELETE BY ID ---");
  await deleteStudent(student1._id);

  console.log("\n--- DELETE BY FIELD ---");
  await deleteStudentByField({ name: "Rahul" });

  console.log("\n--- FINAL STATE ---");
  await getAllStudents();

}

// Run the demo
runCRUDDemo();
