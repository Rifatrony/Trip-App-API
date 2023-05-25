const User = require("../model/user.model");
const Member = require("../model/member.model");
const Tour = require("../model/tour.model");

const { v4: uuidv4 } = require("uuid");


const addTour = async (req, res) => {
    try {
        console.log(req.id);
        const newTour = new Tour({
            id: uuidv4(),
            name: req.body.name,
            added_by: req.id,
        })
        await newTour.save();
        res.status(200).json({
            message: "Tour added"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const getMyTour = async (req, res) => {
    try {
        const myTour = await Tour.find({ added_by: req.id }, { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 });
        res.status(200).json({
            tour: myTour
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { addTour, getMyTour }

