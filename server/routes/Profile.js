// const express = require('express');
// const router = express.Router();
// const { auth } = require('../middlewares/auth');
// const { updateProfile, deleteAccount, getAllUserDetails, updateDisplayPicture, getEnrolledCourses,getNumberOfUsers } = require('../controllers/Profile');
// //updateProfile
// router.put('/update-profile', auth, updateProfile);
// //deleteAccount
// router.delete('/delete-profile', auth, deleteAccount);
// //getAllUserDetails
// router.get('/get-user-details', auth, getAllUserDetails);
// //updateDisplayPicture
// router.put('/update-display-picture', auth, updateDisplayPicture);
// //getEnrolledCourses
// // router.get('/get-enrolled-courses', auth, getEnrolledCourses);
// router.post('/get-enrolled-courses', auth, getEnrolledCourses);
// //contact Us
// // router.post('contactus', contactUs);
// //get number of students and teachers
// router.get('/get-number-of-users',getNumberOfUsers);
// module.exports = router;


const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { updateProfile, deleteAccount, getAllUserDetails, updateDisplayPicture, getEnrolledCourses,getNumberOfUsers } = require('../controllers/Profile');
//updateProfile
router.put('/update-profile', auth, updateProfile);
//deleteAccount
router.delete('/delete-profile', auth, deleteAccount);
//getAllUserDetails
router.get('/get-user-details', auth, getAllUserDetails);
//updateDisplayPicture
router.put('/update-display-picture', auth, updateDisplayPicture);
//getEnrolledCourses
// router.get('/get-enrolled-courses', auth, getEnrolledCourses);
router.post('/get-enrolled-courses', auth, getEnrolledCourses);
//contact Us
// router.post('contactus', contactUs);
//get number of students and teachers
router.get('/get-number-of-users',getNumberOfUsers);
module.exports = router;