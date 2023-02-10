const Teachers = require("../models/Teachers");
const bcrypt = require("bcryptjs");
const { Bad_Request } = require("../errors");

const login = async (req, res) => {
  const { email, password } = req.body;
  // FIND THE TEACHER, COMPARE PASSWORD AND SEND RESPOND OR ERROR ACCORDING TO PASSWORD
  const teacher = await Teachers.findOne({ email });
  if (teacher) {
    const decoded = await bcrypt.compare(password, teacher.password);
    if (decoded) {
      const jwt = teacher.genJWT();
      // ! SUCCESS RESPOND IS MSG AND JWT. SAVE ACCESS TOKEN TO APP AND REFRESH TOKEN TO COOKIES
      res.status(200).json({ msg: "SUCCESSFULY LOGGED IN", jwt });
    } else {
      throw new Bad_Request("PASSWORD IS WRONG");
    }
  } else {
    throw new Bad_Request("EMAIL ADDRESS IS WRONG");
  }
};

module.exports = login;
