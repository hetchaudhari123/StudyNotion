const User = require('../models/User');
const Course = require('../models/Course');
const { default: mongoose } = require('mongoose');
const { instance } = require('../config/razorpay');
const mailSender = require('../utils/mailSender');
const courseEnrollmentEmail = require('../mail/templates/courseEnrollmentEmail');
exports.capturePayments = async (req, res) => {
    try {
        //1 fetch the details (CourseID,UserID)
        const { courseID } = req.body;
        const userID = req.user.id;
        //2 Validation -> CourseID and also that the user is not buying that same course again
        if (!courseID) {
            return res.status(400).json({
                success: false,
                message: "CourseID is empty"
            })
        }
        const courseDetails = await Course.findById(courseID);
        const uID = new mongoose.Types.ObjectId(userID);
        if (courseDetails.studentsEnrolled.includes(uID)) {
            return res.status(403).json({
                success: false,
                message: "The course is already enrolled"
            })
        }
        //3 Creation of the order
        const options = {
            amount: courseDetails.price * 100,
            receipt: Math.random(Date.now()).toString(),
            notes: {
                courseID,
                userID,
            },
            currency: "INR"
        };
        const paymentResponse = await instance.orders.create(options);
        //4 Return the response
        console.log(paymentResponse);
        return res.status(200).json({
            success: true,
            message: "Order successfully created",
            courseName: courseDetails.courseName,
            courseDescription: courseDetails.courseDescription,
            thumbnail: courseDetails.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount,
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error occurred while creating the order"
        })
    }
}
exports.verifySignature = async (req, res) => {
    try {
        const webhookSecret = "12345678";
        const signature = req.headers["x-razorpay-signature"];
        const shasum = crypto.createHmac("sha256", webhookSecret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest("hex");
        if (digest === signature) {//payment authorization successful
            console.log("Payment is Authorised");

            //take action
            //fetch the ids from the notes of the req.body
            const { courseId, userId } = req.body.payload.payment.entity.notes;
            //enroll the student into the course
            const courseResponse = await Course.findByIdAndUpdate(courseId, { $push: { studentsEnrolled: userId } }, { new: true });
            if (!courseResponse) {
                return res.status(500).json({
                    success: false,
                    message: 'Course not Found',
                });
            }
            console.log(courseResponse);
            //enroll the course into the student
            const userResponse = await User.findByIdAndUpdate(userId, { $push: { courses: courseId } }, { new: true });
            console.log(userResponse);
            const mailResponse = await mailSender(userResponse.email, `Successfully bought the course`, courseEnrollmentEmail(courseResponse.courseName,userResponse.firstName + userResponse.lastName));
            console.log(mailResponse);
            return res.status(200).json({
                success: true,
                message: "Successfully completed the payment"
            })
        }
        else {
            return res.status(400).json({
                success: false,
                message: 'Invalid request',
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}