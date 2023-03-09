const Students = require("../models/Students");
const { Bad_Request, Unauthorized } = require("../errors");

// * CREATE A NEW STUDENT
const createStudent = async (req, res) => {
  const { access_token, email } = req.user;
  if (email === "admin@ga.pl") {
    console.log(req.body);
    await Students.create({ ...req.body });
    res.status(200).json({ msg: "STUDENT IS CREATED", access_token });
  } else {
    throw new Unauthorized("AUTHORIZATION DENIED");
  }
};

// * CHECK IF THE GRADE ALREADY EXISTS WITH STUDENTID AND LESSON
// * THEN UPDATE THE WHOLE GRADE BY REQ.BODY
const updateStudent = async (req, res) => {
  const { access_token } = req.user;
  const { _id } = req.params;

  // * SET CREATED BY TO LESSON
  // ! ONLY CHANGE THE ONE SENT FROM THE CLIENT NOT ALL

  const result = await Students.updateOne(
    { _id },
    { ...req.body },
    { runValidators: true, new: true }
  );
  if (result.modifiedCount) {
    res.status(200).json({ result, access_token });
  } else {
    throw new Bad_Request("UPDATE FAILED");
  }
};

// * FIND ONE STUDENT ONLY
const getStudent = async (req, res) => {
  const {
    user: { ID, access_token },
    params: { _id: studentID },
  } = req;
  let result = await Students.findOne({
    _id: studentID,
  }).select("-password");
  if (result) {
    res.status(200).json({ result, access_token, student: true });
  } else {
    throw new Bad_Request("STUDENT IS NOT EXIST");
  }
};
// * FIND ONE STUDENT BY NO ONLY
const getStudentNo = async (req, res) => {
  const {
    user: { access_token },
    query: { studentNo },
  } = req;
  let result = await Students.find({
    studentNo: { $regex: studentNo },
  }).select("-password");
  if (result) {
    res.status(200).json({ result, access_token, studentNo: true });
  } else {
    throw new Bad_Request("STUDENT IS NOT EXIST");
  }
};
// * GET ALL STUDENTS RELATED TO THE TEACHER
const getAll = async (req, res) => {
  const { access_token } = req.user;
  let { lessonID, teacherID } = req.query;
  const query = { lessons: { lessonID: "", teacherID: "" } };
  let student = false;

  if (lessonID) {
    student = true;
    query.lessons.lessonID = lessonID;
  }
  if (teacherID) {
    query.lessons.teacherID = teacherID;
  }
  // FIND RAW RESULT
  let search = Students.find({ query }).select("-password");
  // SET SKIP METHOD TO SEE STUDENTS ON PAGE AS 9
  const page = Number(req.query.page) || 1;
  const limit = 9;
  const skip = (page - 1) * limit;
  result = await search.skip(skip).sort({ createdAt: 1 });

  res.status(200).json({ result, access_token, student });
};

// * DELETE STUDENT COMPLETLY FROM DB
// SEND MSG IF DELETED
// THROW AN ERROR IF NOT DELETED
const deleteStudent = async (req, res) => {
  const { access_token, email } = req.user;

  const { _id } = req.params;
  if (email === "admin@ga.pl") {
    const student = await Students.deleteOne({ _id });
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
  getStudentNo,
  createStudent,
  updateStudent,
  deleteStudent,
};
