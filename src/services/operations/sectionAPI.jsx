import toast from "react-hot-toast"
import { courseEndpoints } from "../apis"
import apiConnector from "../apiconnector"
import { setCourseDetails } from "../../redux/slices/courseSlice"
import { addSection } from "../../redux/slices/courseSlice"
export const buildSection = (
    sectionName,
    courseDetails,
    setLoading = null,
    printSuccess = true
) => {
    return async (dispatch) => {
        let toastId = ""
        if (printSuccess) toastId = toast.loading("Loading...")
        if (printSuccess) setLoading(true)
        const courseId = courseDetails._id;
        try {
            const response = await apiConnector('POST', courseEndpoints.CREATE_SECTION_API,
                { sectionName, courseId });
            console.log("RESPONSE FROM THE CREATE SECTION API.....", response)
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            dispatch(addSection(response.data.updatedCourse.courseContent));
            if (printSuccess) {
                setLoading(false);
                toast.dismiss(toastId);
            }
            if (printSuccess)
                toast.success("Successfully created the section");
        } catch (err) {
            console.log("ERROR FROM THE CREATE SECTION API.......", err);
            if (printSuccess) {
                setLoading(false);
                toast.dismiss(toastId);
            }
            if (printSuccess)
                toast.error("Failed to create the section.");
        }

    }
}