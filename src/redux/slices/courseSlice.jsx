import { createSlice } from "@reduxjs/toolkit";
import toast, { Toaster } from 'react-hot-toast';
const initialState = {
    courseStep:1,
    courseDetails:null
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
        }
        
    }
});
export const {setStep,setCourseDetails} = courseSlice.actions;
export default courseSlice.reducer;