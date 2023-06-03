const Tour = require("../model/tour.model");

const { v4: uuidv4 } = require("uuid");


const addTour = async (req, res) => {
    try {
        const newTour = new Tour({
            id: uuidv4(),
            name: req.body.name,
            added_by: req.id,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
        })
        await newTour.save();
        res.status(200).json({
            code: 200,
            success: false,
            message: "Tour added"
        });

    } catch (error) {
        res.status(500).json({
            code: 500,
            success: false,
            message: error.message
        });
    }
}

const getMyTour = async (req, res) => {
    try {
        const myTour = await Tour.find({ added_by: req.id }, { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 });
        res.status(200).json({
            code: 200,
            success: true,
            message: "success",
            tour: myTour
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            success: false,
            message: error.message
        });
    }
}

module.exports = { addTour, getMyTour }

