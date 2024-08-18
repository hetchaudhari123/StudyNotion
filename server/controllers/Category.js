const {TIME} = require('../utils/constants')
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
            message: err.message
        })
    }
}
// Version1
// exports.categoryPageDetails = async (req, res) => {
//     try {
//         //1 fetch the categoryId
//         const {categoryId} = req.body;
//         //2 validation
//         if (!categoryId) {
//             return res.status(400).json({
//                 success: false,
//                 message: "CourseID was empty"
//             })
//         }
//         //3 fetch all the courses of the category
//         const catCourses = await Category.findById(categoryId)
//             .populate('courses');
//         if (!catCourses) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Category Not Found"
//             })
//         }
//         //4 fetch all the other courses
//         const otherCourses = await Category.find({
//             _id: {
//                 $ne: categoryId

//             }
//         }).populate({
//             path:"courses",
//             options: { strictPopulate: false }
//     });
//         //5 fetch the top bought courses
//         const topCourse = await Course.aggregate([
//             {
//                 $project:{
//                     courseName: 1,
//                     courseDescription: 1,
//                     instructor: 1,
//                     whatYouWillLearn: 1,
//                     courseContent: 1,
//                     ratingAndReviews: 1,
//                     price: 1,
//                     thumbnail: 1,
//                     category: 1,
//                     tags: 1,
//                     studentCount:{$size:"$studentsEnrolled"}
//                 }
//             }
//         ]).limit(10);
//         // ]).sort({studentCount:"desc"}).limit(10);
//         console.log(topCourse)
//         return res.status(200).json({
//             success:true,
//             message:"Successfully fetched all the required courses",
//             data: {
//                 catCourses,
//                 otherCourses,
//                 topCourse
//             },
//         })
//     } catch (err) {
//         console.log(err);

//         return res.status(500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }
// VERSION2(LOVE BABBAR)
// exports.categoryPageDetails = async (req, res) => {
//     try {
//       const { categoryId } = req.body
//       console.log("PRINTING CATEGORY ID: ", categoryId);
//       // Get courses for the specified category
//       const selectedCategory = await Category.findById(categoryId)
//         .populate({
//           path: "courses",
//           match: { status: "Published" },
//           populate: "ratingAndReviews",
//         })
//         .exec()
  
//       //console.log("SELECTED COURSE", selectedCategory)
//       // Handle the case when the category is not found
//       if (!selectedCategory) {
//         console.log("Category not found.")
//         return res
//           .status(404)
//           .json({ success: false, message: "Category not found" })
//       }
//       // Handle the case when there are no courses
//       if (selectedCategory.courses.length === 0) {
//         console.log("No courses found for the selected category.")
//         return res.status(404).json({
//           success: false,
//           message: "No courses found for the selected category.",
//         })
//       }
  
