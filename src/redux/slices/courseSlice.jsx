import { createSlice } from "@reduxjs/toolkit";
import toast, { Toaster } from 'react-hot-toast';
const initialState = {
    courseStep:localStorage.getItem('step')?Number(localStorage.getItem("step")):(1),
    courseDetails:(localStorage.getItem('courseDetails'))?(JSON.parse(localStorage.getItem('courseDetails'))):null,
    editCourse:null
}
const notify = () => toast('Here is your toast.');
export const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers:{

        setStep:(state,action) => {
            state.courseStep = action.payload;
        },
        setCourseDetails:(state,action) => {
            state.courseDetails = action.payload;
        },
        setEditCourse:(state,action) => {
            state.editCourse = action.payload;
        },
        addSection:(state,action) => {
            state.courseDetails.courseContent = action.payload;
        },
        resetCourse:(state,action) => {
            state.courseStep = 1
            state.courseDetails = null
            state.editCourse = false
        }
    }
});

export const {resetCourse,setStep,setCourseDetails,setEditCourse,addSection} = courseSlice.actions;
export default courseSlice.reducer;