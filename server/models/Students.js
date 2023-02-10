const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  studentNo: {
    type: Number,
    required: [true, "STUDENT NO IS REQUIRED"],
    minLength: [10, "STUDENT NO IS TOO SHORT"],
    maxLength: [10, "STUDENT NO IS TOO LONG"],
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
    unique: [true, "EMAIL ADDRESS ALREADY EXISTS"],
  },
  lessons: {
    type: Object,
    required: [true, "LESSON AND GRADE IS REQUIRED"],
  },
});
