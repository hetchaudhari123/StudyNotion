// const express = require('express');
// const { createCategory, showAllTheCategories, categoryPageDetails } = require('../controllers/Category');
// const { auth, isInstructor, isStudent, isAdmin } = require('../middlewares/auth');
// //TODO:ADD EDIT COURSE (COMMENT BY ME)
// // TODO:getFullCourseDetails(COMMENT BY ME)
// // TODO:getEnrolledCourses(COMMENT BY ME)
// // TODO:getInstructorCourses(COMMENT BY ME)
// // TODO:deleteCourse(COMMENT BY ME)
// // TODO:updateCourseProgress(COMMENT BY ME)
// // TODO:getProgressPercentage(COMMENT BY ME)

// const { createCourse, showAllCourses, getCourseDetails, editCourse,getInstructorCourses, deleteCourse, getCourseProgress, updateCourseProgress } = require('../controllers/Course');
// const { createRating, getAverageRating, getAllReviews, getAllCourseReviews,editRating,fetchUserRating } = require('../controllers/RatingAndReview');
// const { createSection, updateSection, deleteSection } = require('../controllers/Section');
// const { createSubSection, updateSubSection, deleteSubSection } = require('../controllers/SubSection');

// const router = express.Router();
// // createCategory
// router.post('/create-category',auth,isAdmin,createCategory);
// // showAllTheCategories
// router.get('/get-all-categories',showAllTheCategories);
// // categoryPageDetails
// //IT IS POST IN CODEBASE
// router.post('/category-page-details',categoryPageDetails);

// // create Course
// router.post('/create-course',auth,isInstructor,createCourse);
// // showAllCourses
// router.get('/get-courses',showAllCourses);
// // Category can Only be Created by Admin
// //getCourseDetails
// // router.post('/get-course-details',getCourseDetails);
// router.post('/get-course-details',getCourseDetails);
// // createRating
// router.post('/create-rating',auth,isStudent,createRating);
// // fetch user rating
// router.post('/get-user-rating',auth,isStudent,fetchUserRating);
// // edit user rating
// router.post('/edit-user-rating',auth,isStudent,editRating);
// //getAverageRating
// router.post('/get-average-rating',getAverageRating);
// // getAllReviews
// router.get('/get-reviews',getAllReviews);
// // getAllCourseReviews
// router.get('/get-course-reviews',getAllCourseReviews);
// // createSection
// router.post('/add-section',auth,isInstructor,createSection);
// //updateSection
// router.post('/update-section',auth,isInstructor,updateSection);
// // deleteSection
// // router.post('/delete-section',auth,isInstructor,deleteSection);
// // Define the route with parameters and apply the middleware
// router.post('/delete-section', auth, isInstructor, deleteSection);
// router.delete('/delete-course', auth, isInstructor, deleteCourse);

// // createSubSection
// router.post('/create-subsection',auth,isInstructor,createSubSection);
// // updateSubSection
// router.post('/update-subsection',auth,isInstructor,updateSubSection);
// // deleteSubSection
// router.post('/delete-subsection',auth,isInstructor,deleteSubSection);
// router.post('/get-course-progress',auth,getCourseProgress);
// router.post('/update-course-progress',auth,updateCourseProgress);
// router.put('/edit-course',auth,isInstructor,editCourse);
// router.get('/get-instructor-courses',auth,isInstructor,getInstructorCourses);
// module.exports = router;




const express = require('express');
const { createCategory, showAllTheCategories, categoryPageDetails } = require('../controllers/Category');
const { auth, isInstructor, isStudent, isAdmin } = require('../middlewares/auth');
//TODO:ADD EDIT COURSE (COMMENT BY ME)
// TODO:getFullCourseDetails(COMMENT BY ME)
// TODO:getEnrolledCourses(COMMENT BY ME)
// TODO:getInstructorCourses(COMMENT BY ME)
// TODO:deleteCourse(COMMENT BY ME)
// TODO:updateCourseProgress(COMMENT BY ME)
// TODO:getProgressPercentage(COMMENT BY ME)

const { createCourse, showAllCourses, getCourseDetails, editCourse,getInstructorCourses, deleteCourse, getCourseProgress, updateCourseProgress } = require('../controllers/Course');
const { createRating, getAverageRating, getAllReviews, getAllCourseReviews,editRating,fetchUserRating } = require('../controllers/RatingAndReview');
const { createSection, updateSection, deleteSection } = require('../controllers/Section');
const { createSubSection, updateSubSection, deleteSubSection } = require('../controllers/SubSection');

const router = express.Router();
// createCategory
router.post('/create-category',auth,isAdmin,createCategory);
// showAllTheCategories
router.get('/get-all-categories',showAllTheCategories);
// categoryPageDetails
//IT IS POST IN CODEBASE
router.post('/category-page-details',categoryPageDetails);

// create Course
router.post('/create-course',auth,isInstructor,createCourse);
// showAllCourses
// router.get('/get-courses',showAllCourses);
router.post('/get-courses',showAllCourses);
// Category can Only be Created by Admin
//getCourseDetails
// router.post('/get-course-details',getCourseDetails);
router.post('/get-course-details',getCourseDetails);
// createRating
router.post('/create-rating',auth,isStudent,createRating);
// fetch user rating
router.post('/get-user-rating',auth,isStudent,fetchUserRating);
// edit user rating
router.post('/edit-user-rating',auth,isStudent,editRating);
//getAverageRating
router.post('/get-average-rating',getAverageRating);
// getAllReviews
router.get('/get-reviews',getAllReviews);
// getAllCourseReviews
router.get('/get-course-reviews',getAllCourseReviews);
// createSection
router.post('/add-section',auth,isInstructor,createSection);
//updateSection
router.post('/update-section',auth,isInstructor,updateSection);
// deleteSection
// router.post('/delete-section',auth,isInstructor,deleteSection);
// Define the route with parameters and apply the middleware
router.post('/delete-section', auth, isInstructor, deleteSection);
router.delete('/delete-course', auth, isInstructor, deleteCourse);

// createSubSection
router.post('/create-subsection',auth,isInstructor,createSubSection);
// updateSubSection
router.post('/update-subsection',auth,isInstructor,updateSubSection);
// deleteSubSection
router.post('/delete-subsection',auth,isInstructor,deleteSubSection);
router.post('/get-course-progress',auth,getCourseProgress);
router.post('/update-course-progress',auth,updateCourseProgress);
router.put('/edit-course',auth,isInstructor,editCourse);
// router.get('/get-instructor-courses',auth,isInstructor,getInstructorCourses);
router.post('/get-instructor-courses',auth,isInstructor,getInstructorCourses);
module.exports = router;