const BASE_URL = process.env.REACT_APP_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  CHANGEPASSWORD_API: BASE_URL + "/auth/change-password"
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/get-user-details",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/get-enrolled-courses",
  // BY ME
  GET_COUNT_USERS_API:BASE_URL + '/profile/get-number-of-users',
  
}

// STUDENTS ENDPOINTS
export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capture-payments",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}

// COURSE ENDPOINTS
export const courseEndpoints = {
  GET_ALL_COURSE_API: BASE_URL + "/course/get-courses",
  COURSE_DETAILS_API: BASE_URL + "/course/get-course-details",
  EDIT_COURSE_API: BASE_URL + "/course/edit-course",
  COURSE_CATEGORIES_API: BASE_URL + "/course/get-all-categories",
  CREATE_COURSE_API: BASE_URL + "/course/create-course",
  CREATE_SECTION_API: BASE_URL + "/course/add-section",
  CREATE_SUBSECTION_API: BASE_URL + "/course/create-subsection",
  UPDATE_SECTION_API: BASE_URL + "/course/update-section",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/update-subsection",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/get-instructor-courses",
  DELETE_SECTION_API: BASE_URL + "/course/delete-section",
  DELETE_SUBSECTION_API: BASE_URL + "/course/delete-subsection",
  DELETE_COURSE_API: BASE_URL + "/course/delete-course",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/course/get-full-course-details",
  LECTURE_COMPLETION_API: BASE_URL + "/course/update-course-progress",
  CREATE_RATING_API: BASE_URL + "/course/create-rating",
}

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/get-reviews",
}

// CATAGORIES API
export const categories = {
  CATEGORIES_API: BASE_URL + "/course/show-all-categories",
}

// CATALOG PAGE DATA
export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/course/get-category-page-details",
}
// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
}

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/update-display-picture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/update-profile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/reset-password",
  DELETE_PROFILE_API: BASE_URL + "/profile/delete-profile",
}