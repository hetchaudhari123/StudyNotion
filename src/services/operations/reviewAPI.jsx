
import apiConnector from "../apiconnector"
import { ratingsEndpoints } from "../apis"
import toast from "react-hot-toast"
export const fetchAllReviews = async (setLoading = null,printSuccess = false) => {
    let toastId = ""
    if(printSuccess == true) toastId = toast.loading("Loading...")
    if(printSuccess == true) setLoading(true)
    try{
        const response = await apiConnector('GET',ratingsEndpoints.REVIEWS_DETAILS_API)
        console.log("RESPONSE FROM REVIEW DETAILS API....",response)
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        if(printSuccess)
            toast.success("Successfully fetched all the reviews")
        if(printSuccess){
            setLoading(false);
            toast.dismiss(toastId);
          }
        return response.data.data
    }catch(err){
        console.log("ERROR FROM REVIEW DETAILS API....",err)
        if(printSuccess){
            setLoading(false);
            toast.dismiss(toastId);
          }
          if(printSuccess)
          toast.error("Failed to fetch the reviews");
        return null
    }
}


export const fetchUserRating = async ({courseId},token,setLoading = null,printSuccess = false) => {
    let toastId = ""
    if(printSuccess == true) toastId = toast.loading("Loading...")
    if(printSuccess == true) setLoading(true)
    try{
        const response = await apiConnector('POST',ratingsEndpoints.GET_USER_RATING,{courseId,Authorization: `Bearer ${token}`})
        console.log("RESPONSE FROM GET USER RATINGS API....",response)
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        if(printSuccess)
            toast.success("Successfully fetched the user review")
        if(printSuccess){
            setLoading(false);
            toast.dismiss(toastId);
          }
        
        return response.data.data
    }catch(err){
        console.log("ERROR FROM GET USER RATING API....",err)
        if(printSuccess){
            setLoading(false);
            toast.dismiss(toastId);
          }
          if(printSuccess)
          toast.error("Failed to fetch the review");
        return null
    }
}

export const updateUserRating = async ({courseId,review,rating},token,setLoading = null,printSuccess = false) => {
    let toastId = ""
    if(printSuccess == true) toastId = toast.loading("Loading...")
    if(printSuccess == true) setLoading(true)
    try{
        const response = await apiConnector('POST',ratingsEndpoints.UPDATE_USER_RATING,{courseId,review,rating,Authorization: `Bearer ${token}`})
        console.log("RESPONSE FROM UPDATE USER RATING API....",response)
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        if(printSuccess)
            toast.success("Successfully updated the user review")
        if(printSuccess){
            setLoading(false);
            toast.dismiss(toastId);
          }
        
        return response.data.data
    }catch(err){
        console.log("ERROR FROM UPDATE USER RATING API....",err)
        if(printSuccess){
            setLoading(false);
            toast.dismiss(toastId);
          }
          if(printSuccess)
          toast.error("Failed to update the review");
        return null
    }
}


