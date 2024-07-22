import apiConnector from "../apiconnector"
import { ratingsEndpoints } from "../apis"
import toast from "react-hot-toast"
export const fetchAllReviews = async (setLoading = null,printSuccess = true) => {
    let toastId = ""
    if(printSuccess) toastId = toast.loading("Loading...")
    if(printSuccess) setLoading(true)
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