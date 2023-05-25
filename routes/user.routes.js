const express = require("express");
const { userRegistration, userLogin } = require("../controller/user.controller");
const router = express.Router();


router.post("/registration", userRegistration);
router.post("/login", userLogin);

module.exports = router;
