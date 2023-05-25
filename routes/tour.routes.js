const express = require("express");
const checkLogin = require("../middlewear/auth");
const { addTour, getMyTour } = require("../controller/tour.controller");
const router = express.Router();


router.post("/add", checkLogin, addTour);
router.get("/all", checkLogin, getMyTour);

module.exports = router;
