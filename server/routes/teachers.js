const express = require('express');
const router = express.Router()

const {updateTeacher,deleteTeacher, getAllTeachers, getSingleTeacher} = require('../controllers/teachers');

router.route('/').get(getAllTeachers)
router
  .route("/:teacherEmail")
  .delete(deleteTeacher)
  .get(getSingleTeacher)
  .patch(updateTeacher);

module.exports = router