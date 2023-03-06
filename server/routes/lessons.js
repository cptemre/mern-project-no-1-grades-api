const express = require("express");
const router = express.Router();

const {
  createLesson,
  getLessons,
  updateLesson,
  deleteLesson,
} = require("../controllers/lessons");

router.route("/").post(createLesson).get(getLessons);
router.route("/:_id").patch(updateLesson).delete(deleteLesson);

module.exports = router;
