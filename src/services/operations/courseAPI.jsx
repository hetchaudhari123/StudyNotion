// import { useDispatch, useSelector } from "react-redux"
// import apiConnector from "../apiconnector"
// import { catalogData, courseEndpoints } from "../apis"
// import toast from "react-hot-toast"
// import { setEditCourse,setStep,setCourseDetails } from "../../redux/slices/courseSlice"
// // import { categoryPageDetails } from "../../../server/controllers/Category"

// // CREATE_COURSE_API
// export const setImageUrl = async (value,obj = null,setImage = null) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//         if (obj) {
//             // Ensure obj is extensible by creating a new object with existing properties and the new property
//             obj = { ...obj, thumbnailImage: reader.result };
//         }
//        setImage(reader.result);
//     }
//     reader.readAsDataURL(value);
// }
// // export const formDatatoObject = async (formData) => {
// //     const obj = {};
// //     formData.forEach((value, key) => {
// //         if(key !== 'thumbnailImage')
// //         obj[key] = value;
       
// //     });
// //     await setImageUrl(formData.get('thumbnailImage'),obj);
// //     return obj;
// // }
// export const buildCourse = async ({
//     courseDescription,
//     whatYouWillLearn,
//     price,
//     dispatch,
//     tag,
//     category,
//     status,
//     instructions,
//     file,
//     courseName
// }, setLoading, printSuccess = true) => {
//     // return async (dispatch) => {
//         let toastId = ""
//         if (printSuccess) toastId = toast.loading("Loading...")
//         if (printSuccess) setLoading(true)
//         try {
//             const formData = new FormData();
//             formData.append('thumbnailImage', file);
//             formData.append('courseDescription', courseDescription);
//             formData.append('whatYouWillLearn', whatYouWillLearn);
//             formData.append('price', price);
//             formData.append('tag', tag);
//             formData.append('category', category);
//             formData.append('status', status);
//             formData.append('instructions', instructions);
//             formData.append('courseName', courseName);
//             const response = await apiConnector('POST', courseEndpoints.CREATE_COURSE_API, 
//                 formData, { 'Content-Type': 'multipart/form-data' });
//             console.log("RESPONSE FROM THE CREATE COURSE API.....", response);
//             if (!response.data.success) {
//                 throw new Error(response.data.message);
//             }
//             // formData.append('id',response.data.data._id);
//             // const responseData = response.data.data;
//             // const formObj = await formDatatoObject(formData);
//             // console.log("OBJECT....",formObj);
//             // dispatch(setCourseDetails(formObj));
//             localStorage.setItem("courseDetails", JSON.stringify(response.data.data))
//             dispatch(setCourseDetails(response.data.data))
//             if (printSuccess) {
//                 setLoading(false);
//                 toast.dismiss(toastId);
//             }
//             if (printSuccess)
//                 toast.success("Successfully saved the course");
//             // setEditCourse(true);
//             // dispatch(setStep(2));
//             return true
//         } catch (err) {
//             console.log("ERROR FROM CREATE COURSE API........", err);
//             if (printSuccess) {
//                 setLoading(false);
//                 toast.dismiss(toastId);
//             }
//             if (printSuccess)
//                 toast.error("Failed to save the course.");
//             return false
//         }
        
//     // }
// }
// export const updateCourse = async (
//     {
//         courseDescription,
//         dispatch,
//         whatYouWillLearn,
//         price,
//         tag,
//         category,
//         status,
//         instructions,
//         file,
//         courseDetails,
//         courseName
//     }, setLoading,printSuccess = true
// ) => {
//     // return async (dispatch) => {
//         let toastId = ""
//         if (printSuccess) toastId = toast.loading("Loading...")
//         if (printSuccess) setLoading(true)
//         try {
//     // console.log("FORM DATA...",file)
//     // console.log("FORM DATA...",courseDescription)
//     // console.log("FORM DATA...",whatYouWillLearn)
//     // console.log("FORM DATA...",price)
//     // console.log("FORM DATA...",tag)
//     // console.log("FORM DATA...",category)
//     // console.log("FORM DATA...",status)
//     // console.log("FORM DATA...",instructions)
//     // console.log("FORM DATA...",courseName)
//     // console.log("COURSEID INSIDE COURSEAPI.....",courseDetails._id)
//     // console.log("STATUS INSIDE THE COURSE API.....",status)

