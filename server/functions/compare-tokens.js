const jwt = require("jsonwebtoken");

const compare_tokens = async (access_token, refresh_token) => {
  // VERIFY REFRESH TOKEN
  const refresh_verify = jwt.verify(refresh_token, process.env.REFRESH_SECRET);
  // GET EXPIRED INFORMATION
  const access_decode = jwt.decode(access_token, process.env.ACCESS_SECRET);
  // COMPARE EXPIRED ACCESS TOKEN AND REFRESH TOKEN INFORMATION
  const isMatch =
    refresh_verify.ID === access_decode.ID &&
    refresh_verify.name === access_decode.name &&
    refresh_verify.surname === access_decode.surname &&
    refresh_verify.email === access_decode.email &&
    refresh_verify.password === access_decode.password &&
    refresh_verify.title === access_decode.title;
  return { isMatch, refresh_verify };
};

module.exports = compare_tokens;
