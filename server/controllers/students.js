const Students = require("../models/Students");
const { Not_Found, Bad_Request } = require("../errors");

// * GET ALL RESULTS
const getAll = async (req, res) => {
  const { studentNo, name, surname, email, lesson, grade, semester } =
    req.query;
  const { teacherID, access_token } = req.user;
  try {
    // FIND RAW RESULT
    let search = Students.find({
      studentNo,
      name,
      surname,
      email,
      lesson,
      grade,
      semester,
      createdBy: teacherID,
    });
    // SET SKIP METHOD TO SEE STUDENTS ON PAGE AS 9
    const page = Number(req.query.page) || 1;
    const limit = 9;
    const skip = (page - 1) * limit;

    search = search.skip(skip).sort(updatedAt);

    const result = await search;

    res.status(200).json({ result, access_token });
  } catch (error) {
    throw new Not_Found("STUDENT DOES NOT EXIST");
  }
};

// * CREATE A NEW STUDENT
const createStudent = async (req, res) => {
  const { teacherID, access_token } = req.user;
  req.body.createdBy = teacherID;
  await Students.create({ ...req.body, createdBy: teacherID });
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
  await Students.updateOne(
    { _id: studentID, createdBy: teacherID },
    { ...req.body },
    { runValidators: true, new: true }
  );
  res.status(200).json({ msg: "STUDENT IS UPDATED", access_token });
};

// * FIND ONE STUDENT ONLY
const getStudent = async (req, res) => {
  const {
    user: { teacherID, access_token },
    body: { studentNo },
  } = req;

  try {
    // FIND STUDENT BY ID AND SEND IT AS AN ARRAY TO THE CLIENT
    const result = await Students.find({ studentNo, createdBy: teacherID });
    res.status.json({ result, access_token });
  } catch (error) {
    throw new Not_Found("STUDENT DOES NOT EXIST");
  }
};

module.exports = { getAll, getStudent, createStudent, updateStudent };
