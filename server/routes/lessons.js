const express = require("express");
const router = express.Router();

const {
  createLesson,
  getLessons,
  updateLesson,
  deleteLesson,
  getBranches,
} = require("../controllers/lessons");

router.route("/").post(createLesson).get(getLessons);
router.route("/:_id").patch(updateLesson).delete(deleteLesson);
router.route("/branches").get(getBranches);

module.exports = router;