//       // Get courses for other categories
//       const categoriesExceptSelected = await Category.find({
//         _id: { $ne: categoryId },
//       })
//       let differentCategory = await Category.findOne(
//         categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
//           ._id
//       )
//         .populate({
//           path: "courses",
//           match: { status: "Published" },
//         })
//         .exec()
//         //console.log("Different COURSE", differentCategory)
//       // Get top-selling courses across all categories
//       const allCategories = await Category.find()
//         .populate({
//           path: "courses",
//           match: { status: "Published" },
//           populate: {
//             path: "instructor",
//         },
//         })
//         .exec()
//       const allCourses = allCategories.flatMap((category) => category.courses)
//       const mostSellingCourses = allCourses
//         .sort((a, b) => b.sold - a.sold)
//         .slice(0, 10)
//        // console.log("mostSellingCourses COURSE", mostSellingCourses)
//       res.status(200).json({
//         success: true,
//         data: {
//           selectedCategory,
//           differentCategory,
//           mostSellingCourses,
//         },
//       })
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Internal server error",
//         error: error.message,
//       })
//     }
//   }
exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
      // console.log("PRINTING CATEGORY ID: ", categoryId);
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: [
            { path: "ratingAndReviews" },
            { path: "instructor" },
            { path: "courseContent" }
        ]
        })
        .exec()
  
      // console.log("SELECTED COURSE.....", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCategory.courses.length === 0) {
        // console.log("No courses found for the selected category.")
        return res.status(200).json({
          success: true,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
      // const categoriesExceptSelected = await Category.find({
      //   _id: { $ne: categoryId },
      // })
    //   let differentCategory = await Category.findOne(
        // categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        //   ._id
    //   )
        // .populate({
        //   path: "courses",
        //   match: { status: "Published" },
        // })
        // .exec()
        //console.log("Different COURSE", differentCategory)
      // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: [
            { path: "ratingAndReviews" },
            { path: "instructor" },
            { path: "courseContent" }
        ]
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.courses)
      // console.log("ALL COURSES.....",allCourses)
      const selectedCourses = selectedCategory.courses
  
      console.log("ALL COURSES.....",allCourses)
      let mostSellingCourses = null
      let highestRated = null
      let latestCourses = null // Courses in descending order of their publish year
      const trendingCourses = selectedCourses.map(course => {
        // Calculate recent enrollments (assuming within last X days)
        const recentEnrollments = course.studentsEnrolled.length; // Example: Get recent enrollments 
      
        // Calculate average rating
        const totalRatings = course.ratingAndReviews.reduce((prev, review) => {
            return prev + review.rating;
        }, 0);
        const averageRating = course.ratingAndReviews.length > 0 ? (totalRatings / course.ratingAndReviews.length) : (0);
        const date = new Date(course.createdAt)
        const arrivalTime = ((Date.now() - date.getTime()) > TIME.TRENDING_THRESHOLD * 24 * (3600) * (1000)) ? (0) : (1)
        const trendingScore = recentEnrollments * averageRating * arrivalTime;
        return {
            ...course.toObject(),
            trendingScore: trendingScore
        };
    });
    latestCourses = selectedCourses.filter(course => {
      const date = new Date(course.createdAt)
      return ((Date.now() - date.getTime()) > TIME.TRENDING_THRESHOLD * 24 * (3600) * (1000)) ? (false) : (true)
      
  });
      if(selectedCourses.length < 10) {
        mostSellingCourses = selectedCourses.sort((a, b) => b.studentsEnrolled - a.studentsEnrolled)
        latestCourses = selectedCourses.sort((a,b) => {
            let aTime = new Date(a.createdAt)
            let bTime = new Date(b.createdAt)
            return bTime - aTime
        })
        trendingCourses.sort((a,b) => {
            return b.trendingScore - a.trendingScore
        })
        highestRated = selectedCourses
        .sort((a, b) => {
            let aRating = a.ratingAndReviews.reduce((prev, ele) => {
                return prev + ele.rating; // Accumulate the ratings correctly
            }, 0); // Initialize accumulator to 0
        
            let bRating = b.ratingAndReviews.reduce((prev, ele) => {
                return prev + ele.rating; // Accumulate the ratings correctly
            }, 0); // Initialize accumulator to 0
            return bRating - aRating
        })
        
      }
      else{
        latestCourses = selectedCourses.filter(course => {
          const date = new Date(course.createdAt)
          return ((Date.now() - date.getTime()) > TIME.TRENDING_THRESHOLD * 24 * (3600) * (1000)) ? (false) : (true)
          
      }).slice(0,10)
        mostSellingCourses = selectedCourses
          .sort((a, b) => b.studentsEnrolled - a.studentsEnrolled)
          .slice(0, 10)

        trendingCourses.sort((a,b) => {
            return b.trendingScore - a.trendingScore
        }).slice(0,10)

      


        highestRated = selectedCourses
        .sort((a, b) => {
            let aRating = a.ratingAndReviews.reduce((prev, ele) => {
                return prev + ele.rating; // Accumulate the ratings correctly
            }, 0); // Initialize accumulator to 0
        
            let bRating = b.ratingAndReviews.reduce((prev, ele) => {
                return prev + ele.rating; // Accumulate the ratings correctly
            }, 0); // Initialize accumulator to 0
            return bRating - aRating
        }).slice(0,10)

      }
      

      

     
      return res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          mostSellingCourses,
          highestRated,
          latestCourses,
          trendingCourses
        },
      })
      
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
