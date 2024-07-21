import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"
import profileReducer from '../slices/profileSlice'
import cartReducer from '../slices/cartSlice'
import courseReducer from "../slices/courseSlice"
import courseProgressReducer from "../slices/courseProgressSlice"
const rootReducer = combineReducers({
    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer,
    courseProgress:courseProgressReducer,
})
export default rootReducer;