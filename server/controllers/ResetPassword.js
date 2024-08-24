const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require('bcrypt');
const {passwordUpdated} = require('../mail/templates/passwordUpdate');
const crypto = require('crypto');
const {resetPasswordTemplate} = require('../mail/templates/resetPasswordToken');
exports.resetPasswordToken = async (req,res)=>{
    try{
        //1 fetch the email
        const email = req.body.email;
        //2 check if the email exists
        const userCheck = await User.findOne({email});
        if(!userCheck){
            return res.status(404).json({
                success:false,
                message:`User with the email ${email} is not registered`
            })
        }
        //3 generate the token
        const token = crypto.randomBytes(20).toString("hex");
        //4 add into the User document
        const userUpdate = await User.findOneAndUpdate({email},{token:token,resetPasswordExpires:(Date.now() +3600000)},{new:true});
        // console.log("DETAILS", userUpdate);
        // const url = `http://localhost:3000/update-password/${token}`;
        
        const url = `https://study-notion2.vercel.app/update-password/${token}`;
        //5 send the email
        // const body = `<p>Press this link for resetting the password:${url}.</p><p>The password will expire after ${userUpdate.resetPasswordExpires}</p>`
        await mailSender(email,`Link for resetting the password`,resetPasswordTemplate(email,userUpdate.firstName + ' ' + userUpdate.lastName,url));
        return res.status(200).json({
            success:true,
            message:"Successfully sent the link for resetting the password."
        })
    }catch(err){
        console.log("Error inside the reset password controller:",err);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
exports.resetPassword = async (req,res) => {
    try{
        //1 fetch the details
        const {token,password,confirmPassword} = req.body;
        //2 validate the token and the passswords
        
        const user = await User.findOne({token});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"Token not found"
            })
        }
        //2.1 check for the expiry of the token
        if(user.resetPasswordExpires < Date.now()){
            return res.status(403).json({
                success:false,
                message:"Token is expired"
            })
        }
        //2.2 validate the passwords
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Passwords don't match",
               
            })
        }
        //3 hash the password
        const hash = await bcrypt.hash(password,10);
        //4 update the db
        await User.findOneAndUpdate({token},{password:hash},{new:true});
        return res.status(200).json({
            success:true,
            message:"Successfully changed the password",
            data:{
                email:user.email
            }
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}