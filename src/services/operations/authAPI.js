import { toast } from "react-hot-toast"

// import { setLoading, setToken } from "../../slices/authSlice"
import { setLoading,setToken } from "../../redux/slices/authSlice"
// import { resetCart } from "../../slices/cartSlice"
import { resetCart } from "../../redux/slices/cartSlice"
// import { setUser } from "../../slices/profileSlice"
import { setUser } from "../../redux/slices/profileSlice"
// import { apiConnector } from "../apiconnector"
import apiConnector from "../apiconnector"
// import { endpoints } from "../apis"
import { endpoints } from "../apis"
import { Navigate } from "react-router-dom"
import { profileEndpoints } from "../apis"
import { courseEndpoints } from "../apis"
import { settingsEndpoints } from "../apis"
const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)
      console.log(response.data.success)
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setUser({ ...response.data.user, image: userImage }))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      navigate("/dashboard/my-profile")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      })

      console.log("RESETPASSTOKEN RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Reset Email Sent")
      setEmailSent(true)
    } catch (error) {
      console.log("RESETPASSTOKEN ERROR............", error)
      toast.error("Failed To Send Reset Email")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      // console.log("..................YES....")
      // console.log(RESETPASSTOKEN_API);
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      })

      // console.log("RESETPASSWORD RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Password Reset Successfully")
      const email = response.data.data.email;
      navigate("/reset-password-successful", { state: { email } });
    } catch (error) {
      console.log("RESETPASSWORD ERROR............", error)
      toast.error("Failed To Reset Password")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    if(navigate) toast.success("Logged Out")
    if(navigate){
      console.log("INSIDE LOG OUT");
      navigate("/")
    }
  }
}


//BY ME FOR CALCULATING THE STATS
export const findStats = (setStats) => {
  return async (dispatch) => {
      //handle the toast and loading
      //not required since it would be there within the component itself.
      try{
          //call the apis
          // GET_COUNT_USERS_API
          const users_response = await apiConnector('GET',profileEndpoints.GET_COUNT_USERS_API);
          // console.log('COUNT_USERS API RESPONSE....',users_response);
          if(!users_response.data.success){
              throw new Error(users_response.data.message);
          }
          const courses_response = await apiConnector('GET',courseEndpoints.GET_ALL_COURSE_API);
          console.log('GET_ALL_COURSES API RESPONSE....',courses_response);
          if(!courses_response.data.success){
            // console.log(courses_response.data);
            throw new Error(courses_response.data.message);
        }
        let students = users_response.data.data.students;
        if(students >= 1000)
        students = students / 1000;
        let student_tag = "";
        while(students / 1000 >= 1){
          students /= 1000;
          if(student_tag === "") student_tag = "K";
          else if(student_tag === "K") student_tag = "M";
          else {
            student_tag = "B";
            break;
          }
        }
        let mentors = users_response.data.data.instructors ;
        let courses = courses_response.data.data.length ;
        let mentor_tag = "";
        let course_tag = "";
        while(mentors / 1000 >= 1){
          mentors /= 1000;
          if(mentor_tag === "") mentor_tag = "K";
          else if(mentor_tag === "K") mentor_tag = "M";
          else {
            mentor_tag = "B";
            break;
          }
        }
        while(courses / 1000 >= 1){
          courses /= 1000;
          if(course_tag === "") course_tag = "K";
          else if(course_tag === "K") course_tag = "M";
          else {
            course_tag = "B";
            break;
          }
        }
          setStats([{count:(students + student_tag) + `${(student_tag === "") ? "" : "+"}`,label:'Active Students'},
            {count:(mentors + mentor_tag) + `${(mentor_tag === "") ? "" : "+"}`,label:'Mentors'},
            {count:(courses + course_tag) + `${(course_tag === "") ? "" : "+"}`,label:'Courses'},
            {count:'50+',label:'Awards'}]);
      }catch(err){
          console.log("ERROR WHILE CALCULATING THE STATS",err);
      }
  }
}


