import apiConnector from "../apiconnector"
import { studentEndpoints } from "../apis"
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import toast from "react-hot-toast"

export const buyCourse = async ({user,courses,navigate = null,navPath=null},token,setLoading = null,printSuccess = false) => {
    let toastId = ""
    if(printSuccess == true) toastId = toast.loading("Loading...")
    if(printSuccess == true) setLoading(true)
    try{
        const response = await apiConnector('POST',studentEndpoints.COURSE_PAYMENT_API,{courses,Authorization: `Bearer ${token}`})
        console.log("RESPONSE FROM PAYMENT API....",response)
        var options = {
            key: process.env.REACT_APP_KEY_OF_RAZOR, // Enter the Key ID generated from the Dashboard

            amount: response.data.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: response.data.data.currency,
            name: "StudyNotion",
            description: "Transaction for buying the course",
            image: rzpLogo,
            order_id: response.data.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: function (res){
                const verified = verifyPayment({...res,courses,order_id:response.data.data.id},token,null,true)
            },
            prefill: {
                "name": user.firstName + " " + user.lastName,
                "email": user.email,
                "contact": user.additionalDetails.contactNumber
            },
        };
      
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })
     
        if(printSuccess){
            setLoading(false);
            toast.dismiss(toastId);
          }
          return true
    }catch(err){
        console.log("ERROR FROM PAYMENT API....",err)
        if(printSuccess){
            setLoading(false);
            toast.dismiss(toastId);
            if("User already registered to a provided course" === err?.response?.data?.message){
                toast.error("User already registered")
            }
            else{
                console.log("error->",err)
            }
        }
        return false
    }
}

export const verifyPayment = async ({razorpay_order_id,
    razorpay_payment_id,razorpay_signature,
    courses,order_id,navigate = null,navPath=null
},token,setLoading = null,printSuccess = true) => {
    
    let toastId = ""
    if(printSuccess ) toastId = toast.loading("Verifying the payment...",{
        position: "bottom-center"

    })
        
    if(printSuccess && setLoading) setLoading(true)
    try{    
        const response = await apiConnector('POST',studentEndpoints.COURSE_VERIFY_API,
            {order_id,razorpay_order_id,razorpay_payment_id,razorpay_signature,courses,Authorization: `Bearer ${token}`}
        )
        console.log("RESPONSE FROM VERIFY PAYMENT....",response)
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        if(printSuccess)
            toast.success("Successfully verified the payment",{
                position: "bottom-center"
        })
        if(printSuccess){
            if(setLoading) setLoading(false);
            toast.dismiss(toastId);
          }
          if(navigate && navPath){
            navigate(navPath)
          }
          return true
    }catch(err){
        if(printSuccess){
            if(setLoading) setLoading(false);
            toast.dismiss(toastId);
          }
        return false
    }
}
