// REQUIRES
require("dotenv").config();
require("express-async-errors");

// EXPRESS
const express = require("express");
const app = express();

// DATABASE
const connectDB = require("./database/connectDB");

// PORT
const port = 5000 || process.env.PORT;

// MIDDLEWARES
const error_handler = require("./middlewares/error-handler");
const auth = require("./middlewares/auth");
const teacherAuth = require("./middlewares/teacherAuth");

// * ROUTES
// USER'S ROUTE
const userRoute = require("./routes/user");
// STUDENTS' ROUTE
const studentsRoute = require("./routes/students");
// TEACHERS' ROUTE
const teachersRoute = require("./routes/teachers");
// LENGTH ROUTE
const lengthRoute = require("./routes/length");

app.use(express.json());

// USER PATHS
app.use("/api/v1/user", userRoute);
app.use("/api/v1/students", auth, studentsRoute);
app.use("/api/v1/teachers", auth, teacherAuth, teachersRoute);
app.use("/api/v1/length", auth, teacherAuth, lengthRoute);
// ERRORS
app.use(error_handler);
app.use(
  ("*", (req, res) => res.status(404).json({ msg: "PAGE DOES NOT EXIST" }))
);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => `SERVER IS LISTENING ON ${port}`);
  } catch (error) {
    console.log(error);
  }
};

start();
