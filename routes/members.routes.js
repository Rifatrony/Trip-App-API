const express = require("express");
const { addMember, getMembers, addMoney, withdrawMoneyFromMember, deleteMember } = require("../controller/member.controller");
const checkLogin = require("../middlewear/auth");
const router = express.Router();

router.post("/add/:tour_id", checkLogin, addMember);
router.get("/all/:tour_id", checkLogin, getMembers);
router.put("/add-money/:id", checkLogin, addMoney);
router.put("/withdraw-money/:id", checkLogin, withdrawMoneyFromMember);
router.delete("/delete/:id", checkLogin, deleteMember);

module.exports = router;
