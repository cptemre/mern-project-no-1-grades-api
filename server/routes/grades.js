const express = require('express');
const router = express.Router()

const { getAll, getStudent,createGrade } = require("../controllers/grades");

router.route("/").get(getAll).post(createGrade);
router.route("/:id").get(getStudent);

module.exports = router