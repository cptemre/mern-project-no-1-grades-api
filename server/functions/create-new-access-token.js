const Teachers = require("../models/Teachers");

const create_new_access_token = async (teacherID, name, surname, email) => {
  try {
    const teacher = await Teachers.findOne({
      teacherID,
      name,
      surname,
      email,
    });
    const { access_token } = teacher.genJWT();
    return access_token;
  } catch (error) {
    // ERROR HANDLING MIDDLEWARE WILL SEND AN INTERNAL SERVER ERROR WITH AN ERROR MESSAGE
    console.log(error);
  }
};

module.exports = create_new_access_token;
