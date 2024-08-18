const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");

exports.createRating = async (req, res) => {
    try {
        //1 fetch the details
        //1.1 fetch the userid
        const userID = req.user.id;
        //1.2 fetch the courseid,rating,review
        const { courseId, rating, review } = req.body;
        //2 validation
        if (!courseId || !rating || !review) {
            return res.status(400).json({
                success: false,
                message: "One or more fields are empty"
            })
        }
        //2.1 ensure the user is enrolled in the course
        // const courseDetails = await Course.findById(courseid);
        const courseDetails = await Course.findOne({
            _id: courseId,
            studentsEnrolled: {
                $elemMatch: {
                    $eq: userID
                }
            }
        })
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "The user is not enrolled in the course"
            });
        }
        //2.2 ensure user rates for the first time
        const alreadyReviewed = await RatingAndReview.findOne({
            user: userID,
            course: courseId,
        });
        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: "User has already rated the course"
            })
        }
        //3 create the rating
        const ratingResponse = await RatingAndReview.create({ user: userID, rating, review, course: courseId });
        // console.log(response);
        //4 include the rating and review inside the course
        const courseResponse = await Course.findByIdAndUpdate(courseId,
            {
                $push: {
                    ratingAndReviews: ratingResponse._id
                }
            },
            {
                new: true
            });
        // console.log(courseResponse);
        //5 return the response
        return res.status(200).json({
            success: true,
            message: "Successfully enrolled the rating",
            ratingResponse
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message:error.message
        })
    }
}

exports.editRating = async (req, res) => {
    try {
        //1 fetch the details
        //1.1 fetch the userid
        const userID = req.user.id;
        //1.2 fetch the courseid,rating,review
        const { courseId, rating, review } = req.body;
        //2 validation
        if (!courseId || !rating || !review) {
            return res.status(400).json({
                success: false,
                message: "One or more fields are empty"
            })
        }
        //2.1 ensure the user is enrolled in the course
        // const courseDetails = await Course.findById(courseid);
        const courseDetails = await Course.findOne({
            _id: courseId,
            studentsEnrolled: {
                $elemMatch: {
                    $eq: userID
                }
            }
        })
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "The user is not enrolled in the course"
            });
        }
        //2.2 ensure user rates for the first time
        const alreadyReviewed = await RatingAndReview.findOne({
            user: userID,
            course: courseId,
        });

        //3 create the rating
        const ratingResponse = await RatingAndReview.findOneAndUpdate(
            { user: userID, course: courseId },
            { rating:rating, review:review },
            { new: true}
          );
        // console.log(response);
        //4 include the rating and review inside the course
        let courseResponse = await Course.findByIdAndUpdate(courseId,
            {
                $pull:{
                    ratingAndReviews:alreadyReviewed._id
                }
            },
            {
                new: true
            });
        courseResponse = await Course.findByIdAndUpdate(courseId,
            {
                
                $push: {
                    ratingAndReviews: ratingResponse._id
                }
            },
            {
                new: true
            });
            // console.log("HEY........")

        //5 return the response
        return res.status(200).json({
            success: true,
            message: "Successfully updated the rating",
            ratingResponse
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message:error.message
        })
    }
}

exports.fetchUserRating = async (req,res) => {
    try {
        //1 fetch the details
        //1.1 fetch the userid
        const userID = req.user.id;
        //1.2 fetch the courseid,rating,review
        const { courseId } = req.body;
        //2 validation
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "One or more fields are empty"
            })
        }
        //2.1 ensure the user is enrolled in the course
        // const courseDetails = await Course.findById(courseid);
        const courseDetails = await Course.findOne({
            _id: courseId,
            studentsEnrolled: {
                $elemMatch: {
                    $eq: userID
                }
            }
        })
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "The user is not enrolled in the course"
            });
        }
        //2.2 ensure user rates for the first time
        const alreadyReviewed = await RatingAndReview.findOne({
            user: userID,
            course: courseId,
        });

        if(!alreadyReviewed){
            return res.status(200).json({
                success:true,
                message:"Not Rated yet"
            })
        }

        //5 return the response
        return res.status(200).json({
            success: true,
            message: "Successfully fetched the rating",
            data:alreadyReviewed
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message:error.message
        })
    }
}

