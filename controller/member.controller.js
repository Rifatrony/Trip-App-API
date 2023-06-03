const User = require("../model/user.model");
const Member = require("../model/member.model");
const Tour = require("../model/tour.model");

const { v4: uuidv4 } = require("uuid");


const addMember = async (req, res) => {
    try {
        const existingMember = await Member.findOne({ phone: req.body.phone });
        if (existingMember) {

            res.status(400).json({
                code: 400,
                success: false,
                message: "This person is already added try with another phone number"
            });
        }
        else {
            const newMember = new Member({
                id: uuidv4(),
                name: req.body.name,
                phone: Number(req.body.phone),
                tour_id: req.params.tour_id,
                added_by: req.id,
                given_amount: Number(req.body.given_amount),
            })
            await newMember.save();
            res.status(200).json({
                code: 200,
                success: true,
                message: "Member added"
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

const getMembers = async (req, res) => {
    try {

        const members = await Member.aggregate([
            {
                $match: {
                  added_by: req.id,
                  tour_id: req.params.tour_id
                },
            },

            {
                $lookup: {
                    from: 'tours',
                    localField: 'tour_id',
                    foreignField: 'id',
                    as: 'tour',
                },
            },
            {
                $unwind: {
                    path: '$tour',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'added_by',
                    foreignField: 'id',
                    as: 'user',
                },
            },
            {
                $unwind: {
                    path: '$user',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    _id: 0,
                    id: '$id',
                    name: '$name',
                    tour_name: '$tour.name',
                    phone: '$phone',
                    given_amount: '$given_amount',
                    // added_by: '$user.name'
                    added_by: {
                        user_id: '$user.id',
                        user_name: '$user.name',
                    },
                },
            },
        ]);

        res.status(200).json({
            code: 200,
            success: true,
            message: "success",
            members: members
        })

    } catch (error) {
        res.status(500).json({
            code: 500,
            success: false,
            message: error.message
        });
    }
}

const addMoney = async (req, res) => {
    
}


module.exports = {
    addMember,
    getMembers,
}