//             const formData = new FormData();
//             formData.append('thumbnailImage', file);
//             formData.append('courseDescription', courseDescription);
//             formData.append('courseid', courseDetails._id);
//             formData.append('whatYouWillLearn', whatYouWillLearn);
//             formData.append('price', price);
//             formData.append('tag', tag);
//             formData.append('category', category);
            
//             formData.append('status', status);
//             formData.append('instructions', instructions);
//             formData.append('courseName', courseName);
          
//             const response = await apiConnector('PUT', 
//                 courseEndpoints.EDIT_COURSE_API, 
//                 formData,
//                  { 'Content-Type': 'multipart/form-data' });
//             console.log("RESPONSE FROM THE EDIT COURSE API.....", response);
//             if (!response.data.success) {
//                 throw new Error(response.data.message);
//             }
      
//             const responseData = response.data.data;
//             // const formObj = await formDatatoObject(formData);
//             // console.log("OBJECT....",formObj);
//             // dispatch(setCourseDetails(formObj));
//             await dispatch(fetchCourse(courseDetails._id,setLoading,false))
//             // setEditCourse(true);
//             // dispatch(setStep(2));
//             if (printSuccess) {
//                 setLoading(false);
//                 toast.dismiss(toastId);
//             }
//             if (printSuccess)
//                 toast.success("Successfully edited and saved the course");
//             return true
//         } catch (err) {
//             console.log("ERROR FROM EDIT COURSE API........", err);
//             if (printSuccess) {

//                 setLoading(false);
//                 toast.dismiss(toastId);
//             }
//             if (printSuccess)
//                 toast.error("Failed to edit the course.");
//             return false
//         }
       
//     // }
// }
// export const fetchCourse = (courseId,setLoading = null , printSuccess = true) => {
    
//     return async (dispatch) => {
//         let toastId = ""
//         if (printSuccess) toastId = toast.loading("Loading...")
//         if (printSuccess) setLoading(true)
//         try{   
//             // const response = await apiConnector('POST',courseEndpoints.COURSE_DETAILS_API,{ courseId });
//             // console.log("COURSEID FROM FETCH COURSE......",courseId);
//             const response = await apiConnector('POST',courseEndpoints.COURSE_DETAILS_API,{ courseId });
//             console.log('RESPONSE FROM GET COURSE DETAILS API.....',response);
//             if(!response.data.success){
//                 throw new Error(response.data.message);
//             }
//             dispatch(setCourseDetails(response.data.data));
//             if (printSuccess) {
//                 setLoading(false);
//                 toast.dismiss(toastId);
//             }
//             if (printSuccess)
//                 toast.success("Successfully edited and saved the course");
//             // return true
//             // return response.data.data
//             return true
//         }catch(err){
//             console.log('ERROR FROM GET COURSE DETAILS API.....',err);
//             if (printSuccess) {

//                 setLoading(false);
//                 toast.dismiss(toastId);
//             }
//             if (printSuccess)
//                 toast.error("Failed to edit the course");
//             return false
//         }
//     }
// }
// export const fetchAllCourses = (setLoading = null,printSuccess = true) => {
//     return async (dispatch) => {
//         let toastId = ""
//         if (printSuccess) toastId = toast.loading("Loading...")
//         if (printSuccess) setLoading(true)
//         try{
//             const response = await apiConnector('GET',courseEndpoints.GET_ALL_COURSE_API);
//             console.log('RESPONSE FROM GET ALL COURSES API.......',response);
//             if(!response.data.success){
//                 throw new Error(response.data.message);
//             }
//             dispatch(setCourseDetails(response.data.data));
//             if (printSuccess) {
//                 setLoading(false);
//                 toast.dismiss(toastId);
//             }
//             if (printSuccess)
//                 toast.success("Successfully edited and saved the course");
//         }catch(err){
//             console.log('ERROR FROM FETCH ALL COURSES....',err);
//             if (printSuccess) {
//                 setLoading(false);
//                 toast.dismiss(toastId);
//             }
//             if (printSuccess)
//                 toast.error("Failed to edit the course.");
//         }
//     }
// }
// export const fetchInstructorCourses = async (setLoading = null,printSuccess = true) => {
//     let toastId = ""
//     if (printSuccess) toastId = toast.loading("Loading...")
//     if (printSuccess) setLoading(true)
//     try{
//         const response = await apiConnector('GET',courseEndpoints.GET_ALL_INSTRUCTOR_COURSES_API)
//         console.log("RESPONSE FROM GET ALL INSTRUCTOR COURSES......",response)
//         if(!response.data.success){
//             throw new Error(response.data.message)
//         }
//         if (printSuccess) {
//             setLoading(false)
//             toast.dismiss(toastId)
//         }
//         // if (printSuccess){
//         //     toast.success("Successfully fetched the courses")
//         // }
        