exports.getAverageRating = async (req, res) => {
    try {
        //1 fetch the details
        const { courseId } = req.body;
        //2 validation
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "The courseId is empty"
            })
        }
        //3 average calculation
        const result = await RatingAndReview.aggregate([{
            $match:
            {
                course:new mongoose.Types.ObjectId(courseId)
            }
        }, {
            $group: {
                _id: null,
                avgRating: {
                    $avg: "$rating"
                }
            }
        }])
        if(result.length > 0){
            const avg = result[0].avgRating;
            return res.status(200).json({
                success:true,
                message:"Successfully returned the average rating",
                average:avg
            })
        }
        else{
            return res.status(200).json({
                success:true,
                message:"No ratings exist for the given course",
                averageRating:0,

            })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message:err.message
        })
    }
}
exports.getAllReviews = async (req,res) => {
    try{
        const response = await RatingAndReview.find({})
                             .sort({rating:"desc"})
                             .populate({
                                path:"user",
                                select:"firstName lastName email image"
                             })
                             .populate({
                                path:"course",
                                select:"courseName"
                             });
        return res.status(200).json({
            success:true,
            message:"Successfully fetched all the reviews",
            data:response
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}
exports.getAllCourseReviews = async (req,res) => {
    try{
        //1 fetch the courseId
        const {courseId} = req.body;
        //2 validation
        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"CourseId field is empty"
            })
        }
        //3 Fetch all the reviews
        const response = await RatingAndReview.findOne({course:courseId})
        .populate({
            path:"user",
            select:"firstName lastName email image"
        }).sort({rating: "desc"});
        if(response){
            return res.status(404).json({
                success:false,
                message:'No reviews found of the course'
            })
        }
        //4 return the response
        return res.status(200).json({
            success:true,
            message:"Successfully fetched all the reviews of the course."
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Error occurred while fetching all the reviews of the course."
        })
    }
}


// exports.createRatingTest = async (req,res) => {
//     try {
//         //1 fetch the details
//         //1.1 fetch the userid
//         const userID = req.user.id;
//         //1.2 fetch the courseid,rating,review
//         const { courseId, rating, review } = req.body;
//         //2 validation
//         if (!courseId || !rating || !review) {
//             return res.status(400).json({
//                 success: false,
//                 message: "One or more fields are empty"
//             })
//         }
//         //2.1 ensure the user is enrolled in the course
//         // const courseDetails = await Course.findById(courseid);
//         const courseDetails = await Course.findOne({
//             _id: courseId,
//             studentsEnrolled: {
//                 $elemMatch: {
//                     $eq: userID
//                 }
//             }
//         })
//         if (!courseDetails) {
//             return res.status(404).json({
//                 success: false,
//                 message: "The user is not enrolled in the course"
//             });
//         }
//         //2.2 ensure user rates for the first time
//         const alreadyReviewed = await RatingAndReview.findOne({
//             user: userID,
//             course: courseId,
//         });
//         if (alreadyReviewed) {
//             return res.status(403).json({
//                 success: false,
//                 message: "User has already rated the course"
//             })
//         }
//         //3 create the rating
//         const ratingResponse = await RatingAndReview.create({ user: userID, rating, review, course: courseId });
//         // console.log(response);
//         //4 include the rating and review inside the course
//         const courseResponse = await Course.findByIdAndUpdate(courseId,
//             {
//                 $push: {
//                     ratingAndReviews: ratingResponse._id
//                 }
//             },
//             {
//                 new: true
//             });
//         console.log(courseResponse);
//         //5 return the response
//         return res.status(200).json({
//             success: true,
//             message: "Successfully enrolled the rating",
//             ratingResponse
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message:error.message
//         })
//     }
// }