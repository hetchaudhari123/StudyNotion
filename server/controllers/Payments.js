const User = require('../models/User');
const Course = require('../models/Course');
const { default: mongoose } = require('mongoose');
const { instance } = require('../config/razorpay');
const mailSender = require('../utils/mailSender');
const {courseEnrollmentEmail} = require('../mail/templates/courseEnrollmentEmail');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const CourseProgress = require('../models/CourseProgress');
// exports.capturePayments = async (req, res) => {
//     try {
//         //1 fetch the details (CourseID,UserID)
//         const { courseID } = req.body;
//         const userID = req.user.id;
//         //2 Validation -> CourseID and also that the user is not buying that same course again
//         if (!courseID) {
//             return res.status(400).json({
//                 success: false,
//                 message: "CourseID is empty"
//             })
//         }
//         const courseDetails = await Course.findById(courseID);
//         const uID = new mongoose.Types.ObjectId(userID);
//         if (courseDetails.studentsEnrolled.includes(uID)) {
//             return res.status(403).json({
//                 success: false,
//                 message: "The course is already enrolled"
//             })
//         }
//         //3 Creation of the order
//         const options = {
//             amount: courseDetails.price * 100,
//             receipt: Math.random(Date.now()).toString(),
//             notes: {
//                 courseID,
//                 userID,
//             },
//             currency: "INR"
//         };
//         const paymentResponse = await instance.orders.create(options);
//         //4 Return the response
//         console.log(paymentResponse);
//         return res.status(200).json({
//             success: true,
//             message: "Order successfully created",
//             courseName: courseDetails.courseName,
//             courseDescription: courseDetails.courseDescription,
//             thumbnail: courseDetails.thumbnail,
//             orderId: paymentResponse.id,
//             currency: paymentResponse.currency,
//             amount: paymentResponse.amount,
//         })
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             success: false,
//             message: "Error occurred while creating the order"
//         })
//     }
// }
// exports.verifySignature = async (req, res) => {
//     try {
//         const webhookSecret = "12345678";
//         const signature = req.headers["x-razorpay-signature"];
//         const shasum = crypto.createHmac("sha256", webhookSecret);
//         shasum.update(JSON.stringify(req.body));
//         const digest = shasum.digest("hex");
//         if (digest === signature) {//payment authorization successful
//             console.log("Payment is Authorised");

//             //take action
//             //fetch the ids from the notes of the req.body
//             const { courseId, userId } = req.body.payload.payment.entity.notes;
//             //enroll the student into the course
//             const courseResponse = await Course.findByIdAndUpdate(courseId, { $push: { studentsEnrolled: userId } }, { new: true });
//             if (!courseResponse) {
//                 return res.status(500).json({
//                     success: false,
//                     message: 'Course not Found',
//                 });
//             }
//             console.log(courseResponse);
//             //enroll the course into the student
//             const userResponse = await User.findByIdAndUpdate(userId, { $push: { courses: courseId } }, { new: true });
//             console.log(userResponse);
//             const mailResponse = await mailSender(userResponse.email, `Successfully bought the course`, courseEnrollmentEmail(courseResponse.courseName,userResponse.firstName + userResponse.lastName));
//             console.log(mailResponse);
//             return res.status(200).json({
//                 success: true,
//                 message: "Successfully completed the payment"
//             })
//         }
//         else {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid request',
//             });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// }




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

            // console.log("CORUSE ENROLLMENTS....",courseEnrollmentEmail(course.courseName,user.firstName))
            const emailResponse = await mailSender(
                user.email,
                `Successfully Enrolled into ${course.courseName}`,
                courseEnrollmentEmail(course.courseName, user.firstName)
            )   
            if(!emailResponse){
                console.log("INSIDE THE ENROLL STUDENT...", emailResponse)
                return false
            }
        }

        // console.log("hey........")
      

        // return res.status(200).json({
        //     success:true,
        //     message:"Successfully enrolled the student"
        // })
        return true


    }catch(err){
        console.log("ERROR OCCURRED IN THE ENROLLED STUDENT....",err)
        // return res.status(500).json({
        //     success:false,
        //     message:err.message
        // })
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
        // let body = razorpay_order_id + "|" + razorpay_payment_id;
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

        // const response = await enrollStudent(userId,courses)
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


