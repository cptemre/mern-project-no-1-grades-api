const Teachers = require("../models/Teachers");

const create_new_access_token = async (ID, name, surname, email) => {
  if (email.endsWith("@edu.ga.pl")) {
    const student = await Teachers.findOne({
      ID,
    });
    if (student) {
      const { access_token } = student.genJWT();
      return access_token;
    }
  } else {
    console.log(ID, name, surname, email);
    const teacher = await Teachers.findOne({
      ID,
    });
    if (teacher) {
      const { access_token } = teacher.genJWT();
      return access_token;
    }
    console.log(teacher);
  }
};

module.exports = create_new_access_token;