//         return response.data.data
//     }catch(err){
//         console.log("ERROR FROM GET ALL INSTRUCTOR COURSES......",err)
//         if (printSuccess) {
//             setLoading(false)
//             toast.dismiss(toastId)
//         }
//         if (printSuccess)
//             toast.error("Failed to fetch the courses.")
//         return null
//     }
// }
// export const deleteCourse = async ({dispatch,courseId},setLoading = null,printSuccess = true) => {
//     let toastId = ""
//     if (printSuccess) toastId = toast.loading("Loading...")
//     if (printSuccess) setLoading(true)
//     try{
//         // console.log("COURSE ID INSIDE DELETE COURSE.....",courseId)
//         const response = await apiConnector('DELETE',courseEndpoints.DELETE_COURSE_API,{courseId})
//         console.log("RESPONSE FROM DELETE COURSE API.....",response)
//         if(!response.data.success){
//             throw new Error(response.data.message)
//         }
//         dispatch(setCourseDetails(null))
//         if (printSuccess) {
//             setLoading(false)
//             toast.dismiss(toastId)
//         }
//         if (printSuccess)
//             toast.success("Successfully fetched the courses")
//         return true
//     }catch(err){
//         console.log("ERROR FROM DELETE COURSE API.....",err)
//         if (printSuccess) {
//             setLoading(false)
//             toast.dismiss(toastId)
//         }
//         if (printSuccess)
//             toast.error("Failed to fetch the courses.")
//         return false
//     }
// }
// export const fetchCategoryPageDetails = async ({categoryId},setLoading = null,printSuccess = true) => {
//     let toastId = ""
//     if (printSuccess) toastId = toast.loading("Loading...")
//     if (printSuccess) setLoading(true)
//     try{
//         // console.log("CATEGORYID.....",categoryId)
//         const response = await apiConnector('POST',catalogData.CATALOGPAGEDATA_API,{categoryId})
//         if(!response.data.success){
//             throw new Error(response.data.message)
//         }
//         if (printSuccess) {
//             setLoading(false)
//             toast.dismiss(toastId)
//         }
//         if (printSuccess)
//             toast.success("Successfully fetched the courses")
        
//         return response
//     }catch(err){
//         console.log("ERROR FROM FETCH CATEGORY PAGE DETAILS.....",err)
//         if (printSuccess) {
//             setLoading(false)
//             toast.dismiss(toastId)
//         }
//         if (printSuccess)
//             toast.error("Failed to fetch the courses.")
//         return null
//     }
// }


// export const fetchCourseProgress = async ({courseId},setLoading = null,printSuccess = true) => {
//     let toastId = ""
//     if (printSuccess) toastId = toast.loading("Loading...")
//     if (printSuccess) setLoading(true)
//     try{
//         const response = await apiConnector('POST',courseEndpoints.GET_COURSE_PROGRESS,{courseId})
//         console.log("RESPONSE FROM GET COURSE PROGRESS API.......",response)
//         if(!response.data.success){
//             throw new Error(response.data.message)
//         }
//         if (printSuccess) {
//             setLoading(false)
//             toast.dismiss(toastId)
//         }
//         if (printSuccess)
//             toast.success("Successfully fetched the course progress")
//         return response.data.data
//     }catch(err){
//         console.log("ERROR FROM GET COURSE PROGRESS API.....",err)
//         if (printSuccess) {
//             setLoading(false)
//             toast.dismiss(toastId)
//         }
//         if (printSuccess)
//             toast.error("Failed to fetch the course progress.")
//     }
//     return null
// }

