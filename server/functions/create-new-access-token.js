const Teachers = require("../models/Teachers");

const create_new_access_token = async (ID, name, surname, email) => {
  if (email.endsWith("@edu.ga.pl")) {
    const student = await Teachers.findOne({
      ID,
      name,
      surname,
      email,
    });
    const { access_token } = student.genJWT();
    return access_token;
  } else {
    const teacher = await Teachers.findOne({
      ID,
      name,
      surname,
      email,
    });
    const { access_token } = teacher.genJWT();
    return access_token;
  }
};

module.exports = create_new_access_token;
