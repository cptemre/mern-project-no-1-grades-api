const { Bad_Request } = require("../errors");
const Lessons = require("../models/Lessons");

const createLesson = async (req, res) => {
  const { lesson, semester } = req.body;
  const { email, access_token } = req.user;
  if (email === "admin@ga.pl") {
    await Lessons.create({ lesson, semester });
    res.status(200).json({
      msg: `${lesson} FOR SEMESTER ${semester} IS CREATED`,
      access_token,
    });
  } else {
    throw new Bad_Request("ADMIN LOGIN IS REQUIRED");
  }
};

const getLessons = async (req, res) => {
  const { access_token } = req.user;
  const result = await Lessons.find({});
  res.status(200).json({ result, access_token, lesson: true });
};

const updateLesson = async (req, res) => {
  const { lesson, semester } = req.body;
  const { _id } = req.params;
  const { email, access_token } = req.user;
  const query = {};
  if (lesson) {
    query.lesson = lesson;
  }
  if (semester) {
    query.semester = semester;
  }
  if (email === "admin@ga.pl") {
    const result = await Lessons.updateOne(
      { _id },
      { ...query },
      { runValidators: true, new: true }
    );
    if (result.modifiedCount) {
      res.status(200).json({ msg: "UPDATED", access_token, lesson: true });
    } else {
      throw new Bad_Request("LESSON COULD NOT UPDATED");
    }
  } else {
    throw new Bad_Request("ADMIN LOGIN IS REQUIRED");
  }
};

const deleteLesson = async (req, res) => {
  const { _id } = req.params;
  const { email, access_token } = req.user;
  if (email === "admin@ga.pl") {
    const result = await Lessons.deleteOne({ _id });
    if (result.deletedCount) {
      res.status(200).json({ msg: "DELETED", access_token, lesson: true });
    } else {
      throw new Bad_Request("LESSON COULD NOT DELETED");
    }
  } else {
    throw new Bad_Request("ADMIN LOGIN IS REQUIRED");
  }
};

module.exports = {
  createLesson,
  getLessons,
  updateLesson,
  deleteLesson,
};
