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

const deleteTour = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedTour = await Tour.findOneAndDelete({ id: id });

        if (deletedTour) {
            res.status(200).json({
                code: 200,
                success: true,
                message: "Tour deleted"
            });
        } else {
            res.status(404).json({
                code: 404,
                success: false,
                message: "Tour not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            code: 500,
            success: false,
            message: error.message
        });
    }
}

const updateTour = async (req, res) => {
    try {
        const tourId = req.params.id;

        // Find the tour by ID
        const tour = await Tour.findOne({ id: tourId });

        if (!tour) {
            return res.status(404).json({
                code: 404,
                success: false,
                message: "Tour not found",
            });
        }

        // Update the tour data
        tour.name = req.body.name || tour.name;
        tour.start_date = req.body.start_date || tour.start_date;
        tour.end_date = req.body.end_date || tour.end_date;

        // Save the updated tour
        await tour.save();

        res.status(200).json({
            code: 200,
            success: true,
            message: "Tour updated",
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            success: false,
            message: error.message,
        });
    }
};


module.exports = { addTour, getMyTour, updateTour, deleteTour, }

