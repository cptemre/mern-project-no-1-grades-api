const express = require("express");
const router = express.Router();

const {
  getAll,
  getStudent,
  createStudent,
  updateStudent,
} = require("../controllers/students");

router.route("/").get(getAll).post(createStudent);
router.route("/:id").patch(updateStudent);

module.exports = router;
