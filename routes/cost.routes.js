const express = require("express");
const { addCost, getCost, deleteCost } = require("../controller/cost.controller");
const checkLogin = require("../middlewear/auth");

const router = express.Router();

router.post("/add/:tour_id", checkLogin, addCost);
router.get("/all/:tour_id", checkLogin, getCost);
router.delete("/delete/:id", checkLogin, deleteCost);

module.exports = router;
