// import toast from "react-hot-toast"
// import { courseEndpoints } from "../apis"
// import apiConnector from "../apiconnector"
// import { setCourseDetails } from "../../redux/slices/courseSlice"
// import { addSection } from "../../redux/slices/courseSlice"
// import { fetchCourse } from "./courseAPI"
// import { TbTrack } from "react-icons/tb"


// export const buildSection = async (
//     {sectionName,
//     courseDetails,
//     dispatch},
//     setLoading = null,
//     printSuccess = true
// ) => {
//     // return async (dispatch) => {
//         let toastId = ""
//         if (printSuccess) toastId = toast.loading("Loading...")
//         if (printSuccess) setLoading(true)
//         const courseId = courseDetails._id;
//         try {
//             const response = await apiConnector('POST', courseEndpoints.CREATE_SECTION_API,
//                 { sectionName, courseId });
//             console.log("RESPONSE FROM THE CREATE SECTION API.....", response)
//             if (!response.data.success) {
//                 throw new Error(response.data.message);
//             }
//             // dispatch(addSection(response.data.updatedCourse.courseContent));
//             await dispatch(fetchCourse(courseDetails._id,setLoading,false));
            
//             if (printSuccess) {
//                 setLoading(false);
//                 toast.dismiss(toastId);
//             }
//             if (printSuccess)
//                 toast.success("Successfully created the section");
//             return true
//         } catch (err) {
//             console.log("ERROR FROM THE CREATE SECTION API.......", err);
//             if (printSuccess) {
//                 setLoading(false);
//                 toast.dismiss(toastId);
//             }
//             if (printSuccess)
//                 toast.error("Failed to create the section.");
//             return false
//         }

//     // }
// }

// export const removeSection = async ({
//     courseId, sectionId,
//     dispatch,
//     setSubSectionId,
//     setSectionId
// },
//     setModal,
//     setLoading = null,
//     printSuccess) => {
//     // return async (dispatch) => {
//         let toastId = ""
//         if (printSuccess) toastId = toast.loading("Loading...")
//         if (printSuccess) setLoading(true)
//         try{
//             // const url = `${courseEndpoints.DELETE_SECTION_API}?courseId=${courseId}&sectionId=${sectionId}`;
//             // console.log("URL PASSED THROUGH REMOVE SECTION....",courseEndpoints.DELETE_SECTION_API,
//                 // {courseId,sectionId}
//             // );

//             const response = await apiConnector('POST',courseEndpoints.DELETE_SECTION_API,{courseId,
//                 sectionId
//             });
//             console.log('RESPONSE FROM DELETE SECTION API.....',response);
//             if(!response.data.success){
//                 throw new Error(response.data.message);
//             }
//             await dispatch(fetchCourse(courseId,setLoading,false));
//             if (printSuccess) {
//                 setLoading(false);
//                 toast.dismiss(toastId);
//             }
//             if (printSuccess)
//                 toast.success("Successfully deleted the section");
//             return true

//         }catch(err){
//             console.log('ERROR FROM DELETE SECTION API ....',err);
//             if (printSuccess) {
//                 setLoading(false);
//                 toast.dismiss(toastId);
//             }
//             if (printSuccess)
//                 toast.error("Failed to delete the section.");
//             return false
//         }
//     // }
// }

// export const editSection = async ({sectionId,courseDetails,sectionName,
//     setModal,
//     dispatch
// },
//     setLoading = null,
//     printSuccess = true
// ) => {
//     // return async (dispatch) => {
//         let toastId = ""
//         if (printSuccess) toastId = toast.loading("Loading...")
//         if (printSuccess) setLoading(true)
//         const courseId = courseDetails._id;
//         // console.log("DETAILS....",sectionId,courseDetails,sectionName)
//         try {
//             const response = await apiConnector('POST', courseEndpoints.UPDATE_SECTION_API,
//                 { sectionId,sectionName });
//             console.log("RESPONSE FROM THE EDIT SECTION API.....", response)
//             if (!response.data.success) {
//                 throw new Error(response.data.message);
//             }
//             // dispatch(addSection(response.data.updatedCourse.courseContent));
//             dispatch(fetchCourse(courseId,setLoading,false));
//             setModal(0);
//             if (printSuccess) {
//                 setLoading(false);
//                 toast.dismiss(toastId);
//             }
//             if (printSuccess)
//                 toast.success("Successfully edited and saved the section!");
//             return true
//         } catch (err) {
//             console.log("ERROR FROM THE EDIT SECTION API.......", err);
//             if (printSuccess) {
//                 setLoading(false);
//                 toast.dismiss(toastId);
//             }
//             if (printSuccess)
//                 toast.error("Failed to edit the section.");
//             return false
//         }

//     // }
// }


import toast from "react-hot-toast"
import { courseEndpoints } from "../apis"
import apiConnector from "../apiconnector"
import { setCourseDetails } from "../../redux/slices/courseSlice"
import { addSection } from "../../redux/slices/courseSlice"
import { fetchCourse } from "./courseAPI"
import { TbTrack } from "react-icons/tb"





export const buildSection = async (
    {sectionName,
    courseDetails,
    dispatch},
    token,
    setLoading = null,
    printSuccess = true
) => {
    // return async (dispatch) => {
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
            // dispatch(addSection(response.data.updatedCourse.courseContent));
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

    // }
}

export const removeSection = async ({
    courseId, sectionId,
    dispatch,
    setSubSectionId,
    setSectionId
},
    setModal,
    token,
    setLoading = null,
    printSuccess) => {
    // return async (dispatch) => {
        let toastId = ""
        if (printSuccess) toastId = toast.loading("Loading...")
        if (printSuccess) setLoading(true)
        try{
            // const url = `${courseEndpoints.DELETE_SECTION_API}?courseId=${courseId}&sectionId=${sectionId}`;
            // console.log("URL PASSED THROUGH REMOVE SECTION....",courseEndpoints.DELETE_SECTION_API,
                // {courseId,sectionId}
            // );

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
    // }
}

export const editSection = async ({sectionId,courseDetails,sectionName,
    setModal,
    dispatch
},
token,
    setLoading = null,
    printSuccess = true
) => {
    // return async (dispatch) => {
        let toastId = ""
        if (printSuccess) toastId = toast.loading("Loading...")
        if (printSuccess) setLoading(true)
        const courseId = courseDetails._id;
        // console.log("DETAILS....",sectionId,courseDetails,sectionName)
        try {
            const response = await apiConnector('POST', courseEndpoints.UPDATE_SECTION_API,
                { sectionId,sectionName,Authorization: `Bearer ${token}` });
            console.log("RESPONSE FROM THE EDIT SECTION API.....", response)
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            // dispatch(addSection(response.data.updatedCourse.courseContent));
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

    // }
}