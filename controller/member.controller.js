const User = require("../model/user.model");
const Member = require("../model/member.model");
const Tour = require("../model/tour.model");

const { v4: uuidv4 } = require("uuid");


const addMember = async (req, res) => {
    try {
        const existingMember = await Member.findOne({ phone: req.body.phone });
        if (existingMember) {
            res.status(400).json({
                success: false,
                message: "This person is already added try with another phone number"
            })
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
                message: "New member added"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const getMembers = async (req, res) => {
    try {
        // const tourIds = await Member.distinct('tour_id', {added_by: req.id});
        // console.log(tourIds);
        // const allMember = tourIds.map(tourId => {
        //     return Tour.findOne({id: tourId})
        //     .select('name')
        //     .exec();
        // });

        // const mem = await Promise.all(allMember);
        // const members = await Member.find({added_by: req.id});
        // res.status(200).json({
        //     member: mem
        // })

        const members = await Member.aggregate([
            {
                $match: {
                  added_by: req.id,
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
            members: members
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {
    addMember,
    getMembers,
}

