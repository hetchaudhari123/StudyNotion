import { useSelector } from "react-redux"
import apiConnector from "../apiconnector"
import { courseEndpoints } from "../apis"
import toast from "react-hot-toast"
import { setCourseDetails } from "../../redux/slices/courseSlice"
// CREATE_COURSE_API
export const setImageUrl = async (value,obj = null,setImage = null) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        if (obj) {
            // Ensure obj is extensible by creating a new object with existing properties and the new property
            obj = { ...obj, thumbnailImage: reader.result };
        }
       if(setImage) setImage(reader.result);
    }
    reader.readAsDataURL(value);
}
export const formDatatoObject = async (formData) => {
    const obj = {};
    formData.forEach((value, key) => {
        if(key !== 'thumbnailImage')
        obj[key] = value;
       
    });
    await setImageUrl(formData.get('thumbnailImage'),obj);
    return obj;
}
export const buildCourse = ({
    courseDescription,
    whatYouWillLearn,
    price,
    tag,
    category,
    status,
    instructions,
    file,
    courseName
}, setLoading,setEditCourse,setStep, printSuccess = true) => {
    return async (dispatch) => {
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
          
            const response = await apiConnector('POST', courseEndpoints.CREATE_COURSE_API, formData, { 'Content-Type': 'multipart/form-data' });
            console.log("RESPONSE FROM THE CREATE COURSE API.....", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            // formData.append('id',response.data.data._id);
            // const responseData = response.data.data;
            // const formObj = await formDatatoObject(formData);
            // console.log("OBJECT....",formObj);
            // dispatch(setCourseDetails(formObj));
            dispatch(setCourseDetails(response.data.data));

            if (printSuccess) {
                setLoading(false);
                toast.dismiss(toastId);
            }
            if (printSuccess)
                toast.success("Successfully saved the course");
            setEditCourse(true);
            dispatch(setStep(2));
        } catch (err) {
            console.log("ERROR FROM CREATE COURSE API........", err);
            if (printSuccess) {
                setLoading(false);
                toast.dismiss(toastId);
            }
            if (printSuccess)
                toast.error("Failed to save the course.");
        }
        
    }
}
export const updateCourse = (
    {
        courseDescription,
        whatYouWillLearn,
        price,
        tag,
        category,
        status,
        instructions,
        file,
        courseName
    }, setLoading, setEditCourse,setStep,printSuccess = true
) => {
    return async (dispatch) => {
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
          
            const response = await apiConnector('POST', courseEndpoints.EDIT_COURSE_API, formData, { 'Content-Type': 'multipart/form-data' });
            console.log("RESPONSE FROM THE EDIT COURSE API.....", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
      
            const responseData = response.data.data;
            const formObj = await formDatatoObject(formData);
            console.log("OBJECT....",formObj);
            dispatch(setCourseDetails(formObj));
            setEditCourse(true);
            dispatch(setStep(2));
            if (printSuccess) {
                setLoading(false);
                toast.dismiss(toastId);
            }
            if (printSuccess)
                toast.success("Successfully edited and saved the course");
        } catch (err) {
            console.log("ERROR FROM EDIT COURSE API........", err);
            if (printSuccess) {

                setLoading(false);
                toast.dismiss(toastId);
            }
            if (printSuccess)
                toast.error("Failed to edit the course.");
        }
       
    }
}
export const fetchCourse = (courseId,setLoading = null , printSuccess = true) => {
    
    return async (dispatch) => {
        let toastId = ""
        if (printSuccess) toastId = toast.loading("Loading...")
        if (printSuccess) setLoading(true)
        try{   
            // const response = await apiConnector('POST',courseEndpoints.COURSE_DETAILS_API,{ courseId });
            console.log("COURSEID FROM FETCH COURSE......",courseId);
            const response = await apiConnector('POST',courseEndpoints.COURSE_DETAILS_API,{ courseId });
            console.log('RESPONSE FROM GET COURSE DETAILS API.....',response);
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
            console.log('ERROR FROM GET COURSE DETAILS API.....',err);
            if (printSuccess) {

                setLoading(false);
                toast.dismiss(toastId);
            }
            if (printSuccess)
                toast.error("Failed to edit the course.");
        }
    }
}
export const fetchAllCourses = (setLoading = null,printSuccess = true) => {
    return async (dispatch) => {
        let toastId = ""
        if (printSuccess) toastId = toast.loading("Loading...")
        if (printSuccess) setLoading(true)
        try{
            const response = await apiConnector('GET',courseEndpoints.GET_ALL_COURSE_API);
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