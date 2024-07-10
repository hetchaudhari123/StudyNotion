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

const { createCourse, showAllCourses, getCourseDetails } = require('../controllers/Course');
const { createRating, getAverageRating, getAllReviews, getAllCourseReviews } = require('../controllers/RatingAndReview');
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
router.get('/get-courses',showAllCourses);
// Category can Only be Created by Admin
//getCourseDetails
// router.post('/get-course-details',getCourseDetails);
router.post('/get-course-details',getCourseDetails);
// createRating
router.post('/create-rating',auth,isStudent,createRating);
//getAverageRating
router.get('/get-average-rating',getAverageRating);
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

// createSubSection
router.post('/create-subsection',auth,isInstructor,createSubSection);
// updateSubSection
router.post('/update-subsection',auth,isInstructor,updateSubSection);
// deleteSubSection
router.post('/delete-subsection',auth,isInstructor,deleteSubSection);
module.exports = router;