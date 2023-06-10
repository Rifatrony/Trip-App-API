const express = require("express");
const checkLogin = require("../middlewear/auth");
const { addTour, getMyTour, updateTour, deleteTour } = require("../controller/tour.controller");
const router = express.Router();


router.post("/add", checkLogin, addTour);
router.get("/all", checkLogin, getMyTour);
router.put("/update/:id", checkLogin, updateTour);
router.delete("/delete/:id", checkLogin, deleteTour);

module.exports = router;
