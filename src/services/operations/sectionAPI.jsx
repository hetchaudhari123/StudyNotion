
import toast from "react-hot-toast"
import { courseEndpoints } from "../apis"
import apiConnector from "../apiconnector"
import { fetchCourse } from "./courseAPI"





export const buildSection = async (
    {sectionName,
    courseDetails,
    dispatch},
    token,
    setLoading = null,
    printSuccess = true
) => {
        let toastId = ""
        if (printSuccess) toastId = toast.loading("Loading...")
        if (printSuccess) setLoading(true)
        const courseId = courseDetails._id;
        try {
            const response = await apiConnector('POST', courseEndpoints.CREATE_SECTION_API,
                { sectionName, courseId,Authorization: `Bearer ${token}` });
            console.log("RESPONSE FROM THE CREATE SECTION API.....", response)
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            await dispatch(fetchCourse(courseDetails._id,token,setLoading,false));
            
            if (printSuccess) {
                setLoading(false);
                toast.dismiss(toastId);
            }
            if (printSuccess)
                toast.success("Successfully created the section");
            return true
        } catch (err) {
            console.log("ERROR FROM THE CREATE SECTION API.......", err);
            if (printSuccess) {
                setLoading(false);
                toast.dismiss(toastId);
            }
            if (printSuccess)
                toast.error("Failed to create the section.");
            return false
        }

}

export const removeSection = async ({
    courseId, sectionId,
    dispatch,
},
    token,
    setLoading = null,
    printSuccess) => {
        let toastId = ""
        if (printSuccess) toastId = toast.loading("Loading...")
        if (printSuccess) setLoading(true)
        try{

            const response = await apiConnector('POST',courseEndpoints.DELETE_SECTION_API,{courseId,
                sectionId,
                Authorization: `Bearer ${token}`
            });
            console.log('RESPONSE FROM DELETE SECTION API.....',response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            await dispatch(fetchCourse(courseId,token,setLoading,false));
            if (printSuccess) {
                setLoading(false);
                toast.dismiss(toastId);
            }
            if (printSuccess)
                toast.success("Successfully deleted the section");
            return true

        }catch(err){
            console.log('ERROR FROM DELETE SECTION API ....',err);
            if (printSuccess) {
                setLoading(false);
                toast.dismiss(toastId);
            }
            if (printSuccess)
                toast.error("Failed to delete the section.");
            return false
        }
}

export const editSection = async ({sectionId,courseDetails,sectionName,
    setModal,
    dispatch
},
token,
    setLoading = null,
    printSuccess = true
) => {
        let toastId = ""
        if (printSuccess) toastId = toast.loading("Loading...")
        if (printSuccess) setLoading(true)
        const courseId = courseDetails._id;
        try {
            const response = await apiConnector('POST', courseEndpoints.UPDATE_SECTION_API,
                { sectionId,sectionName,Authorization: `Bearer ${token}` });
            console.log("RESPONSE FROM THE EDIT SECTION API.....", response)
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            dispatch(fetchCourse(courseId,token,setLoading,false));
            setModal(0);
            if (printSuccess) {
                setLoading(false);
                toast.dismiss(toastId);
            }
            if (printSuccess)
                toast.success("Successfully edited and saved the section!");
            return true
        } catch (err) {
            console.log("ERROR FROM THE EDIT SECTION API.......", err);
            if (printSuccess) {
                setLoading(false);
                toast.dismiss(toastId);
            }
            if (printSuccess)
                toast.error("Failed to edit the section.");
            return false
        }

}