const express = require("express");
const { addMember, getMembers } = require("../controller/member.controller");
const checkLogin = require("../middlewear/auth");
const router = express.Router();


router.post("/add/:tour_id", checkLogin, addMember);
router.get("/all/:tour_id", checkLogin, getMembers);

module.exports = router;
