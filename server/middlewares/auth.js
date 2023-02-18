const { Unauthorized } = require("../errors");
const jwt = require("jsonwebtoken");
const Blacklist = require("../models/Blacklist");

// FUNCTIONS
const create_new_access_token = require("../functions/create-new-access-token");
const compare_tokens = require("../functions/compare-tokens");
// TODO CHANGE REFRESH TOKEN REQUEST WAY
const auth = async (req, res, next) => {
  // CHECK HEADER
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Unauthorized("ACCESS DENIED");
  }

  // GET ACCESS TOKEN
  const access_token = authHeader.split(" ")[1];

  // CHECK IF THERE IS ACCESS TOKEN
  if (!access_token) {
    throw new Unauthorized("AUTHORIZATION DENIED");
  }

  try {
    // VERIFIY ACCESS TOKEN
    const access_verify = jwt.verify(access_token, process.env.ACCESS_SECRET);
    const { ID, name, surname, email,title } = access_verify;
    const access_token = await create_new_access_token(
      ID,
      name,
      surname,
      email,
    );
    req.user = { ID, access_token, email, title };
  } catch (error) {
    // IF ACCESS TOKEN IS EXPIRED THEN VERIFY REFRESH TOKEN
    try {
      // GET REFRESH TOKEN FROM CLIENT
      const refresh_token = authHeader.split(" ")[2];
      // COMPARE ACCESS AND REFRESH TOKENS
      const { isMatch, refresh_verify } = await compare_tokens(
        access_token,
        refresh_token
      );
      // CONTINUE IF THEY MATCH
      if (isMatch) {
        // CHECK IF REFRESH TOKEN IS IN THE BLACKLIST. IF SO DONT ALLOW TO AUTHORIZATION
        const blacklistToken = await Blacklist.find({ refresh_token });
        console.log(blacklistToken);
        if (!blacklistToken.length) {
          // TEACHER'S VERIFIED INFORMATION
          const { ID, name, surname, email,title } = refresh_verify;
          // FIND THE TEACHER, CREATE NEW ACCESS TOKEN
          const access_token = await create_new_access_token(
            ID,
            name,
            surname,
            email,
          );
          // SEND THE INFORMATION TO THE NEXT
          req.user = { ID, access_token, email, title };
        } else {
          throw new Unauthorized("AUTHORIZATION DENIED");
        }
      } else {
        throw new Unauthorized("AUTHORIZATION DENIED");
      }
    } catch (error) {
      console.log(error);
      throw new Unauthorized("AUTHORIZATION DENIED");
    }
  }
  next();
};

module.exports = auth;
