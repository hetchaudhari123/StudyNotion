import apiConnector from "../apiconnector"
import { profileEndpoints } from "../apis"
import { settingsEndpoints } from "../apis"
import { toast } from "react-hot-toast"
import { login, logout } from "./authAPI"
import { setUser } from "../../redux/slices/profileSlice"
import { setToken } from "../../redux/slices/authSlice"
import { endpoints } from "../apis"
export const setProfile = ({   file,
    display,
    profession,
    dob,
    gender,
    countrycode,
    phoneNo,
    currentPassword,
    changePassword,
    about},imageUrl,setLoading,navigate,email) => {
    return async (dispatch) => {
      // dateOfBirth = "", about = "", contactNumber, gender -> updateProfile
      // imageUrl -> updateDisplay Picture
      // UPDATE_PROFILE_API
      const toastId = toast.loading("Loading...")
      setLoading(true)
      try{
      let contactNumber = phoneNo;
      let dateOfBirth = (dob);
      const response = await apiConnector('PUT',settingsEndpoints.UPDATE_PROFILE_API,{dateOfBirth, about , contactNumber , gender,display,profession})
      console.log("RESPONSE FROM UPDATE PROFILE API.......",response);
      if(!response.data.success){
        throw new Error(response.data.message);
      }
      setLoading(false);
      toast.dismiss(toastId);
      toast.success("Successfully updated the profile!");
      
      dispatch(logout());
      try {
        let password = currentPassword;
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
        const userImage = response.data?.user?.image
          ? response.data.user.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
        dispatch(setUser({ ...response.data.user, image: userImage }))
        localStorage.setItem("token", JSON.stringify(response.data.token))
        // navigate("/dashboard/my-profile")
      } catch (error) {
        console.log("LOGIN API ERROR FROM WITHIN SET PROFILE ............", error)
      }
    }catch(err){
        setLoading(false);
        toast.dismiss(toastId);
        toast.error("Failed to change the settings");
        console.log("ERROR FROM UPDATE PROFILE API.....",err);
    }
  
    }
  }