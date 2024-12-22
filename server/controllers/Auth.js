const User = require('../models/User');
const OTP = require('../models/OTP');
const otp_generator = require('otp-generator');
const bcrypt = require('bcrypt');
const Profile = require('../models/Profile');
const jwt = require('jsonwebtoken');
const mailSender = require('../utils/mailSender');
const passwordUpdated = require('../mail/templates/passwordUpdate');
const { otpEmail } = require('../mail/templates/otp');
require('dotenv').config();
exports.sendOTP = async (req,res) => {
    try{
        //1 fetch the email
        const {email} = req.body;
        //2 check if the user already exists
        const checkUserExists = await User.findOne({email});
        if(checkUserExists){
            return res.status(401).json({
              success:false,
              message:'User already exists!'
            })
        }
        //3 generate the otp
        let otp = otp_generator.generate(6,{
            lowerCaseAlphabets:false,
            upperCaseAlphabets:false,
            specialChars:false
        });
        //4 check if it already exists
        let checkUniqueOTP = await OTP.findOne({otp});
        // console.log("Result is Generate OTP Func");
		// console.log("OTP", otp);
		// console.log("Result", result);
        while(checkUniqueOTP){
            otp = otp_generator.generate(6,{
                upperCaseAlphabets: false,
            });
            checkUniqueOTP = await OTP.findOne({otp});
        }
        //5 save the otp to the DB
        const response = await OTP.create({email,otp});
        // await mailSender(email,'OTP',otpEmail(otp));
        // const mailResponse = await mailSender(email, `OTP for SignUp`, otpEmail(otp));
        
		// console.log("OTP Body", {email,otp});
        // console.log("RESPONSE FROM the MAILSENDER...",mailResponse)
        return res.status(200).json({
            success:true,
            message:"Successfully sent the otp.",
			otp
        })
    }catch(err){
		console.log(err.message);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
exports.signUp = async (req,res) => {
    try{
        //1 fetch the details
        const {
            firstName,lastName,
            email,contactNumber,password,confirmPassword,
            accountType,
            otp
        } = req.body;
        //2 validation
            //check if all exists
            if(!firstName || !lastName || !email || !password || !confirmPassword ||
            !otp || !accountType){
                return res.status(403).json({
                    success:false,
                    message:"All the required details are not filled"
                })
            }
            //check if the passwords match
            if(password !== confirmPassword){
                return res.status(400).json({
                    success:false,
                    message:"Passwords don't match"
                })
            }
            //check if the user exists
            const userCheck = await User.findOne({email});
            if(userCheck){
                return res.status(400).json({
                    success:false,
                    message:"User is already registered"
                })
            }
            //check if the otp matches
                //fetch the most recent otp from the db
                const fetchedOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
		// console.log("Fetched Otp ",fetchedOtp);

                if(fetchedOtp.length === 0){
                    return res.status(400).json({
                        success:false,
                        message:"No otp is found"
                    })
                }
                else if(fetchedOtp[0].otp !== otp){
                    return res.status(400).json({
                        success:false,
                        message:`The otps don't match.The obtained otp:${fetchedOtp[0].otp} & written:${otp}`
                    })
                }
            //hash the password
            const hash = await bcrypt.hash(password,10);
            // Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);
            //create a profile document
            const profile = await Profile.create({
                gender:null,
                dateOfBirth:null,
                about:null,
                contactNumber:(contactNumber)?(contactNumber):(null)
            });
            //store in the db
            const user = await User.create({
                firstName,
                lastName,
                email,
                password:hash,
                accountType,
                approved,
                additionalDetails:profile._id,
                image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`,
            });
            return res.status(200).json({
                success:true,
                user,
                message:"Successfully registered the user"
            });

    }catch(err){
		console.error(err);
        return res.status(500).json({
            success:false,
            message: err.message,
        })
    }
}
exports.login = async (req,res) => {
    try{
        //1 fetch the details
        const {email,password} = req.body;
        //2 validation
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Email or password missing"
            })
        }
        //3 check if user exists
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User doesn't exist"
            })
        }
        //4 compare the password
        if(!await bcrypt.compare(password,user.password)){
            return res.status(401).json({
                success:false,
                message:"The passwords don't match"
            })
        }
        //5 generate the jwt
            const payload = {
                id:user._id,
                accountType:user.accountType,
                email:user.email,
                additionalDetails:user.additionalDetails,
                firstName:user?.firstName,
                lastName:user?.lastName,
                image:user?.image,
                active:user?.active,
                approved:user?.approved,
                courses:user?.courses,
                courseProgress:user?.courseProgress,
            }
            
            // const token = jwt.sign(payload,"chaudhari",{
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"24h"
            });
            user.token = token;
            user.password = undefined;
            // res.cookie("token", token, {
               
            // });
            return res.cookie("token",token,{
                // expires:new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),httpOnly: true,
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                secure: true, // Only set secure flag in production
                
            }).status(200).json({
                success:true,
                message:"Successfully created the token",
                user,
                token
            });
            // console.log("Error in logging the user:",err);
            // res.status(500).json({
            //     success:false,
            //     message:"Error in logging the user"
            // })
    }catch(err){
        console.error(err);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `${err.message}`,
		});
    }
}
exports.changePassword = async (req, res) => {
    try{

    //get data from req body
    //get oldPassword, newPassword, confirmNewPassowrd
    const {email,oldPassword,newPassword,confirmNewPassword} = req.body;   
    //validation
    if(!oldPassword || !newPassword || !confirmNewPassword){
        return res.status(400).json({
            success:false,
            message:"One or more fields are empty"
        })
    }
    if(newPassword !== confirmNewPassword){
        return res.status(400).json({
            success:false,
            message:"The new passwords don't match"
        })
    }
    const savedPassword = await User.findOne({email});
    if(!await bcrypt.compare(oldPassword,savedPassword.password)){
        return res.status(401).json({
            success:false,
            message:"The old passwords do not match"
        })
    }

    //update pwd in DB
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await User.findOneAndUpdate(
        { email },
        {  password: encryptedPassword  },
        { new: true } 
    );
    // //send mail - Password updated
    // try{

    // const emailResponse = await mailSender(email,passwordUpdated(
    //     email,
    //     `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
    // ));
    // console.log("Email sent successfully:", emailResponse.response);
    // }catch(error){
    //     console.error("Error occurred while sending email:", error);
    //     return res.status(500).json({
    //         success:false,
    //         message:"Error occurred while sending the mail",
    //         error: error.message,
    //     })
    // }

    //return response
    return res.status(200).json({
        success:true,
        message:"Successfully changed the password",
        
    })
    }catch(err){
        console.log("Error occurred while changing the password:",err);
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating the password",
            error: err.message,
        });
    }
}
