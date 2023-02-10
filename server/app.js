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
// ROUTES
const userRoute = require("./routers/user");
const studentsRoute = require("./routers/students");

app.use(express.json());

// USER PATHS
app.use("/api/v1/user", userRoute);
app.use("/api/v1/students", auth, studentsRoute);
app.use(error_handler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => `SERVER IS LISTENING ON ${port}`);
  } catch (error) {
    console.log(error);
  }
};

start();
