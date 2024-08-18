import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    signupData:null,
    loading:false,
    token:localStorage.getItem('token')?(JSON.parse(localStorage.getItem("token"))):(null)
}
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setSignupData : (state,action) => {state.signupData = action.payload},
        setToken:(state,action) => {  state.token = action.payload;},
        setLoading:(state,action) => { state.loading = action.payload;}
    }
})
export const {setToken,setSignupData,setLoading} = authSlice.actions;
export default authSlice.reducer
