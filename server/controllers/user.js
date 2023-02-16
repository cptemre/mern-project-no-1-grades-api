const Teachers = require("../models/Teachers");
const Students = require("../models/Students");
const Blacklist = require("../models/Blacklist");
const bcrypt = require("bcryptjs");
const { Bad_Request } = require("../errors");
const validator = require("validator");

const sign_in = async (req, res) => {
  const { name, surname, email, password, branches } = req.body;
  if (validator.isEmail(email)) {
    await Teachers.create({
      name,
      surname,
      email,
      password,
      branches,
    });
    res.status(200).json({ msg: `ACCOUNT FOR ${name} ${surname} IS CREATED` });
  } else {
    throw new Bad_Request("EMAIL IS NOT VALID");
  }
};
const login = async (req, res) => {
  const { email, password, title } = req.body;
  // FIND THE TEACHER, COMPARE PASSWORD AND SEND RESPOND OR ERROR ACCORDING TO PASSWORD
  let account;
  if (title === "teacher") {
    account = await Teachers.findOne({ email });
  } else {
    account = await Students.findOne({ email });
  }
  if (!title) {
    throw new Bad_Request("CHOOSE A TITLE");
  }
  if (account) {
    const decoded = await bcrypt.compare(password, account.password);
    if (decoded) {
      const jwt = account.genJWT();
      // ! SUCCESS RESPOND IS MSG AND JWT. SAVE ACCESS TOKEN TO APP AND REFRESH TOKEN TO COOKIES
      res.status(200).json({ msg: "LOGGED IN", jwt });
    } else {
      throw new Bad_Request("PASSWORD IS WRONG");
    }
  } else {
    throw new Bad_Request("EMAIL IS WRONG");
  }
};

const logout = async (req, res) => {
  // CHECK HEADER
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Unauthorized("ACCESS DENIED");
  }
  // GET ACCESS TOKEN
  const access_token = authHeader.split(" ")[1];
  const refresh_token = authHeader.split(" ")[2];
  await Blacklist.create({ token: refresh_token }, { token: access_token });
  res.status(200).json({ msg: "SUCCESSFULLY LOGGED OUT" });
};

module.exports = { sign_in, login, logout };
