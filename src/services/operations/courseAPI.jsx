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
}, setLoading, printSuccess = true) => {
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
      
            const responseData = response.data.data;
            const formObj = await formDatatoObject(formData);
            console.log("OBJECT....",formObj);
            dispatch(setCourseDetails(formObj));
            if (printSuccess) {
                setLoading(false);
                toast.dismiss(toastId);
            }
            if (printSuccess)
                toast.success("Successfully saved the course");
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
    }, setLoading, printSuccess = true
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