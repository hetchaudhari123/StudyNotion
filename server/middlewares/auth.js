// const jwt = require("jsonwebtoken");
// require('dotenv').config();
// exports.auth = async (req,res,next) => {
//     try{

//         //fetch the token
//         // const token = req.cookies.token || req.body.token ||
//         // req?.header("Authorization")?.replace("Bearer ","");
//         // const token = req?.body?.Authorization?.replace("Bearer ","")
//         const token = req?.body?.Authorization?.replace("Bearer ","") || req?.headers?.authorization?.replace("Bearer ", "");

//         //check if it exists

//         if(!token){
//             console.log("req cookies",req.cookies);
//             console.log("req ",req);
//             console.log("req headers", req.headers);
//             console.log("req body", req.body);
//             return res.status(401).json({
//                 success:false,
//                 message:`Token missing req cookies:${req.cookies}`
//             })
//         }
//         //verfiy

//         try{
//             // const decode = jwt.verify(token,process.env.JWT_SECRET);
//             const decode = jwt.verify(token,"chaudhari");
//             // console.log("DECODING THE TOKEN.....",decode);
//             req.user = decode;
//         }catch(err){
//             console.log("ERROR FROM VERIFICATION OF THE TOKEN.......",err)
//             return res.status(401).json({
//                 success:false,
//                 message:"Token is invalid"
//             })
//         }
//         next();
// }catch(err){
//     console.log("ERROR FROM THE AUTH MIDDLEWARE",err);
//     return res.status(401).json({
//         success:false,
//         message:`Error occurred while validating the token:`,
//         error:err.message
//     })
// }
    
// }
// exports.isStudent = async (req,res,next) => {
//     try{
//         if(req.user.accountType !== "Student"){
//             return res.status(401).json({
//                 success:false,
//                 message:"The user is not a student."
//             })
//         }
//         next();
//     }catch(err){
//         return res.status(500).json({
//             success:false,
//             message:"Error occurred while authorizing for the student."
//         })
//     }
// }
// exports.isInstructor = async (req,res,next) => {
//     try{
//         if(req.user.accountType !== "Instructor"){
//             return res.status(401).json({
//                 success:false,
//                 message:"The user is not an instructor."
//             })
//         }
//         next();
//     }catch(err){
//         return res.status(500).json({
//             success:false,
//             message:"Error occurred while authorizing the instructor."
//         })
//     }
// }
// exports.isAdmin = async (req,res,next) => {
//     try{
//         // console.log("Printing AccountType ", req.user.accountType);
//         if(req.user.accountType !== "Admin"){
//             return res.status(401).json({
//                 success:false,
//                 message:"The user is not an admin."
//             })
//         }
//         next();
//     }catch(err){
//         return res.status(500).json({
//             success:false,
//             message:"Error occurred while authorizing the admin."
//         })
//     }
// }



const jwt = require("jsonwebtoken");
require('dotenv').config();
exports.auth = async (req,res,next) => {
    try{

        //fetch the token
        // const token = req.cookies.token || req.body.token ||
        // req?.header("authorization")?.replace("Bearer ","");
        // const token = req?.body?.Authorization?.replace("Bearer ","") 
        // const token = req?.body?.Authorization?.replace("Bearer ","") || req?.headers?.authorization?.replace("Bearer ", "");
        
        const token = req?.body?.Authorization?.replace("Bearer ","") || req?.headers?.authorization?.replace("Bearer ", "") || 
        req?.body?.token || req.headers.authorization?.split(' ')[1] || req?.headers?.cookie.split('=')[1];
        //check if it exists
        // console.log("The body inside the middleware is...",req?.body)
        console.log("The body inside the middleware is...",req?.body)
        console.log("The header inside the middleware is...",req?.headers)
        console.log("The token inside the middleware is...",token)
        if(!token){
            // console.log("req cookies",req.cookies);
            console.log("req inside",req);
            return res.status(401).json({
                success:false,
                message:`Token missing is HERE ${req.cookies}`
            })
        }
        //verfiy

        try{
            console.log("The token obtained is...",token)
            // const decode = jwt.verify(token,"chaudhari");
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            // console.log("DECODING THE TOKEN.....",decode);
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
        // console.log("Printing AccountType ", req.user.accountType);
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
