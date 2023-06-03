const { v4: uuidv4 } = require("uuid");
const Cost = require("../model/cost.model");

const addCost = async (req, res) => {
    try {
        const newCost = new Cost({
            id: uuidv4(),
            reason: req.body.reason,
            amount: Number(req.body.amount),
            date: req.body.date,
            tour_id: req.params.tour_id,
            added_by: req.id,
        })
        await newCost.save();
        res.status(200).json({
            code: 200,
            success: true,
            message: "Cost added"
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            success: false,
            message: error.message
        });
    }
}

const getCost = async (req, res) => {
    try {
        const allCost = await Cost.find({ added_by: req.id , tour_id: req.params.tour_id}, { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 });
        res.status(200).json({
            code: 200,
            success: true,
            message: "success",
            cost: allCost
        })
    } catch (error) {
        res.status(500).json({
            code: 500,
            success: false,
            message: error.message
        });
    }
}


module.exports = { addCost, getCost, }
