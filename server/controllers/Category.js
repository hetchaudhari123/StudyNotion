const Category = require('../models/Category');
const Course = require('../models/Course');
exports.createCategory = async (req, res) => {
    try {
        //1 fetch the details
        const { name, description } = req.body;
        //2 validation
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "One or more entries are empty."
            })
        }
        //3 creation
        const categoryResponse = await Category.create({ name, description });
        console.log(categoryResponse);
        return res.status(200).json({
            success: true,
            message: "Successfully created the category."
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while creating the new tag.",
            error:err.message
        })
    }
}
exports.showAllTheCategories = async (req, res) => {
    try {
        const allCategory = await Category.find({}, { name: true, description: true });
        return res.status(200).json({
            success: true,
            message: "Successfully fetched all the categories.",
            data:allCategory
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while fetching the categories.",
            error:err.message
        })
    }
}
exports.categoryPageDetails = async (req, res) => {
    try {
        //1 fetch the categoryId
        const {categoryId} = req.body;
        //2 validation
        if (!categoryId) {
            return res.status(400).json({
                success: false,
                message: "CourseID was empty"
            })
        }
        //3 fetch all the courses of the category
        const catCourses = await Category.findById(categoryId)
            .populate('courses');
        if (!catCourses) {
            return res.status(404).json({
                success: false,
                message: "No courses found of the provided category"
            })
        }
        //4 fetch all the other courses
        const otherCourses = await Category.find({
            _id: {
                $ne: categoryId

            }
        }).populate({
            path:"courses",
            options: { strictPopulate: false }
    });
        //5 fetch the top bought courses
        const topCourse = await Course.aggregate([
            {
                $project:{
                    courseName: 1,
                    courseDescription: 1,
                    instructor: 1,
                    whatYouWillLearn: 1,
                    courseContent: 1,
                    ratingAndReviews: 1,
                    price: 1,
                    thumbnail: 1,
                    category: 1,
                    tags: 1,
                    studentCount:{$size:"$studentsEnrolled"}
                }
            }
        ]).limit(10);
        // ]).sort({studentCount:"desc"}).limit(10);
        console.log(topCourse);
        return res.status(200).json({
            success:true,
            message:"Successfully fetched all the top courses",
            data: {
                catCourses,
                otherCourses,
                topCourse
            },
        })
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}