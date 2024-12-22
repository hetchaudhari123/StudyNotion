const User = require('../models/User');
const Profile = require('../models/Profile');
const Course = require('../models/Course');
const CourseProgress = require('../models/CourseProgress');
const RatingAndReview = require('../models/RatingAndReview');
const { fileUploader } = require('../utils/uploadFile');
exports.updateProfile = async (req, res) => {
    try {
        //1 fetch the details
        // Treated profession and accountType differently
        const { dateOfBirth, about , contactNumber, gender,display,profession,imageUrl} = req.body;
        const userId = req.user.id;

        //3 fetch the profile using the user id
        const user = await User.findById(userId);
        const profile = await Profile.findById(user.additionalDetails);
        //4 update the profile
        
        if(contactNumber) profile.contactNumber = contactNumber;//
        if(dateOfBirth) profile.dateOfBirth = dateOfBirth;//
        if(about) profile.about = about;//
        if(gender) profile.gender = gender;//
        if(profession) profile.profession = profession;//
        if(display){
            let cleanedString = display.trim().split(/\s+/);
            let firstWord = cleanedString[0];
            let lastWord = cleanedString[1];
            user.firstName = firstWord;
            user.lastName = lastWord;
            if(imageUrl){
                user.image = imageUrl;
            }
            await user.save();
        }
        await profile.save();
        //5 return response
        return res.status(200).json({
            success: true,
            message: "Successfully updated the profile",
            profile
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating the profile",
            error: err.message
        })
    }
}
// exports.deleteAccount = async (req, res) => {
//     try {
//         //1 fetch the details
//         // console.log("Printing ID: ", req.user.id);
//         const userId = req.user.id;
//         //2 validation
//         let userDetails = await User.findById(userId);
//         if (!userDetails) {
//             return res.status(404).json({
//                 success: false,
//                 message: "The user is not registered"
//             })
//         }
//         //3 delete the profile

//         // const profileId = userDetails.additionalDetails;
//         // const profileResponse = await Profile.findByIdAndDelete(profileId);
//         //BY ME
//         //4 delete the courses if the user is a instructor
//         // const courseDetails = await Course.find({ instructor: userId });
//         // const coursesId = courseDetails.map((a) => a._id);

//         // await CourseProgress.deleteMany({ courseId: { $in: coursesId } });
//         // await Course.deleteMany({ _id: { $in: coursesId } });
//         // await RatingAndReview.deleteMany({ user: userId });

//         //BY ME ends
//         //4 delete the user
//         await Profile.deleteMany({id:{$in:userDetails.additionalDetails}})
//         await RatingAndReview.deleteMany({user:userDetails._id})
//         await Course.deleteMany({_id:{$in:userDetails.courses}})
//         await CourseProgress.deleteMany({_id:{$in:userDetails.courseProgress}})
//         userDetails = await User.findByIdAndDelete(userId);
//         //5 return the response
//         return res.status(200).json({
//             success: true,
//             message: "Successfully deleted the account."
//         })
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             success: false,
//             message: "Error occurred while deleting the account.",
//             error: err.message
//         })
//     }
// }


// exports.deleteAccount = async (req, res) => {
//     try {
//         //1 fetch the details
//         // console.log("Printing ID: ", req.user.id);
//         const userId = req.user.id;
//         //2 validation
//         let userDetails = await User.findById(userId);
//         if (!userDetails) {
//             return res.status(404).json({
//                 success: false,
//                 message: "The user is not registered"
//             })
//         }
//         //3 delete the profile

//         // const profileId = userDetails.additionalDetails;
//         // const profileResponse = await Profile.findByIdAndDelete(profileId);
//         //BY ME
//         //4 delete the courses if the user is a instructor
//         // const courseDetails = await Course.find({ instructor: userId });
//         // const coursesId = courseDetails.map((a) => a._id);

//         // await CourseProgress.deleteMany({ courseId: { $in: coursesId } });
//         // await Course.deleteMany({ _id: { $in: coursesId } });
//         // await RatingAndReview.deleteMany({ user: userId });

//         //BY ME ends
//         //4 delete the user
//         console.log("USER DETAILS ADDITIONAL DETAILS...",userDetails.additionalDetails)
//         // await Profile.deleteMany({id:{$in:userDetails.additionalDetails}})

