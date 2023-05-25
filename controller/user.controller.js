const User = require("../model/user.model");
const Member = require("../model/member.model");
const Tour = require("../model/tour.model");

const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userRegistration = async (req, res) => {
    try {

        const existingUser = await User.findOne({ phone: req.body.phone });
        if (existingUser) {
            res.status(400).json({
                success: false,
                "message": "This phone is already used"
            })
        }
        else {
            bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
                const newUser = new User({
                    id: uuidv4(),
                    name: req.body.name,
                    phone: Number(req.body.phone),
                    password: hash
                })
                await newUser.save();
                res.status(200).json({
                    message: "Registration Successful"
                })
            });
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const userLogin = async (req, res) => {
    try {
        const phone = req.body.phone;
        const password = req.body.password;
        const user = await User.findOne({ phone: phone })

        if (user) {
            bcrypt.compare(password, user.password, async function (err, result) {
                if (result === true) {
                    const token = jwt.sign({
                        phone: user.phone,
                        id: user.id,
                    }, process.env.JWT_SECRET)
                    res.status(200).json({
                        "access_token": token,
                        "message": "Login Successful"
                    })
                }
            });
        }
        else {
            res.status(404).json({
                "message": "Authentication Failed"
            })
        }
    } catch (error) {
        res.status(500).json({
            "message": error.message,
        })
    }
}

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

const addMember = async (req, res) => {
    try {
        const existingMember = await Member.findOne({ phone: req.body.phone });
        if (existingMember) {
            res.status(400).json({
                success: false,
                "message": "This person is already added"
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
    userRegistration,
    userLogin,
    addMember,
    getMembers,
    addTour
}

