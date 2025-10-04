


const jwt = require("jsonwebtoken");
require('dotenv').config();
exports.auth = async (req,res,next) => {
    try{

        
        const token = req?.body?.Authorization?.replace("Bearer ","") || req?.headers?.authorization?.replace("Bearer ", "") || 
        req?.body?.token || req.headers.authorization?.split(' ')[1] || req?.headers?.cookie.split('=')[1];
        //check if it exists
        // console.log("The body inside the middleware is...",req?.body)
        // console.log("The header inside the middleware is...",req?.headers)
        // console.log("The token inside the middleware is...",token)
        if(!token){
            console.log("req inside",req);
            return res.status(401).json({
                success:false,
                message:`Token missing is HERE ${req.cookies}`
            })
        }

        try{
            // console.log("The token obtained is...",token)
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            req.user = decode;
        }catch(err){
            console.log("ERROR FROM VERIFICATION OF THE TOKEN.......",err)
            return res.status(401).json({
                success:false,
                message:"Token is invalid"
            })
        }
        next();
}catch(err){
    console.log("ERROR FROM THE AUTH MIDDLEWARE",err);
    return res.status(401).json({
        success:false,
        message:`Error occurred while validating the token:`,
        error:err.message
    })
}
    
}
exports.isStudent = async (req,res,next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"The user is not a student."
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Error occurred while authorizing for the student."
        })
    }
}
exports.isInstructor = async (req,res,next) => {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"The user is not an instructor."
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Error occurred while authorizing the instructor."
        })
    }
}
exports.isAdmin = async (req,res,next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"The user is not an admin."
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Error occurred while authorizing the admin."
        })
    }
}
