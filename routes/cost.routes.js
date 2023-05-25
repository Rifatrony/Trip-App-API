const express = require("express");
const { addCost, getCost } = require("../controller/cost.controller");
const checkLogin = require("../middlewear/auth");

const router = express.Router();

router.post("/add/:tour_id", checkLogin, addCost);
router.get("/all/:tour_id", checkLogin, getCost);

module.exports = router;
