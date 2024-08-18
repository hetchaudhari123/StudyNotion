import apiConnector from "../apiconnector"
import { profileEndpoints, ratingsEndpoints } from "../apis"
import { settingsEndpoints } from "../apis"
import { toast } from "react-hot-toast"
import { login, logout } from "./authAPI"
import { setUser } from "../../redux/slices/profileSlice"
import { setToken } from "../../redux/slices/authSlice"
import { endpoints } from "../apis"
import { courseEndpoints } from "../apis"
import { removeCart } from "../../redux/slices/cartSlice"
export const updatePicture = (file, setLoading, printSuccess = false) => {
  return async (dispatch) => {

    // const toastId = printSuccess ? (toast.loading("Loading...")) : null;
    if (printSuccess) setLoading(true)
    try {
      const formData = new FormData();
      formData.append('displayPicture', file);
      const responseDisplayPicture = await apiConnector('PUT', settingsEndpoints.UPDATE_DISPLAY_PICTURE_API, formData,
        { 'Content-Type': 'multipart/form-data' },
      )
      console.log("RESPONSE FROM DISPLAY PICTURE........", responseDisplayPicture);
      if (printSuccess) toast.success("Successfully updated the picture.");

    } catch (error) {
      console.log("ERROR FROM UPDATEDISPLAYPICTURE......", error);
      if (printSuccess) toast.error("Failed to change the settings");
    }
    // if(printSuccess) toast.dismiss(toastId);
    if (printSuccess) setLoading(false);
  }
}
export const updatePassword = (email,currentPassword, changePassword) => {
  return async () => {
    try {
      let oldPassword = currentPassword;
      let newPassword = changePassword;
      let confirmNewPassword = changePassword;
      const responseChangePassword = await apiConnector('POST', endpoints.CHANGEPASSWORD_API, { email, oldPassword, newPassword,confirmNewPassword });
      console.log('RESPONSE FROM CHANGE PASSWORD......', responseChangePassword);

      if (!responseChangePassword.data.success) {
        throw new Error(responseChangePassword.data.error);
      }
    } catch (err) {
      console.log("ERROR FROM CHANGEPASSWORD.........", err);
    }
  }
}
export const setProfile = ({ file,
  display,
  profession,
  dob,
  gender,
  countrycode,
  phoneNo,
  currentPassword,
  changePassword,
  about }, setLoading, email, image) => {
  return async (dispatch) => {

    const toastId = toast.loading("Loading...")
    setLoading(true)
    try {
      let contactNumber = phoneNo;
      let dateOfBirth = (dob);
      let [firstName, lastName] = display.trim().split(' ')
      let response;
      let imageUrl = `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`
      // const pattern = /^https:\/\/res\.cloudinary\.com-.*-StudyNotion$/; 
      // let check = pattern.test(user?.image);
      let check = (image).includes('cloudinary')
      console.log("CHECK.........", check);

      if (file !== '') {
        await dispatch(updatePicture(file, setLoading, false));
        response = await apiConnector('PUT', settingsEndpoints.UPDATE_PROFILE_API, { dateOfBirth, about, contactNumber, gender, display, profession })
      }
      else if (!check && file === '') {//set imageurl
        response = await apiConnector('PUT', settingsEndpoints.UPDATE_PROFILE_API, { dateOfBirth, about, contactNumber, gender, display, profession, imageUrl });
      }
      else {
        response = await apiConnector('PUT', settingsEndpoints.UPDATE_PROFILE_API, { dateOfBirth, about, contactNumber, gender, display, profession });
      }


      console.log("RESPONSE FROM UPDATE PROFILE API.......", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      if (changePassword !== '') {
        await dispatch(updatePassword(email,currentPassword, changePassword, changePassword));
      }
      await dispatch(logout());
      try {
        let password = (changePassword !== '') ? (changePassword) : currentPassword;
        const response = await apiConnector("POST", endpoints.LOGIN_API, {
          email,
          password,
        })

        console.log("LOGIN API RESPONSE FROM WITHIN SET PROFILE............", response)


        if (!response.data.success) {
          throw new Error(response.data.message)
        }

        // toast.success("Login Successful")
        dispatch(setToken(response.data.token))
        console.log("IMAGE.........", response.data?.user?.image);
        const userImage = response.data?.user?.image
          ? response.data.user.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
        dispatch(setUser({ ...response.data.user, image: userImage }))
        localStorage.setItem("token", JSON.stringify(response.data.token))
      } catch (error) {
        console.log("LOGIN API ERROR FROM WITHIN SET PROFILE ............", error)
        throw new Error(error);
      }

      setLoading(false);
      toast.dismiss(toastId);
      toast.success("Successfully updated the profile!");
    } catch (err) {
      setLoading(false);
      toast.dismiss(toastId);
      toast.error("Failed to change the settings");
      console.log("ERROR FROM UPDATE PROFILE API.....", err);
    }

  }
}
export const deleteProfile = (setLoading,navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    setLoading(true)
    try{
      const response = await apiConnector('DELETE',profileEndpoints.DELETE_USER_API);
      if(!response.data.success){
        throw new Error(response.data.message);
      }
      console.log('RESPONSE FROM DELETE PROFILE.......',response);
      setLoading(false);
      toast.dismiss(toastId);
      toast.success("Successfully deleted the profile!");
      await dispatch(logout(navigate));
    }catch(err){
        console.log('ERROR FROM DELETE PROFILE API........',err);
        setLoading(false);
        toast.dismiss(toastId);
        toast.error("Failed to delete the profile");
    }
  }
}
export const getEnrolledCourses = (setLoading,setCourses,printSuccess) => {
  
  
  return async (dispatch) => {  
    const toastId = toast.loading("Loading...")
    setLoading(true)
    try{
      const response = await apiConnector('GET',profileEndpoints.GET_USER_ENROLLED_COURSES_API);
      console.log("RESPONSE FROM GET ENROLLED COURSES API.........",response);
      if(!response.data.success){
        throw new Error(response.data.message);
      }
      if(printSuccess) toast.success("Successfully fetched all the courses!");
      setCourses(response?.data?.data?.courses);
      
      setLoading(false);
        toast.dismiss(toastId);
      
    }catch(err){
      console.log('ERROR FROM GET ENROLLED COURSES API.........',err);
      toast.error("Failed to fetch the enrolled courses");
      setLoading(false);
      toast.dismiss(toastId);
    }

  }
}
export const fetchAverageRating = async (courseId,setLoading = null,printSuccess = true) => {
      let toastId = ""
      if(printSuccess) toastId = toast.loading("Loading...")
      if(printSuccess) setLoading(true)
        try{
        const response = await apiConnector('POST',ratingsEndpoints.GET_AVERAGE_RATING_COURSES_API,{courseId});
        console.log('RESPONSE FROM AVERAGE RATING API........',response);
        if(!response.data.success){
          throw new Error(response.data.message);
        }
        if(printSuccess)
        toast.success("Successfully fetched the average rating of the course.")
        // response?.data?.data?.courses[]
        if(printSuccess){
          setLoading(false);
          toast.dismiss(toastId);
        }
        return response?.data?.average
      }catch(err){
        console.log('ERROR FROM AVERAGE RATING API......',err);
        if(printSuccess){
          setLoading(false);
          toast.dismiss(toastId);
        }
        if(printSuccess)
        toast.error("Failed to fetch the average rating of the course.");
        return null;
      }
    
}
