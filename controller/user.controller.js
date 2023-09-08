const User = require("../model/user.model");
const Member = require("../model/member.model");
const Tour = require("../model/tour.model");

const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const check = async (req, res) => {
    try {
        res.status(200).json({
            message: "Check Live server Test"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const userRegistration = async (req, res) => {
    try {

        const existingUser = await User.findOne({ phone: req.body.phone });
        if (existingUser) {
            res.status(200).json({
                success: false,
                code: 200,
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
                    success: true,
                    "code": 200,
                    message: "Registration Successful"
                })
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            code: 500,
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
                else {
                    res.status(200).json({
                        "message": "Authentication Failed: Incorrect password."
                    });
                }
            });
        }
        else if(!user) {
            res.status(200).json({
                "message": "Authentication Failed: Incorrect Phone number"
            })
        }
        else {
            res.status(404).json({
                code: 404,
                "message": "Authentication Failed"
            })
        }
    } catch (error) {
        res.status(500).json({
            code: 500,
            "message": error.message,
        })
    }
}

const userProfile = async (req, res) => {
    try {
        const user = await User.findOne({ id: req.id }, { _id: 0, createdAt: 0, updatedAt: 0, __v: 0, password: 0 });
        res.status(200).json({
            code: 200,
            success: true,
            message: "success",
            user: user
        })
    } catch (error) {
        res.status(500).json({
            code: 500,
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    userRegistration,
    userLogin,
    userProfile,
    check
}

