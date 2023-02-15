const express = require("express");
const router = express.Router();

const { sign_in, login, logout } = require("../controllers/user");

router.post("/sign_in", sign_in);
router.post("/log_in", login);
router.post("/logout", logout);
module.exports = router;
