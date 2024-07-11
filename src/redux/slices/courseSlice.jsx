import { createSlice } from "@reduxjs/toolkit";
import toast, { Toaster } from 'react-hot-toast';
const initialState = {
    // total: localStorage.getItem('total') ? JSON.parse(localStorage.getItem('total')) : (null),
    // totalItems: localStorage.getItem('totalItems') ? JSON.parse(localStorage.getItem('totalItems')) : null,
    // cart: localStorage.getItem('cart') ? JSON.parse(localStorage.cart) : []
    courseStep:1

}
const notify = () => toast('Here is your toast.');
export const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers:{

        setStep:(state,action) => {
            state.courseStep = action.payload;
        }
        // removeCart : (state,action) => {
        //     const courseId = action.payload;
        //     const index = state.cart.findIndex((ele) => ele._id === courseId);
        //     if(index == -1){
        //         toast.error("The course is not present inside the cart");
        //         return;
        //     }
        //     state.total -= state.cart[index].price;
        //     state.cart.splice(index,1);
        //     state.totalItems--;
        //     localStorage.setItem('total',JSON.stringify(state.total));
        //     localStorage.setItem('totalItems',JSON.stringify(state.totalItems));
        //     localStorage.setItem('cart',JSON.stringify(state.cart));
        //     // toast.success("Course removed from the cart")
        // },
        // resetCart: (state,action) => {
        //     state.cart = [];
        //     state.total = 0;
        //     state.totalItems = 0;
        //     localStorage.removeItem("cart")
        //     localStorage.removeItem("total")
        //     localStorage.removeItem("totalItems")
        //     // toast.success("Successfully reset the cart.");
        // }
    }
});
export const {setStep} = courseSlice.actions;
export default courseSlice.reducer;