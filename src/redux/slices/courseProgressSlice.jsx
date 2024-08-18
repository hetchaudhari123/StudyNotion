import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    completedVideos : [],
    // totalVideos : 0
}
export const courseProgressSlice = createSlice({
    name: "courseProgress",
    initialState,
    reducers:{

        setCompletedVideos:(state,action) => {
            state.completedVideos = action.payload;
        },
        addCompletedVideos:(state,action) => {
            state.completedVideos.push(action.payload);
        },
        resetCompletedVideos:(state,action) => {
            state.completedVideos = []
            // state.totalVideos = 0
        }
    }
});

export const {setCompletedVideos,addCompletedVideos,resetCompletedVideos} = courseProgressSlice.actions;
export default courseProgressSlice.reducer;