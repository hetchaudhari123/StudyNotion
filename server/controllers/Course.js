const Tags = require("../models/Category");
const User = require("../models/User");
const Course = require('../models/Course');
const { fileUploader } = require("../utils/uploadFile");
const Category = require("../models/Category");
const CourseProgress = require("../models/CourseProgress");
const mongoose = require('mongoose');
const Section = require("../models/Section");
const RatingAndReview = require("../models/RatingAndReview");
const SubSection = require("../models/SubSection");

// MINE
exports.createCourse = async (req, res) => {
    try {
        //1 fetch the details
        let { courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tag,
            category,
            status,
            instructions } = req.body;
        const thumbnail = req.files.thumbnailImage;

        //2 validation 
        if (
            !courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !tag ||
            !thumbnail ||
            !category
        ) {
            console.log("MISSING FIELDS........",
                {
                    courseName,
                    courseDescription, whatYouWillLearn, price, tag, thumbnail, category
                }
            );
            return res.status(400).json({
                success: false,
                message: "All Fields are Mandatory",
            });
        }
        if (!status || status === undefined) {
            status = "Draft";
        }
        //2.1 validate the instructor
        const instructorID = req.user.id;
        const instructorDetails = await User.findById(instructorID, {
            accountType: "Instructor"
        });
        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "The instructor is not registered"
            })
        }
        //2.2 validate the tag
        const categoryID = category;//tags contain the id of the tag
        const categoryDetails = await Category.findById(categoryID);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "The category is not registered"
            })
        }

        //3 cloudinary insertion
        // console.log('THUMBNAIL IMAGE............');
        const thumbnailImage = await fileUploader(thumbnail, process.env.FOLDER_NAME);
        console.log('THUMBNAIL IMAGE............', thumbnailImage);

        //4 insertion into the db
        const course = await Course.create({
            courseName,
            category: categoryDetails._id,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            tag,
            status,
            instructions: instructions,
            thumbnail: thumbnailImage?.secure_url,
            Category: categoryDetails._id
        });
        await User.findByIdAndUpdate({
            _id: instructorDetails._id,
        }, { $push: { courses: course._id } }, { new: true });
        const categoryResponse = await Category.findByIdAndUpdate(category, {
            $push: { courses: course._id }
        }, { new: true });
        // console.log(categoryResponse);
        return res.status(200).json({
            success: true,
            data: course,
            message: "Successfully created the course"
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

exports.showAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({}, {
            _id: true,
            courseName: true,
            price: true,
            thumbnail: true,
            instructor: true,
            ratingAndReviews: true,
            studentsEnroled: true,
        }).populate("instructor");
        return res.status(200).json({
            success: true,
            message: "Successfully fetched all the courses",
            data: courses
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}
//BY ME
exports.getCourseDetails = async (req, res) => {
    try {
        // 1 fetch the courseID
        const { courseId } = req.body;
        // const courseId = req.body.courseId;
        //2 validation
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "The courseId field is empty"
            })
        }
        //2.1 fetch all the courses
        const courses = await Course.findById(courseId)
            .populate({
                path: "instructor",
                populate: ({
                    path: "additionalDetails"
                })
            })
            .populate({
                path: "courseContent",
                populate: ({
                    path: "subSection"
                })
            })
            .populate("category")
            .populate({
                path: "rating",
                populate: {
                    path: "review"
                },
                options: { strictPopulate: false }
            });;
        if (!courses) {
            return res.status(400).json({
                success: false,
                message: "Course doesn't exist"
            })
        }

        //3 Return the response
        return res.status(200).json({
            success: true,
            message: "Successfully fetched all the details",
            data: courses
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}



exports.editCourse = async (req, res) => {
    try {
        console.log("INSIDE EDIT COURSE!!....",req.body)
        //1 fetch the details
        let { courseid, courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tag,
            category,
            status,
            instructions } = req.body;
        const thumbnail = req?.files?.thumbnailImage;


        //2 validation 
        //2.1 validate the instructor

        const instructorID = req.user.id;
        const instructorDetails = await User.findById(instructorID, {
            accountType: "Instructor"
        });

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "The instructor is not registered"
            })
        }


        const course = await Course.findById(courseid)

        if (!course) {
            return res.status(400).json({
                success: false,
                message: `The course id ${courseid} doesn't exist.`,
            })
        }

        //2.2 validate the tag

        if (category && category !== "undefined") {
            console.log("INSIDE THE CATEGORY UPDATION...")
            const categoryDetails = await Category.findById(category);
            if (!categoryDetails) {
                return res.status(404).json({
                    success: false,
                    message: "The category is not registered"
                })

            }

            if (category !== course.category) {
                console.log("UPDATING THE CATEGORY...")
                await Category.findByIdAndUpdate(course.category, {
                    $pull: { courses: courseid }
                }, { new: true });
                course.category = category
                await Category.findByIdAndUpdate(category, {
                    $push: { courses: courseid }
                }, { new: true });
            }
        }

        //3 cloudinary insertion
        // console.log('THUMBNAIL IMAGE............');

        if (thumbnail && thumbnail !== "undefined") {

            const thumbnailImage = await fileUploader(thumbnail, process.env.FOLDER_NAME);
            // console.log('THUMBNAIL IMAGE............', thumbnailImage);
            course.thumbnail = thumbnailImage.secure_url
        }
        if (instructions && instructions !== "undefined") {
            course.instructions = instructions
        }
        if (status && status !== "undefined") {
            // console.log("STATUS......", status)
            course.status = status
        }
        if (tag && tag !== "undefined") {
            course.tag = tag
        }
        if (price && price !== "undefined") {
            course.price = price
        }
        if (whatYouWillLearn && whatYouWillLearn !== "undefined") course.whatYouWillLearn = whatYouWillLearn
        if (courseDescription && courseDescription !== "undefined") {

            course.courseDescription = courseDescription
        }

        if (courseName && courseName !== "undefined") course.courseName = courseName

        await course.save()


        return res.status(200).json({
            success: true,
            data: course,
            message: "Successfully updated the course"
        })

    } catch (err) {
        console.error("ERRRRRRRRRRR........", err);
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}
exports.getInstructorCourses = async (req, res) => {
    try {
        const instructorID = req.user.id;
        const instructorDetails = await User.findById(instructorID, {
            accountType: "Instructor"
        }).sort({ createdAt: -1 })

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "The instructor is not registered"
            })
        }
        const courses = await Course.find({ instructor: instructorID }).populate({
            path: "courseContent",
            populate: ({
                path: "subSection"
            })
        })
        .populate('ratingAndReviews')
        .populate('instructor')
        return res.status(200).json({
            success: true,
            data: courses,
            message: "Successfully fetched the courses of the instructor."
        })
    } catch (err) {
        console.error("ERROR FROM GET INSTRUCTOR COURSES........", err);
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}
exports.deleteCourse = async (req, res) => {
    try {
        let { courseId } = req.body;
        const instructorID = req.user.id;
        const instructorDetails = await User.findById(instructorID, {
            accountType: "Instructor"
        });

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "The instructor is not registered"
            })
        }


        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(400).json({
                success: false,
                message: `The course id ${courseId} doesn't exist.`,
            })
        }
       

        // const response = await Course.findByIdAndDelete(courseId)
        // Step 1: Find all sections related to the course
        const sections = await Section.find({ _id: { $in: course.courseContent } })

           // Step 2: Extract all sub-section IDs from these sections
           const subSectionIds = sections.reduce((acc, section) => {
               return acc.concat(section.subSection);
           }, []);
   
           // Step 3: Delete all sub-sections whose IDs are in the list of extracted sub-section IDs
        await SubSection.deleteMany({ _id: { $in: subSectionIds } });
        await Section.deleteMany({ _id: { $in: course.courseContent } })
        await RatingAndReview.deleteMany({ _id: { $in: course.ratingAndReviews } })
        await Category.findByIdAndUpdate(course.category, { $pull: { courses: course._id } });
        await CourseProgress.deleteMany({ courseID: courseId });
        await User.updateMany(
            { courses: courseId },
            { $pull: { courses: courseId } }
        );
        const response = await course.deleteOne()
        return res.status(200).json({
            success: true,
            message: "Successfully deleted the course",
        })

    } catch (err) {
        console.error("ERROR FROM DELETE COURSE CONTROLLER........", err);
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}





