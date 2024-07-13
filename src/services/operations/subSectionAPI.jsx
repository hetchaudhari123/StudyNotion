import { addSection } from "../../redux/slices/courseSlice";
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
    reset,
    setModal,
    initialValues,
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