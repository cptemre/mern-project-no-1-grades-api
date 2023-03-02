const express = require("express");
const router = express.Router();

const { teachersLength, studentsLength } = require("../controllers/length");

router.get("/teachersLength", teachersLength);
router.get("/studentsLength", studentsLength);

module.exports = router;
