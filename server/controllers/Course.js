const Tags = require("../models/Category");
const User = require("../models/User");
const Course = require('../models/Course');
const { fileUploader } = require("../utils/uploadFile");
const Category = require("../models/Category");
const { SiConcourse } = require("react-icons/si");
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
                {courseName,
                    courseDescription,whatYouWillLearn,price,tag,thumbnail,category}
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
            _id:true,
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
    //   if(!status || status === undefined){
    //     status = 'Published';
    //   }
        //2.2
        // if (
        //     !courseName ||
        //     !courseDescription ||
        //     !whatYouWillLearn ||
        //     !price ||
        //     !tag ||
        //      !category
        // ) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "All Fields are Mandatory",
        //     });
        // }
         //2.3 validate the courseid
         const course = await Course.findOne({ _id: courseid });
         if (!course) {
             return res.status(400).json({
                 success: false,
                 message: `The course id ${courseid} doesn't exist.`,
             })
         } 
         //2.4
            //2.2 validate the tag
        if(category){
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "The category is not registered"
            })

        }
        if(category !== course.category){
            await Category.findByIdAndUpdate(course.category, {
            $pull: { courses: course._id }
        }, { new: true });
            course.category = category
            await Category.findByIdAndUpdate(category, {
                $push: { courses: course._id }
            }, { new: true });
        }
    }
            //3 cloudinary insertion
            // console.log('THUMBNAIL IMAGE............');
            
            if(thumbnail){

                const thumbnailImage = await fileUploader(thumbnail, process.env.FOLDER_NAME);
                // console.log('THUMBNAIL IMAGE............', thumbnailImage);
                course.thumbnail = thumbnailImage.secure_url
            }
        if(instructions){
            course.instructions = instructions
        }
        if(status){
            course.status = status
        }
        if(tag){
            course.tag = tag
        }
        if(price){
            course.price = price
        }
        if(whatYouWillLearn) course.whatYouWillLearn = whatYouWillLearn
        if(courseDescription) course.courseDescription = courseDescription
       
        if(courseName) course.courseName = courseName
        await course.save()
        //4 updation into the db
        // const updatedCourse = await Course.findOneAndUpdate(
            // { _id: courseid }, // Filter: find document by courseId
            // {
                // $set: {
                    // courseName,
                    // category: categoryDetails._id,
                    // courseDescription,
                    // instructor: instructorDetails._id,
                    // whatYouWillLearn,
                    // price,
                    // tag,
                    // status,--
                    // instructions: instructions,//--
                    // thumbnail: thumbnailImage ? (thumbnailImage?.secure_url) : (),//--
                    // Category: categoryDetails._id//--
                // }
            // },
            // { new: true } // Options: return the updated document
        // );
        
        // await User.findByIdAndUpdate({
            // _id: instructorDetails._id,
        // }, { $pull: { courses: courseid } }, { new: true });
        // await User.findByIdAndUpdate({
            // _id: instructorDetails._id,
        // }, { $push: { courses: updatedCourse._id } }, { new: true });
        // await Category.findByIdAndUpdate(category, {
            // $pull: { courses: courseid }
        // }, { new: true });
        // const categoryResponse = await Category.findByIdAndUpdate(category, {
            // $push: { courses: updatedCourse._id }
        // }, { new: true });
        // console.log(categoryResponse);
        return res.status(200).json({
            success: true,
            data: course,
            message: "Successfully updated the course"
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}