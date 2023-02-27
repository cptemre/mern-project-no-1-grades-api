const Students = require("../models/Students");
const { Bad_Request, Unauthorized } = require("../errors");

// * CREATE A NEW STUDENT
const createStudent = async (req, res) => {
  const { access_token, email } = req.user;
  if (email === "admin@ga.pl") {
    await Students.create({ ...req.body });
    res.status(200).json({ msg: "STUDENT IS CREATED", access_token });
  } else {
    throw new Unauthorized("AUTHORIZATION DENIED");
  }
};

// * CHECK IF THE GRADE ALREADY EXISTS WITH STUDENTID AND LESSON
// * THEN UPDATE THE WHOLE GRADE BY REQ.BODY
const updateStudent = async (req, res) => {
  const { ID, access_token } = req.user;
  const createdBy = ID;
  // * SET CREATED BY TO LESSON
  // ! ONLY CHANGE THE ONE SENT FROM THE CLIENT NOT ALL
  // LESSON KEY
  const lesson = Object.keys(req.body.lessons)[
    Object.keys(req.body.lessons).length - 1
  ];
  // CHANGE LESSON'S VALUE FOR CREATEDBY
  req.body.lessons[lesson] = { ...req.body.lessons[lesson], createdBy };
  const { id: studentID } = req.params;
  const student = await Students.updateOne(
    { _id: studentID, createdBy: ID },
    { ...req.body },
    { runValidators: true, new: true }
  );
  if (student.modifiedCount) {
    res.status(200).json({ msg: "STUDENT IS UPDATED", access_token });
  } else {
    throw new Bad_Request("UPDATE FAILED");
  }
};

// * FIND ONE STUDENT ONLY
const getStudent = async (req, res) => {
  const {
    user: { ID, access_token },
    params: { id: studentID },
  } = req;
  let result = await Students.findOne({ _id: studentID });
  let lessons = {};
  if (result && result.lessons !== {}) {
    for (let i = 0; i < Object.keys(result.lessons).length; i++) {
      // LESSON NAME
      const lesson = Object.keys(result.lessons)[i];
      // CHECK IF THE LESSON IS CREATED BY THE THEACER
      if (
        result.lessons[lesson].createdBy &&
        result.lessons[lesson].createdBy === ID
      ) {
        // SET LESSONS KEY TO MATCHED LESSON VALUES
        lessons[lesson] = result.lessons[lesson];
      }
    }
    result.lessons = lessons;
    res.status(200).json({ result, access_token });
  } else {
    throw new Bad_Request("STUDENT IS NOT EXIST");
  }
};

// * GET ALL STUDENTS RELATED TO THE TEACHER
const getAll = async (req, res) => {
  const { access_token } = req.user;
  let { lesson } = req.query;
  lesson = lesson.replace(/_/g, ' ')
  console.log(lesson);
  // FIND RAW RESULT
  let search = Students.find({lessons: {lesson}});
  // SET SKIP METHOD TO SEE STUDENTS ON PAGE AS 9
  const page = Number(req.query.page) || 1;
  const limit = 9;
  const skip = (page - 1) * limit;

  result = await search.skip(skip).sort({ createdAt: 1 });
  console.log(result);
  res.status(200).json({ result, access_token, student: true });
};

// * DELETE STUDENT COMPLETLY FROM DB
// SEND MSG IF DELETED
// THROW AN ERROR IF NOT DELETED
const deleteStudent = async (req, res) => {
  const { access_token, email } = req.user;

  const { _id } = req.params;
  if (email === "admin@ga.pl") {
    const student = await Students.deleteOne({ _id });
    console.log(student);
    if (student.deletedCount) {
      res.status(200).json({ msg: "STUDENT IS DELETED", access_token });
    } else {
      throw new Bad_Request("STUDENT IS NOT DELETED");
    }
  }
};

module.exports = {
  getAll,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};
