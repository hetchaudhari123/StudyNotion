import apiConnector from "../apiconnector"
import { courseEndpoints } from "../apis"
import toast from "react-hot-toast";
import { fetchCourse } from "./courseAPI";

export const addSubSection = async (
    {sectionId,
        dispatch,
    courseId,
    title,
    timeDuration,
    description,
    video,
    
},
token,
    setLoading = null,
    printSuccess = true
) => {
        let toastId = ""
        if (printSuccess) toastId = toast.loading("Loading...")
        if (printSuccess) setLoading(true)
        try {
            const formData = new FormData();
            formData.append('video', video);
            formData.append('timeDuration', timeDuration);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('sectionId', sectionId);
            const response = await apiConnector('POST',courseEndpoints.CREATE_SUBSECTION_API,
                formData,{ 'Content-Type': 'multipart/form-data',Authorization: `Bearer ${token}` });
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            await dispatch(fetchCourse(courseId,token,null,false));
           
            if (printSuccess) {
                setLoading(false);
                toast.dismiss(toastId);
            }
            if (printSuccess)  
                toast.success("Successfully created the lecture");
              
              return true
        } catch (err) {
            console.log('ERROR FROM CREATE SUBSECION API......',err);
            if (printSuccess) {
                setLoading(false);
                toast.dismiss(toastId);
            }
            if (printSuccess)
                toast.error("Failed to create the lecture.");
            return false
        }
}
export const editSubSection = async ({subSectionId,
    title,description,
    dispatch,timeDuration,courseId,
video},
token,
    setLoading = null,
    printSuccess = true
) => {

        let toastId = ""
        if (printSuccess) toastId = toast.loading("Loading...")
        if (printSuccess) setLoading(true)
    try{ 
        const formData = new FormData();
        formData.append('subSectionId',subSectionId);
        formData.append('title',title);
        formData.append('description',description);
        formData.append('timeDuration',timeDuration);
        formData.append('video',video);

        const response = await apiConnector('POST',courseEndpoints.UPDATE_SUBSECTION_API,formData,
            { 'Content-Type': 'multipart/form-data',Authorization: `Bearer ${token}` }
        );
        console.log('RESPONSE FROM UPDATE SUBSECTION API......',response);
        await dispatch(fetchCourse(courseId,token,null,false));

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        if (printSuccess) {
            setLoading(false);
            toast.dismiss(toastId);
        }
        if (printSuccess)  
            toast.success("Successfully updated the lecture.");
         return true
    }catch(err){
        console.log('ERROR FROM UPDATE SUBSECION API.....',err);
        if (printSuccess) {
            setLoading(false);
            toast.dismiss(toastId);
        }
        if (printSuccess)
            toast.error("Failed to update the lecture.");
        return false
    }
}
export const removeSubSection = async ({subSectionId,sectionId,
    dispatch,courseDetails
},
token,
    setLoading = null,
    printSuccess = true
) => {
        let toastId = ""
        if (printSuccess) toastId = toast.loading("Loading...")
        if (printSuccess) setLoading(true)
        try{
            console.log('SECTIONID FROM REMOVE SUB SECTION......',sectionId);
            console.log('SUBSECTIONID FROM REMOVE SUB SECTION->',subSectionId);
            const response = await apiConnector('POST',courseEndpoints.DELETE_SUBSECTION_API,
                {subSectionId,sectionId,Authorization: `Bearer ${token}`}
            );
            console.log('RESPONSE FROM DELETE SUB SECTION API.......',
                response
            );
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            await dispatch(fetchCourse(courseDetails._id,token,setLoading,false));
            if (printSuccess) {
                setLoading(false);
                toast.dismiss(toastId);
            }
            if (printSuccess)  
                toast.success("Successfully deleted the lecture.");
            return true

        }catch(err){
            console.log('ERROR FROM THE DELETE SUB SECTION API......',
                err
            );
            if (printSuccess) {
                setLoading(false);
                toast.dismiss(toastId);
            }
            if (printSuccess)
                toast.error("Failed to delete the lecture.");
            return false
        }
}