// export const updateCourseProgress = async ({courseId,subSection},setLoading = null,printSuccess = true) => {
//     let toastId = ""
//     if (printSuccess) toastId = toast.loading("Loading...")
//     if (printSuccess) setLoading(true)
//     try{
//         const response = await apiConnector('POST',courseEndpoints.UPDATE_COURSE_PROGRESS_API,{courseId,subSection})
//         console.log("RESPONSE FROM UPDATE COURSE PROGRESS API.....",response)
//         if(!response.data.success){
//             throw new Error(response.data.message)
//         }
//         if (printSuccess) {
//             setLoading(false)
//             toast.dismiss(toastId)
//         }
//         if (printSuccess)
//             toast.success("Successfully updated the course progress")
//         return response.data.data
//     }catch(err){
//         console.log("ERROR FROM UPDATE COURSE PROGRESS....",err)
//         if (printSuccess) {
//             setLoading(false)
//             toast.dismiss(toastId)
//         }
//         if (printSuccess)
//             toast.error("Failed to update the course progress.")
//     }
//     return null
// }


// export const buildRating = async ({rating,review,courseId},setLoading = null,printSuccess = true) => {
//     let toastId = ""
//     if (printSuccess) toastId = toast.loading("Loading...")
//     if (printSuccess) setLoading(true)
//     try{
//         const response = await apiConnector('POST',courseEndpoints.CREATE_RATING_API,{rating,review,courseId})
//         console.log("RESPONSE FROM CREATE RATING API....",response)
//         if(!response.data.success){
//             throw new Error(response.data.message)
//         }
//         if (printSuccess) {
//             setLoading(false)
//             toast.dismiss(toastId)
//         }
//         if (printSuccess)
//             toast.success("Successfully rated the course!")
//         return response.data.ratingResponse

//     }catch(err){
//         console.log("ERROR FROM CREATE RATING API.....",err)
//         if (printSuccess) {
//             setLoading(false)
//             toast.dismiss(toastId)
//         }
//         if (printSuccess)
//             toast.error("Failed to rate the course.")
//     }
//     return null
// }




import { useDispatch, useSelector } from "react-redux"
import apiConnector from "../apiconnector"
import { catalogData, courseEndpoints } from "../apis"
import toast from "react-hot-toast"
import { setEditCourse,setStep,setCourseDetails } from "../../redux/slices/courseSlice"
// import { categoryPageDetails } from "../../../server/controllers/Category"
// import { useSelector } from "react-redux"
// CREATE_COURSE_API
export const setImageUrl = async (value,obj = null,setImage = null) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        if (obj) {
            // Ensure obj is extensible by creating a new object with existing properties and the new property
            obj = { ...obj, thumbnailImage: reader.result };
        }
       setImage(reader.result);
    }
    reader.readAsDataURL(value);
}
// export const formDatatoObject = async (formData) => {
//     const obj = {};
//     formData.forEach((value, key) => {
//         if(key !== 'thumbnailImage')
//         obj[key] = value;
       
