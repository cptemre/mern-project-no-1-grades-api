const Teachers = require("../models/Teachers");
const validator = require("validator");
const { Bad_Request } = require("../errors");

const sign_in = async (req, res) => {
  const { name, surname, email, password,branches } = req.body;
  if (validator.isEmail(email)) {
    await Teachers.create({
      name,
      surname,
      email,
      password,
      branches
    });
    res.status(200).json({ msg: `ACCOUNT FOR ${name} ${surname} IS CREATED` });
  } else {
    throw new Bad_Request("EMAIL IS NOT VALID");
  }
};

module.exports = sign_in;
