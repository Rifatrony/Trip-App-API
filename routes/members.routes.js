const express = require("express");
const { addMember, getMembers } = require("../controller/user.controller");
const checkLogin = require("../middlewear/auth");
const router = express.Router();


router.post("/add/:tour_id", checkLogin, addMember);
router.get("/all", checkLogin, getMembers);

module.exports = router;