//     });
//     await setImageUrl(formData.get('thumbnailImage'),obj);
//     return obj;
// }
export const buildCourse = async ({
    courseDescription,
    whatYouWillLearn,
    price,
    dispatch,
    tag,
    category,
    status,
    instructions,
    file,
    courseName
}, token,setLoading, printSuccess = true) => {
    // return async (dispatch) => {
        let toastId = ""
        if (printSuccess) toastId = toast.loading("Loading...")
        if (printSuccess) setLoading(true)
        try {
            const formData = new FormData();
            formData.append('thumbnailImage', file);
            formData.append('courseDescription', courseDescription);
            formData.append('whatYouWillLearn', whatYouWillLearn);
            formData.append('price', price);
            formData.append('tag', tag);
            formData.append('category', category);
            formData.append('status', status);
            formData.append('instructions', instructions);
            formData.append('courseName', courseName);
            const response = await apiConnector('POST', courseEndpoints.CREATE_COURSE_API, 
                formData, { 'Content-Type': 'multipart/form-data' ,Authorization: `Bearer ${token}`});
            console.log("RESPONSE FROM THE CREATE COURSE API.....", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            // formData.append('id',response.data.data._id);
            // const responseData = response.data.data;
            // const formObj = await formDatatoObject(formData);
            // console.log("OBJECT....",formObj);
            // dispatch(setCourseDetails(formObj));
            localStorage.setItem("courseDetails", JSON.stringify(response.data.data))
            dispatch(setCourseDetails(response.data.data))
            if (printSuccess) {
                setLoading(false);
                toast.dismiss(toastId);
            }
            if (printSuccess)
                toast.success("Successfully saved the course");
            // setEditCourse(true);
            // dispatch(setStep(2));
            return true
        } catch (err) {
            console.log("ERROR FROM CREATE COURSE API........", err);
            if (printSuccess) {
                setLoading(false);
                toast.dismiss(toastId);
            }
            if (printSuccess)
                toast.error("Failed to save the course.");
            return false
        }
        
    // }
}
export const updateCourse = async (
    {
        courseDescription,
        dispatch,
        whatYouWillLearn,
        price,
        tag,
        category,
        status,
        instructions,
        file,
        courseDetails,
        courseName
    }, token,setLoading,printSuccess = true
) => {
    // return async (dispatch) => {
        let toastId = ""
        if (printSuccess) toastId = toast.loading("Loading...")
        if (printSuccess) setLoading(true)
        try {
    // console.log("FORM DATA...",file)
    // console.log("FORM DATA...",courseDescription)
    // console.log("FORM DATA...",whatYouWillLearn)
    // console.log("FORM DATA...",price)
    // console.log("FORM DATA...",tag)
    // console.log("FORM DATA...",category)
    // console.log("FORM DATA...",status)
    // console.log("FORM DATA...",instructions)
    // console.log("FORM DATA...",courseName)
    // console.log("COURSEID INSIDE COURSEAPI.....",courseDetails._id)
    // console.log("STATUS INSIDE THE COURSE API.....",status)

            const formData = new FormData();
            formData.append('thumbnailImage', file);
            formData.append('courseDescription', courseDescription);
            formData.append('courseid', courseDetails._id);
            formData.append('whatYouWillLearn', whatYouWillLearn);
            formData.append('price', price);
            formData.append('tag', tag);
            formData.append('category', category);
            
            formData.append('status', status);
            formData.append('instructions', instructions);
            formData.append('courseName', courseName);
          
            const response = await apiConnector('PUT', 
                courseEndpoints.EDIT_COURSE_API, 
                formData,
                 { 'Content-Type': 'multipart/form-data',Authorization: `Bearer ${token}` });
            console.log("RESPONSE FROM THE EDIT COURSE API.....", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
      
            const responseData = response.data.data;
            // const formObj = await formDatatoObject(formData);
            // console.log("OBJECT....",formObj);
            // dispatch(setCourseDetails(formObj));
            await dispatch(fetchCourse(courseDetails._id,token,null,false))
            // setEditCourse(true);
            // dispatch(setStep(2));
            if (printSuccess) {
                setLoading(false);
                toast.dismiss(toastId);
            }
            if (printSuccess)
                toast.success("Successfully edited and saved the course");
            return true
        } catch (err) {
            console.log("ERROR FROM EDIT COURSE API........", err);
            if (printSuccess) {

                setLoading(false);
                toast.dismiss(toastId);
            }
            if (printSuccess)
                toast.error("Failed to edit the course.");
            return false
        }
       
    // }
}
// export const fetchCourse = (courseId,token,setLoading = null , printSuccess = true) => {
export const fetchCourse = (courseId,token,setLoading = null , printSuccess = false) => {
    
    return async (dispatch) => {
        let toastId = ""
        if (printSuccess) toastId = toast.loading("Loading...")
        if (printSuccess && setLoading) setLoading(true)
        try{   
            // const response = await apiConnector('POST',courseEndpoints.COURSE_DETAILS_API,{ courseId });
            // console.log("COURSEID FROM FETCH COURSE......",courseId);
            const response = await apiConnector('POST',courseEndpoints.COURSE_DETAILS_API,{ courseId,Authorization: `Bearer ${token}` });
            console.log('RESPONSE FROM GET COURSE DETAILS API.....',response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            dispatch(setCourseDetails(response.data.data));
            if (printSuccess == true) {
                setLoading(false);
                toast.dismiss(toastId);
            }
            if (printSuccess)
                toast.success("Successfully edited and saved the course");
            // return true
            // return response.data.data
            return true
        }catch(err){
            console.log('ERROR FROM GET COURSE DETAILS API.....',err);
            if (printSuccess) {

                setLoading(false);
                toast.dismiss(toastId);
            }
            if (printSuccess)
                toast.error("Failed to edit the course");
            return false
        }
    }
}
export const fetchAllCourses = (token,setLoading = null,printSuccess = true) => {
    return async (dispatch) => {
        let toastId = ""
        if (printSuccess) toastId = toast.loading("Loading...")
        if (printSuccess) setLoading(true)
        try{
            // const response = await apiConnector('GET',courseEndpoints.GET_ALL_COURSE_API);
            const response = await apiConnector('POST',courseEndpoints.GET_ALL_COURSE_API,{Authorization: `Bearer ${token}`});
            console.log('RESPONSE FROM GET ALL COURSES API.......',response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            dispatch(setCourseDetails(response.data.data));
            if (printSuccess) {
                setLoading(false);
                toast.dismiss(toastId);
            }
            if (printSuccess)
                toast.success("Successfully edited and saved the course");
        }catch(err){
            console.log('ERROR FROM FETCH ALL COURSES....',err);
            if (printSuccess) {
                setLoading(false);
                toast.dismiss(toastId);
            }
            if (printSuccess)
                toast.error("Failed to edit the course.");
        }
    }
}
export const fetchInstructorCourses = async (token,setLoading = null,printSuccess = true) => {
    let toastId = ""
    if (printSuccess) toastId = toast.loading("Loading...")
    if (printSuccess) setLoading(true)
    try{
        // const response = await apiConnector('GET',courseEndpoints.GET_ALL_INSTRUCTOR_COURSES_API)
        const response = await apiConnector('POST',courseEndpoints.GET_ALL_INSTRUCTOR_COURSES_API,{Authorization: `Bearer ${token}`})
        console.log("RESPONSE FROM GET ALL INSTRUCTOR COURSES......",response)
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        if (printSuccess) {
            setLoading(false)
            toast.dismiss(toastId)
        }
        // if (printSuccess){
        //     toast.success("Successfully fetched the courses")
        // }
        
        return response.data.data
    }catch(err){
        console.log("ERROR FROM GET ALL INSTRUCTOR COURSES......",err)
        if (printSuccess) {
            setLoading(false)
            toast.dismiss(toastId)
        }
        if (printSuccess)
            toast.error("Failed to fetch the courses.")
        return null
    }
}
export const deleteCourse = async ({dispatch,courseId},token,setLoading = null,printSuccess = true) => {
    let toastId = ""
    if (printSuccess) toastId = toast.loading("Loading...")
    if (printSuccess) setLoading(true)
    try{
        // console.log("COURSE ID INSIDE DELETE COURSE.....",courseId)
        const response = await apiConnector('DELETE',courseEndpoints.DELETE_COURSE_API,{courseId,Authorization: `Bearer ${token}`})
        console.log("RESPONSE FROM DELETE COURSE API.....",response)
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        dispatch(setCourseDetails(null))
        if (printSuccess) {
            setLoading(false)
            toast.dismiss(toastId)
        }
        if (printSuccess)
            toast.success("Successfully fetched the courses")
        return true
    }catch(err){
        console.log("ERROR FROM DELETE COURSE API.....",err)
        if (printSuccess) {
            setLoading(false)
            toast.dismiss(toastId)
        }
        if (printSuccess)
            toast.error("Failed to fetch the courses.")
        return false
    }
}
export const fetchCategoryPageDetails = async ({categoryId},token,setLoading = null,printSuccess = true) => {
    let toastId = ""
    if (printSuccess) toastId = toast.loading("Loading...")
    if (printSuccess) setLoading(true)
    try{
        // console.log("CATEGORYID.....",categoryId)
        const response = await apiConnector('POST',catalogData.CATALOGPAGEDATA_API,{categoryId,Authorization: `Bearer ${token}`})
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        if (printSuccess) {
            setLoading(false)
            toast.dismiss(toastId)
        }
        if (printSuccess)
            toast.success("Successfully fetched the courses")
        
        return response
    }catch(err){
        console.log("ERROR FROM FETCH CATEGORY PAGE DETAILS.....",err)
        if (printSuccess) {
            setLoading(false)
            toast.dismiss(toastId)
        }
        if (printSuccess)
            toast.error("Failed to fetch the courses.")
        return null
    }
}


// export const fetchCourseProgress = async ({courseId},token,setLoading = null,printSuccess = false) => {
//     let toastId = ""
//     if (printSuccess == true) toastId = toast.loading("Loading...")
//     if (printSuccess == true) setLoading(true)
//     try{
//         const response = await apiConnector('POST',courseEndpoints.GET_COURSE_PROGRESS,{courseId,Authorization: `Bearer ${token}`})
//         console.log("RESPONSE FROM GET COURSE PROGRESS API.......",response)
//         if(!response.data.success){
//             throw new Error(response.data.message)
//         }
//         if (printSuccess) {
//             setLoading(false)
//             toast.dismiss(toastId)
//         }
//         if (printSuccess)
//             toast.success("Successfully fetched the course progress")
//         return response.data.data
//     }catch(err){
//         console.log("ERROR FROM GET COURSE PROGRESS API.....",err)
//         if (printSuccess) {
//             setLoading(false)
//             toast.dismiss(toastId)
//         }
//         if (printSuccess)
//             toast.error("Failed to fetch the course progress.")
//     }
//     return null
// }

export const fetchCourseProgress = async ({courseId},token,setLoading = null,printSuccess = false) => {
    let toastId = ""
    if (printSuccess == true) toastId = toast.loading("Loading...")
    if (printSuccess == true) setLoading(true)
    try{
        const response = await apiConnector('POST',courseEndpoints.GET_COURSE_PROGRESS,{courseId,Authorization: `Bearer ${token}`})
        console.log("RESPONSE FROM GET COURSE PROGRESS API.......",response)
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        if (printSuccess) {
            setLoading(false)
            toast.dismiss(toastId)
        }
        if (printSuccess)
            toast.success("Successfully fetched the course progress")
        return response.data.data
    }catch(err){
        console.log("ERROR FROM GET COURSE PROGRESS API.....",err)
        if (printSuccess) {
            setLoading(false)
            toast.dismiss(toastId)
        }
        if (printSuccess)
            toast.error("Failed to fetch the course progress.")
    }
    return null
}

export const updateCourseProgress = async ({courseId,subSection},token,setLoading = null,printSuccess = true) => {
    let toastId = ""
    if (printSuccess) toastId = toast.loading("Loading...")
    if (printSuccess) setLoading(true)
    try{
        const response = await apiConnector('POST',courseEndpoints.UPDATE_COURSE_PROGRESS_API,{courseId,subSection,Authorization: `Bearer ${token}`})
        console.log("RESPONSE FROM UPDATE COURSE PROGRESS API.....",response)
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        if (printSuccess) {
            setLoading(false)
            toast.dismiss(toastId)
        }
        if (printSuccess)
            toast.success("Successfully updated the course progress")
        return response.data.data
    }catch(err){
        console.log("ERROR FROM UPDATE COURSE PROGRESS....",err)
        if (printSuccess) {
            setLoading(false)
            toast.dismiss(toastId)
        }
        if (printSuccess)
            toast.error("Failed to update the course progress.")
    }
    return null
}


export const buildRating = async ({rating,review,courseId},token,setLoading = null,printSuccess = true) => {
    let toastId = ""
    if (printSuccess) toastId = toast.loading("Loading...")
    if (printSuccess) setLoading(true)
    try{
        const response = await apiConnector('POST',courseEndpoints.CREATE_RATING_API,{rating,review,courseId,Authorization: `Bearer ${token}`})
        console.log("RESPONSE FROM CREATE RATING API....",response)
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        if (printSuccess) {
            setLoading(false)
            toast.dismiss(toastId)
        }
        if (printSuccess)
            toast.success("Successfully rated the course!")
        return response.data.ratingResponse

    }catch(err){
        console.log("ERROR FROM CREATE RATING API.....",err)
        if (printSuccess) {
            setLoading(false)
            toast.dismiss(toastId)
        }
        if (printSuccess)
            toast.error("Failed to rate the course.")
    }
    return null
}


