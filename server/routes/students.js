const express = require("express");
const router = express.Router();

const {
  getAll,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
} = require("../controllers/students");

const teacherAuth = require('../middlewares/teacherAuth');

router.route("/").get(teacherAuth,getAll).post(teacherAuth,createStudent);
router.route("/:_id").get(getStudent).patch(teacherAuth,updateStudent).delete(teacherAuth,deleteStudent);
module.exports = router;
