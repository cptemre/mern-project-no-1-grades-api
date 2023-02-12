const Grades = require("../models/Grades");
const { Not_Found, Bad_Request } = require("../errors");

// * GET ALL RESULTS
const getAll = async (req, res) => {
  const { studentNo, name, surname, email, lesson, grade, semester } =
    req.query;
  const { teacherID, access_token } = req.user;
  try {
    // FIND RAW RESULT
    let search = Grades.find({
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

// * CREATE A NEW GRADE BY CHECKING IF IT EXISTS FIRST
// TODO - CHECK IN CLIENT TO GET NOT EMPTY INFORMATION
const createGrade = async (req, res) => {
  const { teacherID, access_token } = req.user;
  req.body.createdBy = teacherID;
  const student = await Grades.findOne({...req.body});
  if (student) throw new Bad_Request('GRADE ALREADY EXISTS')
  else {
    await Grades.create({ ...req.body, createdBy: teacherID });
    res.status(200).json({ msg: "GRADE IS CREATED", access_token });
  }
};

// * FIND ONE STUDENT ONLY
const getStudent = async (req, res) => {
  const {
    user: { teacherID, access_token },
    params: {
      id: { studentID },
    },
  } = req;

  try {
    // FIND STUDENT BY ID AND SEND IT AS AN ARRAY TO THE CLIENT
    const result = await Grades.find({ studentID, createdBy: teacherID });
    res.status.json({ result, access_token });
  } catch (error) {
    throw new Not_Found("STUDENT DOES NOT EXIST");
  }
};

module.exports = { getAll, getStudent, createGrade };
