const express = require("express");
const router = express.Router();

const {
  getAll,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
} = require("../controllers/students");

router.route("/").get(getAll).post(createStudent);
router.route("/:id").get(getStudent).patch(updateStudent).delete(deleteStudent);
module.exports = router;
