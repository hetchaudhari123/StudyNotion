const User = require('../models/User');
const Course = require('../models/Course');
const { default: mongoose } = require('mongoose');
const { instance } = require('../config/razorpay');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const CourseProgress = require('../models/CourseProgress');




exports.capturePayments = async (req,res) => {
    //THIS FUNCTION INITIATES THE ORDER
    try{
        //TAKE THE IDS OF THE COURSES PRESENT IN THE CART
        // Assuming courses is javascript array containing courseIds
        const {courses} = req.body
        //EXTRACT THE USER ID
        const userId = req.user.id
        //VALIDATION
            //check if the courses are empty
        if(!courses || courses.length === 0){
            return res.status(404).json({
                success:false,
                message:"Course is empty"
            })
        }
        const uid = new mongoose.Types.ObjectId(userId)

            //calculate total amount
            let totalAmount = 0
            for(const courseId of courses){
                try{
                    const course = await Course.findById(courseId)
                    if(!course){
                        return res.status(404).json({
                            success:false,
                            message:"Course with provided course id doesn't exist"
                        })
                    }
                    // UNCOMMENT THESE AFTER TESTING!!
                    if(course.studentsEnrolled.includes(uid)){
                        return res.status(400).json({
                            success:false,
                            message:'User already registered to a provided course'
                        })
                    }
                    totalAmount += course.price
                }catch(err){
                    console.log("ERROR OCCURRED INSIDE CAPTURE PAYMENTS.....",err)
                    return res.status(500).json({
                        success:false,
                        message:err.message
                    })
                }
            }
            const options = {
                amount: totalAmount * 100,
                currency: "INR",
                receipt: `${uuidv4()}`,
            }
            const response = await instance.orders.create(options)
              return res.status(200).json({
                success:true,
                data:response,
                message:"Successfully created the order"
              })
    }catch(err){
        console.log("ERROR FROM CAPTURE PAYMENTS CONTROLLER....",err)
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
exports.enrollStudent = async (userId,courses,res) => {
    try{    
        if(!userId || !courses){
            // return res.status(404).json({
                // success:false,
                // message:"Missing userId or courses"
            // })
            return false
        }
        // Insert the courses into the student's courses
        // Insert the student into the studentEnrolled of the courses

        for(const course_id of courses){
            const user = await User.findByIdAndUpdate(userId,
                {$push:{courses:course_id}},
                {new:true})
            if(!user){
                return res.status(404).json({
                    success:false,
                    message:"User not found"
                })
            }
            const course = await Course.findByIdAndUpdate(course_id,
                {$push:{studentsEnrolled:userId}},
                {new:true},
            )
            if(!course){
                // return res.status(404).json({
                    // success:false,
                    // message:"Course with provided course id not found"
                // })
                return false
            }



            // Initialise the Course Progress
            const courseProgress = await CourseProgress.create({courseID:course_id,userId,completedVideos:[]})
            await User.findByIdAndUpdate(userId,{$push:{courseProgress:courseProgress}})

            
        }

      

        
        return true


    }catch(err){
        console.log("ERROR OCCURRED IN THE ENROLLED STUDENT....",err)
        
        return false
    }
}
exports.verifySignature = async (req,res) => {
    try{
        const {razorpay_order_id,razorpay_payment_id,
            razorpay_signature,
            courses,
            order_id
        } = req.body
        if(!razorpay_order_id || 
            !razorpay_payment_id || 
            !razorpay_signature || 
            !courses
        ){
            return res.status(400).json({
                success:false,
                message:"Missing parameter:(razorpay_order_id),(razorpay_payment_id) or (razorpay_signature)"
            })
        }
        const userId = req.user.id
        let body = order_id + "|" + razorpay_payment_id;
        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (generated_signature !== razorpay_signature) {
            return res.status(400).json({
                success:false,
                message:"The razorpay signatures don't match"
            })
        }

        const responseEnroll = await this.enrollStudent(userId,courses)
        if(!responseEnroll){
            return res.status(400).json({
                success:false,
                message:"Verification succeeded but couldn't send the mail"
            })
        }
        return res.status(200).json({
            success:true,
            // data:response,
            message:"Successfully verified and enrolled the student"
        })

    }catch(err){
        console.log("ERROR FROM VERIFY PAYMENT CONTROLLER....",err)
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


