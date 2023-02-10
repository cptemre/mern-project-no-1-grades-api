// REQUIREMENTS
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// TEACHER SCHEMA
const teacherSchema = mongoose.Schema(
  {
    name: {
      type: String,
      req: [true, "NAME IS REQUIRED"],
      minLength: [3, "NAME IS TOO SHORT"],
      maxLengt: [20, "NAME IS TOO LONG"],
    },
    surname: {
      type: String,
      req: [true, "SURNAME IS REQUIRED"],
      minLength: [3, "SURNAME IS TOO SHORT"],
      maxLengt: [20, "SURNAME IS TOO LONG"],
    },
    email: {
      type: String,
      req: [true, "EMAIL ADDRESS IS REQUIRED"],
      minLength: [7, "EMAIL ADDRESS IS TOO SHORT"],
      maxLengt: [30, "EMAIL ADDRESS IS TOO LONG"],
      unique: [true, "EMAIL ADDRESS ALREADY EXISTS"],
    },
    password: {
      type: String,
      req: [true, "PASSWORD IS REQUIRED"],
      minLength: [7, "PASSWORD IS TOO SHORT"],
      maxLengt: [30, "PASSWORD IS TOO LONG"],
    },
  },
  { timestapms: true }
);

// SAVE THE PASSWORD AS HASHED
teacherSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// CREATE JWT METHOD AND RETURN THEM AS AN OBJECT
teacherSchema.methods.genJWT = function () {
  const access_token = jwt.sign(
    {
      teacherID: this._id,
      name: this.name,
      surname: this.surname,
      email: this.email,
    },
    process.env.ACCESS_SECRET,
    { expiresIn: "5m" }
  );
  const refresh_token = jwt.sign(
    {
      teacherID: this._id,
      name: this.name,
      surname: this.surname,
      email: this.email,
    },
    process.env.REFRESH_SECRET,
    { expiresIn: "180d" }
  );
  return { access_token, refresh_token };
};

module.exports = mongoose.model("Teachers", teacherSchema);
