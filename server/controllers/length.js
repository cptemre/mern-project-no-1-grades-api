const Teachers = require("../models/Teachers");
const Students = require("../models/Students");

const teachersLength = async (req, res) => {
  const { access_token } = req.user;
  const result = await Teachers.find().countDocuments({});
  res.status(200).json({ result, access_token, teachersLength: true });
};

const studentsLength = async (req, res) => {
  const { access_token } = req.user;
  const result = await Teachers.find().countDocuments({});
  res.status(200).json({ result, access_token, studentsLength: true });
};

module.exports = { teachersLength, studentsLength };
