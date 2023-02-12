const mongoose = require("mongoose");

const GradeSchema = mongoose.Schema(
  {
    studentNo: {
      type: Number,
      required: [true, "STUDENT NO IS REQUIRED"],
      minLength: [6, "STUDENT NO IS TOO SHORT"],
      maxLength: [10, "STUDENT NO IS TOO LONG"],
      unique: false,
    },
    name: {
      type: String,
      required: [true, "NAME IS REQUIRED"],
      minLength: [3, "NAME IS TOO SHORT"],
      maxLength: [20, "NAME IS TOO LONG"],
    },
    surname: {
      type: String,
      required: [true, "SURNAME IS REQUIRED"],
      minLength: [3, "SURNAME IS TOO SHORT"],
      maxLength: [20, "SURNAME IS TOO LONG"],
    },
    email: {
      type: String,
      required: [true, "EMAIL ADDRESS IS REQUIRED"],
      minLength: [7, "EMAIL ADDRESS IS TOO SHORT"],
      maxLength: [30, "EMAIL ADDRESS IS TOO LONG"],
      unique: false,
    },
    lesson: {
      type: String,
      required: [true, "LESSON IS REQUIRED"],
      minLength: [4, "LESSON IS TOO SHORT"],
      maxLength: [40, "LESSON IS TOO LONG"],
    },
    grade: {
      type: Number,
      required: [true, "GRADE IS REQUIRED"],
      enum: [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4, 4.5, 5.0, 5.5, 6.0],
    },
    semester: {
      type: Number,
      required: [true, "SEMESTER IS REQUIRED"],
      enum: [1, 2],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Teachers",
      required: [true, "PROVIDE TEACHER"],
    },
  },
  { timestapms: true }
);

module.exports = mongoose.model("Grades", GradeSchema);
