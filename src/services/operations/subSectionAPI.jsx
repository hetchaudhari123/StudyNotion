import { addSection, setCourseDetails } from "../../redux/slices/courseSlice";
import apiConnector from "../apiconnector"
import { courseEndpoints } from "../apis"
import toast from "react-hot-toast";
import { fetchCourse } from "./courseAPI";
import { fetchAllCourses } from "./courseAPI";

export const addSubSection = (
    {sectionId,
    courseId,
    title,
    timeDuration,
    description,
    setCourseDetails,
    video,
    
    setModal,
    
    setSectionId
},
    setLoading = null,
    printSuccess = true
) => {
    return async (dispatch) => {
        console.log('SECTION ID..........',sectionId);
        let toastId = ""
        if (printSuccess) toastId = toast.loading("Loading...")
        if (printSuccess) setLoading(true)
        try {
            console.log({sectionId,
                courseId,
                title,
                timeDuration,
                description,
                setCourseDetails,
                video});
            const formData = new FormData();
            formData.append('video', video);
            formData.append('timeDuration', timeDuration);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('sectionId', sectionId);
            const response = await apiConnector('POST',courseEndpoints.CREATE_SUBSECTION_API,
                formData,{ 'Content-Type': 'multipart/form-data' });
            console.log('RESPONSE FROM CREATE SUBSECTION API......',response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            // Update Course Details
            console.log('COURSEID FROM ADD SUBSECTION.....',courseId);
            await dispatch(fetchCourse(courseId,null,false));
           
            if (printSuccess) {
                setLoading(false);
                toast.dismiss(toastId);
            }
            if (printSuccess)  
                toast.success("Successfully created the section");
              setModal(0);
              setSectionId(null);
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
export const editSubSection = ({subSectionId,title,description,setSectionId,setModal,setSubSectionId,timeDuration,courseId},
    setLoading = null,
    printSuccess = true
) => {
    return async (dispatch) => {

        let toastId = ""
        if (printSuccess) toastId = toast.loading("Loading...")
        if (printSuccess) setLoading(true)
    try{ 
        const response = await apiConnector('POST',courseEndpoints.UPDATE_SUBSECTION_API,{subSectionId,title,description,timeDuration});
        console.log('RESPONSE FROM UPDATE SUBSECTION API......',response);
        await dispatch(fetchCourse(courseId,null,false));

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        if (printSuccess) {
            setLoading(false);
            toast.dismiss(toastId);
        }
        if (printSuccess)  
            toast.success("Successfully updated the lecture.");
          setModal(0);
          setSectionId(null);
          setSubSectionId(null);
    }catch(err){
        console.log('ERROR FROM UPDATE SUBSECION API.....',err);
        if (printSuccess) {
            setLoading(false);
            toast.dismiss(toastId);
        }
        if (printSuccess)
            toast.error("Failed to update the lecture.");
    }
}
}
export const removeSubSection = ({subSectionId,sectionId,
    setModal,setSectionId,setSubSectionId,courseDetails
},
    setLoading = null,
    printSuccess = true
) => {
    return async (dispatch) => {
        let toastId = ""
        if (printSuccess) toastId = toast.loading("Loading...")
        if (printSuccess) setLoading(true)
        try{
            console.log('SECTIONID ->',sectionId);
            console.log('SUBSECTIONID ->',subSectionId);
            const response = await apiConnector('POST',courseEndpoints.DELETE_SUBSECTION_API,
                {subSectionId,sectionId}
            );
            console.log('RESPONSE FROM DELETE SUB SECTION API.......',
                response
            );
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            await dispatch(fetchCourse(courseDetails._id,setLoading,false));
            if (printSuccess) {
                setLoading(false);
                toast.dismiss(toastId);
            }
            if (printSuccess)  
                toast.success("Successfully deleted the lecture.");
              setModal(0);
              setSectionId(null);
              setSubSectionId(null);

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
        }
    }
}