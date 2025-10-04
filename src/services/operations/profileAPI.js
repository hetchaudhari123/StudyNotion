
import apiConnector from "../apiconnector"
import { profileEndpoints, ratingsEndpoints } from "../apis"
import { settingsEndpoints } from "../apis"
import { toast } from "react-hot-toast"
import { logout } from "./authAPI"
import { setUser } from "../../redux/slices/profileSlice"
import { setToken } from "../../redux/slices/authSlice"
import { endpoints } from "../apis"
export const updatePicture = (file, setLoading, token,printSuccess = false) => {
  return async (dispatch) => {

    if (printSuccess) setLoading(true)
    try {
      const formData = new FormData();
      formData.append('displayPicture', file);
      const responseDisplayPicture = await apiConnector('PUT', settingsEndpoints.UPDATE_DISPLAY_PICTURE_API, formData,
        { 'Content-Type': 'multipart/form-data' ,Authorization: `Bearer ${token}`},

      )
      console.log("RESPONSE FROM DISPLAY PICTURE........", responseDisplayPicture);
      if (printSuccess) toast.success("Successfully updated the picture.");

    } catch (error) {
      console.log("ERROR FROM UPDATEDISPLAYPICTURE......", error);
      if (printSuccess) toast.error("Failed to change the settings");
    }
    if (printSuccess) setLoading(false);
  }
}

export const updatePassword = (email,currentPassword, changePassword,token) => {
  return async () => {
    try {
      let oldPassword = currentPassword;
      let newPassword = changePassword;
      let confirmNewPassword = changePassword;
      const responseChangePassword = await apiConnector('POST', endpoints.CHANGEPASSWORD_API, { email, oldPassword, newPassword,confirmNewPassword,Authorization: `Bearer ${token}`, });
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
  about }, setLoading, email, image,token) => {
  return async (dispatch) => {

    const toastId = toast.loading("Loading...")
    setLoading(true)
    try {
      let contactNumber = phoneNo;
      let dateOfBirth = (dob);
      let [firstName, lastName] = display.trim().split(' ')
      let response;
      let imageUrl = `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`
      let check = (image).includes('cloudinary')

      if (file !== '') {
        await dispatch(updatePicture(file, setLoading, token,false));
        response = await apiConnector('PUT', settingsEndpoints.UPDATE_PROFILE_API, { dateOfBirth, about, contactNumber, gender, display, profession,Authorization: `Bearer ${token}`, })
      }
      else if (!check && file === '') {//set imageurl
        response = await apiConnector('PUT', settingsEndpoints.UPDATE_PROFILE_API, { dateOfBirth, about, contactNumber, gender, display, profession, imageUrl,Authorization: `Bearer ${token}`, });
      }
      else {
        response = await apiConnector('PUT', settingsEndpoints.UPDATE_PROFILE_API, { dateOfBirth, about, contactNumber, gender, display, profession,Authorization: `Bearer ${token}`, });
      }


      console.log("RESPONSE FROM UPDATE PROFILE API.......", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      if (changePassword !== '') {
        await dispatch(updatePassword(email,currentPassword, changePassword, changePassword,token));
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

        dispatch(setToken(response.data.token))
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

export const deleteProfile = (setLoading,navigate,token) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    setLoading(true)
    try{
      const response = await apiConnector('DELETE',profileEndpoints.DELETE_USER_API,{Authorization: `Bearer ${token}`,});
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

export const getEnrolledCourses = (setLoading,setCourses,printSuccess,token) => {
  
  
  return async (dispatch) => {  
    const toastId = toast.loading("Loading...")
    setLoading(true)
    try{
      const response = await apiConnector('POST',profileEndpoints.GET_USER_ENROLLED_COURSES_API,{Authorization: `Bearer ${token}`});
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
export const fetchAverageRating = async (courseId,token,setLoading = null,printSuccess = false) => {
      let toastId = ""
      if(printSuccess == true) toastId = toast.loading("Loading...")
      if(printSuccess == true) setLoading(true)
        try{
        const response = await apiConnector('POST',ratingsEndpoints.GET_AVERAGE_RATING_COURSES_API,{courseId,Authorization: `Bearer ${token}`});
        console.log('RESPONSE FROM AVERAGE RATING API........',response);
        if(!response.data.success){
          throw new Error(response.data.message);
        }
        if(printSuccess)
        toast.success("Successfully fetched the average rating of the course.")
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
