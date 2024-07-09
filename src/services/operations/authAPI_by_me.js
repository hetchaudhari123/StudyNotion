
import { useSelector } from "react-redux"
import apiCall from "../apiconnector"
import { endpoints, settingsEndpoints } from "../apis"
import toast from "react-hot-toast"
import { setLoading, setSignupData } from "../../redux/slices/authSlice"
import { setUser } from "../../redux/slices/profileSlice"
import apiConnector from "../apiconnector"
import { FaRegSurprise } from "react-icons/fa"
import { PiColumnsPlusLeft } from "react-icons/pi"
import { profileEndpoints } from "../apis"
export const login = (email, password, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");

        dispatch(setLoading(true));
        try {

            const response = await apiCall('POST', endpoints.LOGIN_API, { email, password });
            console.log("LOGIN API RESPONSE............", response)

            dispatch(setLoading(false));
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            const token = response.data.token;
            const user = response.data.user;
            dispatch(setToken(token));
            const userImage = response.data?.user?.image ? response.data.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName}%20${response.data.user.lastName}`
            dispatch(setUser({ ...response.data.user, image: userImage }));
            localStorage.setItem('token', JSON.stringify(token));
            localStorage.setItem('user', JSON.stringify({ ...user, image: userImage }));
            toast.success("Successfully signed in!")
            navigate('/dashboard/my-profile');
        } catch (err) {
            console.log(err);
            toast.error('Login failed');
        }
        toast.dismiss(toastId);

    }
}


export const sendOtp = (email, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiCall('POST', endpoints.SENDOTP_API, { email, checkUserPresent: true });
            console.log("Response from the send otp api cal....", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success('Successfully sent the otp!');
            navigate('/verify-email');
        } catch (err) {
            console.log("Error during sending the otp:", err);
            toast.error("Couln't send the otp");
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}
export function getPasswordResetToken(email, emailSent, setEmailSent) {
    //handle loader and toast
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            //api call to send the token
            //receive response
            const response = await apiCall('POST', endpoints.RESETPASSTOKEN_API, { email });
            console.log("RESETPASSTOKEN RESPONSE............", response)

            //validation
            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            //set the emailSent to true to trigger re-render of the page

            toast.success("Successfully sent the link!");
            setEmailSent(true);

        } catch (err) {
            toast.error("Couldn't send the link");
            console.log(err);
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}
export function resetPassword(password, confirmPassword, token) {
    return async (dispatch) => {
        const toastId = toast.loading('Loading...');
        dispatch(setLoading(true));
        try {
            const response = await apiConnector('POST', settingsEndpoints.CHANGE_PASSWORD_API, { token, password, confirmPassword });
            console.log("Reset Password token response...", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Successfully reset the password!");
        } catch (err) {
            toast.error("Couldn't reset the password!");
            console.log(err);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}
export const signup = ({ otp, navigate }) => {

    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        const signupData = useSelector(state => state.auth.signupData);
        if (!signupData) {
            navigate('/signup');
        }
        const { firstName, lastName, email, contactNumber, password, confirmPassword, accountType } = signupData;
        try {
            const response = await apiConnector('POST', endpoints.SIGNUP_API, { firstName, lastName, email, contactNumber, password, confirmPassword, accountType, otp });
            console.log("SIGNUP API RESPONSE.......",response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Successfully signed you up!");
            navigate("/login");
        } catch (err) {
            console.log("SIGNUP API ERROR............", err);
            toast.error("Couldn't register you");
            navigate("/signup");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}
