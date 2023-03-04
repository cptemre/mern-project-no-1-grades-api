const mongoose = require("mongoose");

const LessonsSchema = new mongoose.Schema({
  lesson: {
    type: String,
    required: [true, "LESSON IS REQUIRED"],
    unique: [true, "LESSON ALREADY EXISTS"],
  },
  semester: {
    type: Number,
    required: [true, "SEMESTER IS REQUIRED"],
  },
});

module.exports = new mongoose.model("Lessons", LessonsSchema);
