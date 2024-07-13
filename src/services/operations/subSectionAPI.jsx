import { addSection } from "../../redux/slices/courseSlice";
import apiConnector from "../apiconnector"
import { courseEndpoints } from "../apis"
import toast from "react-hot-toast";
export const addSubSection = (sectionId,
    title,
    description,
    setCourseDetails,
    setLoading = null,
    printSuccess = true) => {
    return async (dispatch) => {
        let toastId = ""
        if (printSuccess) toastId = toast.loading("Loading...")
        if (printSuccess) setLoading(true)
        try {
            const response = await apiConnector('POST',courseEndpoints.CREATE_SUBSECTION_API,{sectionId,title,
                description});
            console.log('RESPONSE FROM CREATE SUBSECTION API......',response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            // ADD SUBSECTION
            dispatch(addSection(response.data.data));
            if (printSuccess) {
                setLoading(false);
                toast.dismiss(toastId);
            }
            if (printSuccess)
                toast.success("Successfully created the section");
        } catch (err) {
            console.log('ERROR FROM CREATE SUBSECION API......',err);
            if (printSuccess) {
                setLoading(false);
                toast.dismiss(toastId);
            }
            if (printSuccess)
                toast.error("Failed to create the section.");
        }
    }
}