const express = require("express");
const checkLogin = require("../middlewear/auth");
const { addTour } = require("../controller/user.controller");
const router = express.Router();


router.post("/add", checkLogin, addTour);

module.exports = router;
