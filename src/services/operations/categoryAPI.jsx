import apiConnector from "../apiconnector"
import { categories } from "../apis";
import toast from "react-hot-toast";
export const fetchCategory = (setLoading = null,printSuccess = true) => {
    return async (dispatch) => {
        let toastId = ""
        if(printSuccess) toastId = toast.loading("Loading...")
        if(printSuccess) setLoading(true)
        try{

            const response = await apiConnector('GET',categories.CATEGORIES_API);
            console.log("RESPONSE FROM FETCH CATEGORY......",response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            if(printSuccess){
                toast.success("Successfully fetched the categories")
                setLoading(false);
                toast.dismiss(toastId);
              }
           
            return response.data.data
        }catch(err){
            console.log("ERROR FROM FETCH CATEGORY........",err);
            if(printSuccess){
                setLoading(false);
                toast.dismiss(toastId);
              }
              if(printSuccess)
              toast.error("Failed to fetch the categories.");
            return null
        }
    }
}