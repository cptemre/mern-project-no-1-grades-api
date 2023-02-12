const mongoose = require("mongoose");

const StudentsSchema = new mongoose.Schema(
  {
    studentNo: {
      type: String,
      required: [true, "STUDENT NO IS REQUIRED"],
      minlength: [6, "STUDENT NO IS TOO SHORT"],
      maxlength: [10, "STUDENT NO IS TOO LONG"],
      unique: [true, "STUDENT NO MUST BE UNIQUE"],
    },
    name: {
      type: String,
      required: [true, "NAME IS REQUIRED"],
      minlength: [3, "NAME IS TOO SHORT"],
      maxlength: [20, "NAME IS TOO LONG"],
    },
    surname: {
      type: String,
      required: [true, "SURNAME IS REQUIRED"],
      minlength: [3, "SURNAME IS TOO SHORT"],
      maxlength: [20, "SURNAME IS TOO LONG"],
    },
    email: {
      type: String,
      required: [true, "EMAIL ADDRESS IS REQUIRED"],
      minlength: [7, "EMAIL ADDRESS IS TOO SHORT"],
      maxlength: [30, "EMAIL ADDRESS IS TOO LONG"],
      unique: [true, "EMAIL ADDRESS MUST BE UNIQUE"],
    },
    lessons: {
      type: Object,
    }
  },
  { timestapms: true }
);

module.exports = mongoose.model("Students", StudentsSchema);