//         await Profile.findByIdAndDelete(userDetails.additionalDetails);
//         await RatingAndReview.deleteMany({user:userDetails._id})
//         await Course.deleteMany({_id:{$in:userDetails.courses}})
//         await CourseProgress.deleteMany({_id:{$in:userDetails.courseProgress}})
//         userDetails = await User.findByIdAndDelete(userId);
//         //5 return the response
//         return res.status(200).json({
//             success: true,
//             message: "Successfully deleted the account."
//         })
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             success: false,
//             message: "Error occurred while deleting the account.",
//             error: err.message
//         })
//     }
// }



exports.deleteAccount = async (req, res) => {
    try {
        //1 fetch the details
        // console.log("Printing ID: ", req.user.id);
        const userId = req.user.id;
        //2 validation
        let userDetails = await User.findById(userId);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "The user is not registered"
            })
        }
        //3 delete the profile

        // const profileId = userDetails.additionalDetails;
        // const profileResponse = await Profile.findByIdAndDelete(profileId);
        //BY ME
        //4 delete the courses if the user is a instructor
        // const courseDetails = await Course.find({ instructor: userId });
        // const coursesId = courseDetails.map((a) => a._id);

        // await CourseProgress.deleteMany({ courseId: { $in: coursesId } });
        // await Course.deleteMany({ _id: { $in: coursesId } });
        // await RatingAndReview.deleteMany({ user: userId });

        //BY ME ends
        //4 delete the user
        console.log("USER DETAILS ADDITIONAL DETAILS...",userDetails.additionalDetails)
        // await Profile.deleteMany({id:{$in:userDetails.additionalDetails}})

        await Profile.findByIdAndDelete(userDetails.additionalDetails);
        await RatingAndReview.deleteMany({user:userDetails._id})
        await Course.deleteMany({_id:{$in:userDetails.courses}})
        await CourseProgress.deleteMany({_id:{$in:userDetails.courseProgress}})
        userDetails = await User.findByIdAndDelete(userId);
        //5 return the response
        return res.status(200).json({
            success: true,
            message: "Successfully deleted the account."
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error occurred while deleting the account.",
            error: err.message
        })
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {
        //1 fetch the details
        const userId = req.user.id;
        //2 get all the details
        const userDetails = await User.findById(userId).populate('additionalDetails');
        // console.log(userDetails);

        //3 return the response
        return res.status(200).json({
            success: true,
            message: "Successfully fetched all the details of the user",
            userDetails
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while getting the user's details.",
            error: err.message
        })
    }
}
exports.updateDisplayPicture = async (req, res) => {
    try {
        //fetch all the details
        //1 fetch the user id
        const userId = req.user.id;
        //1.1 fetch the image
        const displayPicture = req.files.displayPicture;
        //upload onto the cloudinary
        const fileDetails = await fileUploader(displayPicture, process.env.FOLDER_NAME, 1000,
            1000);
        // console.log(fileDetails);
        //update the user document
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: fileDetails.secure_url },
            { new: true }
        )
        //return the response
        return res.status(200).json({
            success: true,
            message: "Successfully uploaded the image",
            updatedProfile
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error occurred while uploading the image",
            error: err.message
        });
    }
}
exports.getEnrolledCourses = async (req, res) => {
    try {
        //1 fetch the details
        //fetch the userId
        const userId = req.user.id;
        //2 fetch all the courses
        const userDetails = await User.findById(userId)
            .populate({
                path: "courses",
                populate: {
                  path: "courseContent",
                  populate: {
                    path: "subSection",
                  },
                },
              })
        // for(let i = 0 ; i < userDetails.courseContent.length ; i++) {//iterate over all the courses
        //     let course =  userDetails.courseContent[i]
        //     for(let j = 0 ; j < course.subSection.length ; j++){     //iterate over all the subSections

        //     }
        // }
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userId}`,
            })
        }
        return res.status(200).json({
            success: true,
            message: "Successfully fetched all the courses",
            data:userDetails

        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

// BY ME
//Done to get the stats of the total number of enrolled students and teachers
exports.getNumberOfUsers = async (req, res) => {
    try {
        //1 fetch the details
        //fetch the userId
        // const userId = re;
        //2 fetch all the courses
        // const userDetails = await User.find();
        // accountType
        const students = await User.find({ accountType: "Student" }).countDocuments();
        const instructors = await User.find({ accountType: "Instructor" }).countDocuments();
        return res.status(200).json({
            success: true,
            message: "Successfully fetched all the courses",
            data:{students,instructors}
        });
    } catch (err) {
        return res.status(500).json({
            success:false,
            message:err.message,
            error:err
        })
    }
}