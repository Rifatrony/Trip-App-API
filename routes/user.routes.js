const express = require("express");
const { userRegistration, userLogin, userProfile, check } = require("../controller/user.controller");
const checkLogin = require("../middlewear/auth");
const router = express.Router();


router.post("/registration", userRegistration);
router.post("/login", userLogin);
router.get("/check", check);
router.get("/profile", checkLogin, userProfile);

module.exports = router;
