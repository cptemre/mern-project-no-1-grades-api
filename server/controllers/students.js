const Students = require("../models/Students");
const { Not_Found, Bad_Request } = require("../errors");

// * CREATE A NEW STUDENT
const createStudent = async (req, res) => {
  const { access_token } = req.user;
  await Students.create({ ...req.body });
  res.status(200).json({ msg: "STUDENT IS CREATED", access_token });
};

// * CHECK IF THE GRADE ALREADY EXISTS WITH STUDENTID AND LESSON
// * THEN UPDATE THE WHOLE GRADE BY REQ.BODY
const updateStudent = async (req, res) => {
  const { teacherID, access_token } = req.user;
  const createdBy = teacherID;
  // * SET CREATED BY TO LESSON
  // ! ONLY CHANGE THE ONE SENT FROM THE CLIENT NOT ALL
  // LESSON KEY
  const lesson = Object.keys(req.body.lessons)[
    Object.keys(req.body.lessons).length - 1
  ];
  // CHANGE LESSON'S VALUE FOR CREATEDBY
  req.body.lessons[lesson] = { ...req.body.lessons[lesson], createdBy };
  const { id: studentID } = req.params;
  try {
    await Students.updateOne(
      { _id: studentID, createdBy: teacherID },
      { ...req.body },
      { runValidators: true, new: true }
    );
    res.status(200).json({ msg: "STUDENT IS UPDATED", access_token });
  } catch (error) {
    throw new Bad_Request("UPDATE FAILED");
  }
};

// * FIND ONE STUDENT ONLY
const getStudent = async (req, res) => {
  const {
    user: { teacherID, access_token },
    params: { id: studentID },
  } = req;
  let student = await Students.findOne({ _id: studentID });
  let lessons = {};
  if (student && student.lessons !== {}) {
    for (let i = 0; i < Object.keys(student.lessons).length; i++) {
      // LESSON NAME
      const lesson = Object.keys(student.lessons)[i];
      // CHECK IF THE LESSON IS CREATED BY THE THEACER
      if (student.lessons[lesson].createdBy === teacherID) {
        // SET LESSONS KEY TO MATCHED LESSON VALUES
        lessons[lesson] = student.lessons[lesson];
      }
    }
    student.lessons = lessons;
    console.log(student);
    res.status(200).json({ student, access_token });
  } else {
    throw new Bad_Request("STUDENT IS NOT EXIST");
  }
};

// * GET ALL STUDENTS RELATED TO THE TEACHER
const getAll = async (req, res) => {
  const { teacherID, access_token } = req.user;
  // FIND RAW RESULT
  let search = Students.find();
  // SET SKIP METHOD TO SEE STUDENTS ON PAGE AS 9
  const page = Number(req.query.page) || 1;
  const limit = 9;
  const skip = (page - 1) * limit;

  search = await search.skip(skip).sort({ updatedAt: 1 });

  // * DELETE EVERY LESSON WHICH TEACHER DIDNT MARK FOR THE STUDENT
  // * CLIENT WILL GET ONLY RELATED LESSONS BUT DB WILL KEEP ALL
  for (let i = 0; i < search.length; i++) {
    for (const lessonKey in search[i]["lessons"]) {
      const lesson = search[i]["lessons"][lessonKey];
      if (lesson.createdBy && lesson.createdBy !== teacherID) {
        delete search[i].lessons[lessonKey];
      }
    }
  }
  res.status(200).json({ search, access_token });
};

module.exports = { getAll, getStudent, createStudent, updateStudent };
