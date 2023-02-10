const express = require('express');
const router = express.Router()

const sign_in = require("../controllers/sign-in");
const log_in = require("../controllers/log-in");

router.post("/sign_in", sign_in);
router.post("/log_in", log_in);

module.exports = router