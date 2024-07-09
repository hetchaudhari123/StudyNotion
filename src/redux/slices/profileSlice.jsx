import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
const initialState = {
    user : localStorage.getItem('token') ? (jwtDecode(localStorage.getItem('token'))) : (null)
}
const profileSlice = createSlice({
    name:"profile",
    initialState,
    reducers:{
        setUser : (state,action) =>{
            state.user = action.payload
        }
    }
});
export const {setUser} = profileSlice.actions;
export default profileSlice.reducer