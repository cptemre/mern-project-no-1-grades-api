// REQUIREMENTS
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// TEACHER SCHEMA
const teacherSchema = new mongoose.Schema(
  {
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
      minlength: [7, "EMAIL ADDRESS IS TOO SHORT"],
      maxlength: [30, "EMAIL ADDRESS IS TOO LONG"],
      unique: [true, "EMAIL ADDRESS ALREADY EXISTS"],
    },
    password: {
      type: String,
      required: [true, "PASSWORD IS REQUIRED"],
      minlength: [7, "PASSWORD IS TOO SHORT"],
      maxlength: [30, "PASSWORD IS TOO LONG"],
    },
    branches: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// SAVE THE PASSWORD AS HASHED
teacherSchema.pre("save", async function () {
  this.email = this.name[0] + this.surname + "@ga.pl";
  this.email.toLowerCase()
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// CREATE JWT METHOD AND RETURN THEM AS AN OBJECT
teacherSchema.methods.genJWT = function () {
  const access_token = jwt.sign(
    {
      ID: this._id,
      name: this.name,
      surname: this.surname,
      email: this.email,
      title: 'teacher'
    },
    process.env.ACCESS_SECRET,
    { expiresIn: "10s" }
  );
  const refresh_token = jwt.sign(
    {
      ID: this._id,
      name: this.name,
      surname: this.surname,
      email: this.email,
      title: "teacher",
    },
    process.env.REFRESH_SECRET,
    { expiresIn: "180d" }
  );
  return { access_token, refresh_token };
};

module.exports = mongoose.model("Teachers", teacherSchema);
