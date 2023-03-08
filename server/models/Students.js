const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      minlength: [7, "EMAIL ADDRESS IS TOO SHORT"],
      maxlength: [30, "EMAIL ADDRESS IS TOO LONG"],
      unique: [true, "EMAIL ADDRESS MUST BE UNIQUE"],
    },
    password: {
      type: String,
      required: [true, "PASSWORD IS REQUIRED"],
      minlength: [7, "PASSWORD IS TOO SHORT"],
      maxlength: [30, "PASSWORD IS TOO LONG"],
    },
    lessons: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

StudentsSchema.pre("save", async function () {
  let tempEmail = this.name[0] + this.surname + "@edu.ga.pl";
  this.email = tempEmail.toLowerCase();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

StudentsSchema.methods.genJWT = function () {
  const access_token = jwt.sign(
    {
      ID: this._id,
      name: this.name,
      surname: this.surname,
      email: this.email,
      title: "student",
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
      title: "student",
    },
    process.env.REFRESH_SECRET,
    { expiresIn: "180d" }
  );
  return { access_token, refresh_token };
};

module.exports = mongoose.model("Students", StudentsSchema);
