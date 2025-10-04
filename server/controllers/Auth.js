const User = require('../models/User');
const bcrypt = require('bcrypt');
const Profile = require('../models/Profile');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signUp = async (req, res) => {
    try {
        //1 fetch the details
        const {
            firstName, lastName,
            email, contactNumber, password, confirmPassword,
            accountType,
        } = req.body;
        console.log("INSIDE THE SIGNUP....", req.body)
        //2 validation
        //check if all exists
        if (!firstName || !lastName || !email || !password || !confirmPassword || !accountType) {
            return res.status(403).json({
                success: false,
                message: "All the required details are not filled"
            })
        }
        //check if the passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords don't match"
            })
        }
        //check if the user exists
        const userCheck = await User.findOne({ email });
        if (userCheck) {
            return res.status(400).json({
                success: false,
                message: "User is already registered"
            })
        }

        //hash the password
        const hash = await bcrypt.hash(password, 10);
        // Create the user
        let approved = "";
        approved === "Instructor" ? (approved = false) : (approved = true);
        //create a profile document
        const profile = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: (contactNumber) ? (contactNumber) : (null)
        });
        //store in the db
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hash,
            accountType,
            approved,
            additionalDetails: profile._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`,
        });
        return res.status(200).json({
            success: true,
            user,
            message: "Successfully registered the user"
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}
exports.login = async (req, res) => {
    try {
        //1 fetch the details
        const { email, password } = req.body;
        //2 validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email or password missing"
            })
        }
        //3 check if user exists
        const user = await User.findOne({ email }).populate("additionalDetails");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User doesn't exist"
            })
        }
        //4 compare the password
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(401).json({
                success: false,
                message: "The passwords don't match"
            })
        }
        //5 generate the jwt
        const payload = {
            id: user._id,
            accountType: user.accountType,
            email: user.email,
            additionalDetails: user.additionalDetails,
            firstName: user?.firstName,
            lastName: user?.lastName,
            image: user?.image,
            active: user?.active,
            approved: user?.approved,
            courses: user?.courses,
            courseProgress: user?.courseProgress,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "24h"
        });
        user.token = token;
        user.password = undefined;
        // res.cookie("token", token, {

        // });
        return res.cookie("token", token, {
            // expires:new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),httpOnly: true,
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true, // Only set secure flag in production

        }).status(200).json({
            success: true,
            message: "Successfully created the token",
            user,
            token
        });
    } catch (err) {
        console.error(err);
        // Return 500 Internal Server Error status code with error message
        return res.status(500).json({
            success: false,
            message: `${err.message}`,
        });
    }
}
exports.changePassword = async (req, res) => {
    try {

        //get data from req body
        //get oldPassword, newPassword, confirmNewPassowrd
        const { email, oldPassword, newPassword, confirmNewPassword } = req.body;
        //validation
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "One or more fields are empty"
            })
        }
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "The new passwords don't match"
            })
        }
        const savedPassword = await User.findOne({ email });
        if (!await bcrypt.compare(oldPassword, savedPassword.password)) {
            return res.status(401).json({
                success: false,
                message: "The old passwords do not match"
            })
        }

        //update pwd in DB
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { password: encryptedPassword },
            { new: true }
        );
       

        //return response
        return res.status(200).json({
            success: true,
            message: "Successfully changed the password",

        })
    } catch (err) {
        console.log("Error occurred while changing the password:", err);
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating the password",
            error: err.message,
        });
    }
}
