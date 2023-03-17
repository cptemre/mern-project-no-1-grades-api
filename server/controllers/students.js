const Students = require("../models/Students");
const { Bad_Request, Unauthorized } = require("../errors");

// * CREATE A NEW STUDENT
const createStudent = async (req, res) => {
  const { access_token, email } = req.user;
  if (email === "admin@ga.pl") {
    await Students.create({ ...req.body });
    res.status(200).json({ msg: "CREATED", access_token });
  } else {
    throw new Unauthorized("AUTHORIZATION DENIED");
  }
};

// * CHECK IF THE GRADE ALREADY EXISTS WITH STUDENTID AND LESSON
// * THEN UPDATE THE WHOLE GRADE BY REQ.BODY
const updateStudent = async (req, res) => {
  const { access_token } = req.user;
  const { _id } = req.params;

  const result = await Students.updateOne(
    { _id },
    { ...req.body },
    {
      runValidators: true,
      new: true,
    }
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
// * GET STUDENTS BY TEACHER AND LESSON
const getByID = async (req, res) => {
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
  const sort = { createdAt: 1 };

  const result = await search.sort(sort);
  res.status(200).json({ result, access_token, student });
};

// * GET ALL STUDENTS RELATED TO SEARCH PARAMS
const getAll = async (req, res) => {
  const { access_token } = req.user;
  let { lessonID, teacherID } = req.query;
  const { name, surname, email, branches, createdAt, sortValue, pageValue } =
    req.query;
  const queryLesson = { lessons: { lessonID: "", teacherID: "" } };
  const query = {};
  let student = false;
  if (name) {
    query.name = name;
  }
  if (surname) {
    query.surname = surname;
  }
  if (email) {
    query.email = email;
  }
  if (branches) {
    query.branches = branches;
  }
  if (createdAt) {
    // CREATE 24H DATE SPACE TO FIND
    let splitDate = createdAt.split("-");

    if (splitDate.length === 2) {
      splitDate = splitDate[2] + "," + splitDate[1] + "," + splitDate[0];
    }
    const dateStart = new Date(
      Number(splitDate[2]),
      Number(splitDate[1]) - 1,
      Number(splitDate[0])
    );
    const dateEnd = new Date(
      Number(splitDate[2]),
      Number(splitDate[1]) - 1,
      Number(splitDate[0]) + 1
    );
    query.createdAt = { $gte: dateStart, $lte: dateEnd };
  }

  if (lessonID) {
    student = true;
    queryLesson.lessons.lessonID = lessonID;
  }
  if (teacherID) {
    queryLesson.lessons.teacherID = teacherID;
  }
  // FIND RAW RESULT
  let search = Students.find(query).select("-password");
  let sortSplit;
  if (sortValue) {
    sortSplit = sortValue.split("_");
  }
  if (sortSplit && sortSplit[0] === "number") {
    sortSplit[0] = "studentNo";
  }
  if (sortSplit && sortSplit[0] === "date") sortSplit[0] = "createdAt";

  if (sortSplit) {
    sortSplit = { [sortSplit[0]]: Number(sortSplit[1]) };
  }
  const sort = sortSplit || { createdAt: 1 };

  const result = await search
    .sort(sort)
    .skip(Number((pageValue - 1) * 10))
    .limit(10);
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
  getByID,
  createStudent,
  updateStudent,
  deleteStudent,
};
