const Teachers = require("../models/Teachers");
const { Bad_Request, Unauthorized } = require("../errors");
const bcrypt = require("bcryptjs");
// ! TEACHER CAN UPDATE ITSELF BUT ADMIN CAN UPDATE ALL OF THEM
const updateTeacher = async (req, res) => {
  const { access_token } = req.user;
  const { _id } = req.params;
  // CRYPT PASSWORD IF CHANGED
  let { password } = req.body;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    req.body.password = await password;
  }
  const teacher = await Teachers.updateOne({ _id }, req.body, {
    runValidators: true,
    new: true,
  });
  if (teacher.modifiedCount) {
    res.status(200).json({ msg: "UPDATED", access_token });
  } else {
    throw new Bad_Request("TEACHER COULD NOT UPDATED");
  }
};

const deleteTeacher = async (req, res) => {
  const { email, access_token } = req.user;
  const { _id } = req.params;
  if (email === "admin@ga.pl") {
    const teacher = await Teachers.deleteOne({ _id });
    if (teacher.deletedCount) {
      res.status(200).json({ msg: "DELETED", access_token });
    } else {
      throw new Bad_Request("TEACHER COULD NOT DELETED");
    }
  } else {
    // THROW ERROR IF IT IS NOT AN ADMIN
    throw new Unauthorized("AUTHORIZATION DENIED");
  }
};

const getAllTeachers = async (req, res) => {
  const { email } = req.user;
  // IF THERE IS A QUERY ADD IT TO QUERY OBJECT TO FIND
  const { name, surname, teacherEmail, branches, createdAt, sortValue, pageValue } =
    req.query;
  const query = {};

  if (name) {
    query.name = name;
  }
  if (surname) {
    query.surname = surname;
  }
  if (teacherEmail) {
    query.teacherEmail = teacherEmail;
  }
  if (branches) {
    query.branches = branches;
  }
  if (createdAt) {
    query.createdAt = createdAt;
  }

  if (email === "admin@ga.pl") {
    const accounts = Teachers.find(query).select("-password");

    // CREATE SORT AND SKIP VARIABLES
    const sort = sortValue || "createdAt";
    const page = pageValue || 0
    const skip = page * 10

    const teacher = await accounts.sort(sort).skip(skip);

    if (teacher.length) {
      res.status(200).json(teacher);
    } else {
      throw new Bad_Request("THERE ARE NO TEACHERS IN DATABASE");
    }
  } else {
    throw new Unauthorized("AUTHORIZATION DENIED");
  }
};

const getSingleTeacher = async (req, res) => {
  const { email, access_token } = req.user;
  const { teacherEmail } = req.params;
  if (email === "admin@ga.pl") {
    const teacher = await Teachers.findOne({ email: teacherEmail });
    if (teacher) {
      res.status(200).json({ teacher, access_token });
    } else {
      throw new Bad_Request(`${teacherEmail} IS NOT IN OUR DATABASE`);
    }
  } else {
    throw new Unauthorized("AUTHORIZATION DENIED");
  }
};

module.exports = {
  updateTeacher,
  deleteTeacher,
  getAllTeachers,
  getSingleTeacher,
};