exports.getCourseProgress = async (req, res) => {
    try {
        const { courseId } = req.body
        const userId = req.user.id
        
        if (!courseId) {
            return res.status(404).json({
                success: false,
                message: "CourseId is missing"
            })
        }
        const response = await CourseProgress.findOne({
            courseID: courseId,
            userId
        })
        if (!response) {
            return res.status(400).json({
                success: false,
                message: "Corresponding Course Not Found"
            })
        }
        // console.log("COMPLETED VIDEOS....",response.completedVideos.length)
        return res.status(200).json({
            success: true,
            message: "Successfully fetched all the completed lectures",
            data: response.completedVideos
        })
    } catch (err) {
        console.log("ERROR FROM GET COURSE PROGRESS CONTROLLER.....", err)
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.updateCourseProgress = async (req, res) => {
    try {
        const { courseId, subSection } = req.body
        const userId = req.user.id
        if (!courseId || !subSection) {
            return res.status(404).json({
                success: false,
                message: "Some of the fields are missing"
            })
        }
        let response = await CourseProgress.findOne({
            courseID: courseId,
            userId
        })
        if (!response) {
            return res.status(400).json({
                success: false,
                message: "Corresponding Course Not Found"
            })
        }
        if (response.completedVideos.includes(subSection)) {
            return res.status(400).json({
                success: false,
                message: "Already completed the video"
            })
        }
        response.completedVideos.push(subSection)
        console.log("SUBSECTION INSIDE THE COURSE....",subSection)
        response = await response.save()
        
        return res.status(200).json({
            success: true,
            data: response,
            message: "Successfully updated the course progress."
        })
    } catch (err) {
        console.log("ERROR FROM UPDATE COURSE PROGRESS....", err)
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

