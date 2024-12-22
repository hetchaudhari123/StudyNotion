// import apiConnector from "../apiconnector"
// import { studentEndpoints } from "../apis"
// import rzpLogo from "../../assets/Logo/rzp_logo.png"
// import toast from "react-hot-toast"

// // import mailSender from "../../../server/utils/mailSender"
// // import { courseEnrollmentEmail } from "../../../server/mail/templates/courseEnrollmentEmail"
// export const buyCourse = async ({user,courses,navigate = null,navPath=null},setLoading = null,printSuccess = true) => {

//     let toastId = ""
//     if(printSuccess) toastId = toast.loading("Loading...")
//     if(printSuccess) setLoading(true)
//     try{
//         const response = await apiConnector('POST',studentEndpoints.COURSE_PAYMENT_API,{courses})
//         console.log("RESPONSE FROM PAYMENT API....",response)
//         // console.log("TYPE OF x---->",typeof x)
//         var options = {
//             // key: process.env.REACT_APP_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard

//             key: "rzp_test_mjgfS4aI7n3uqt", // Enter the Key ID generated from the Dashboard
//             amount: response.data.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//             currency: response.data.data.currency,
//             name: "StudyNotion",
//             description: "Transaction for buying the course",
//             image: rzpLogo,
//             order_id: response.data.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//             handler: function (res){
//                 // verify payment
                
//                 const verified = verifyPayment({...res,courses,order_id:response.data.data.id},null,true)
//                 // send success mail
//                 // if(verified){

//                 //       if(navPath && navigate){
//                 //         navigate(navPath)
//                 //       }
//                 // }
                

//             },
//             prefill: {
//                 "name": user.firstName + " " + user.lastName,
//                 "email": user.email,
//                 "contact": user.additionalDetails.contactNumber
//             },
//             // "notes": {
//                 // "address": "Razorpay Corporate Office"
//             // },
//             // "theme": {
//                 // "color": "#3399cc"
//             // }
//         };
     
      


//         const paymentObject = new window.Razorpay(options);
//         paymentObject.open();
//         paymentObject.on("payment.failed", function(response) {
//             toast.error("oops, payment failed");
//             console.log(response.error);
//         })
     
//         if(printSuccess){
//             // toast.success("Payment Completed.Verifying....")
//             setLoading(false);
//             toast.dismiss(toastId);
//           }
//           return true
//     }catch(err){
//         console.log("ERROR FROM PAYMENT API....",err)
//         if(printSuccess){
//             setLoading(false);
//             toast.dismiss(toastId);
//             // console.log("errmessage.....",err.response.data.message)
//             // console.log("CHECK...",err.message === "User already registered to a provided course")
//             if("User already registered to a provided course" === err?.response?.data?.message){
//                 toast.error("User already registered")
//                 // console.log("hey")
//             }
//             else{
//                 console.log("error->",err)
//             }
//         }
//         return false
//     }
// }

// export const verifyPayment = async ({razorpay_order_id,
//     razorpay_payment_id,razorpay_signature,
//     courses,order_id,navigate = null,navPath=null
// },setLoading = null,printSuccess = true) => {
    
//     let toastId = ""
//     if(printSuccess ) toastId = toast.loading("Verifying the payment...",{
//         position: "bottom-center"

//     })
        
//     if(printSuccess && setLoading) setLoading(true)
//     try{    
//         const response = await apiConnector('POST',studentEndpoints.COURSE_VERIFY_API,
//             {order_id,razorpay_order_id,razorpay_payment_id,razorpay_signature,courses}
//         )
//         console.log("RESPONSE FROM VERIFY PAYMENT....",response)
//         if(!response.data.success){
//             throw new Error(response.data.message)
//         }
//         if(printSuccess)
//             toast.success("Successfully verified the payment",{
//                 position: "bottom-center"
//         })
//         if(printSuccess){
//             if(setLoading) setLoading(false);
//             toast.dismiss(toastId);
//           }
//           if(navigate && navPath){
//             navigate(navPath)
//           }
//           return true
//     }catch(err){
//         console.log("ERROR FROM VERFIY PAYMENT.....",err)
//         if(printSuccess){
//             if(setLoading) setLoading(false);
//             toast.dismiss(toastId);
//           }
//           if(printSuccess)
//           toast.error("Verification of the payment failed",{
//             position: "bottom-center"
//         });
//         return false
//     }
// }

// // export const sendSuccessEmail = async ({course,user}) => {
// //     try{
// //         const response = await mailSender(email,"Enrolled in the course",
// //             )
// //         if(!response){
// //             return res.status(400).json({
// //                 success:false,
// //                 message:"Error in sending the mail of successful course enrollment"
// //             })
// //         }


// //     }catch(err){
// //         console.log("ERROR OCCURRED WHILE SENDING THE MAIL OF SUCCESSFUL ENROLLMENT.....",err)
// //         return res.status(500).json({
// //             success:false,
// //             message:err.message
// //         })
// //     }
// // }




import apiConnector from "../apiconnector"
import { studentEndpoints } from "../apis"
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import toast from "react-hot-toast"

// import mailSender from "../../../server/utils/mailSender"
// import { courseEnrollmentEmail } from "../../../server/mail/templates/courseEnrollmentEmail"
export const buyCourse = async ({user,courses,navigate = null,navPath=null},token,setLoading = null,printSuccess = false) => {

    let toastId = ""
    if(printSuccess == true) toastId = toast.loading("Loading...")
    if(printSuccess == true) setLoading(true)
    try{
        const response = await apiConnector('POST',studentEndpoints.COURSE_PAYMENT_API,{courses,Authorization: `Bearer ${token}`})
        console.log("RESPONSE FROM PAYMENT API....",response)
        // console.log("TYPE OF x---->",typeof x)
        var options = {
            key: process.env.REACT_APP_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard

            // key: "rzp_test_mjgfS4aI7n3uqt", // Enter the Key ID generated from the Dashboard
            amount: response.data.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: response.data.data.currency,
            name: "StudyNotion",
            description: "Transaction for buying the course",
            image: rzpLogo,
            order_id: response.data.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: function (res){
                // verify payment
                
                const verified = verifyPayment({...res,courses,order_id:response.data.data.id},token,null,true)
                // send success mail
                // if(verified){

                //       if(navPath && navigate){
                //         navigate(navPath)
                //       }
                // }
                

            },
            prefill: {
                "name": user.firstName + " " + user.lastName,
                "email": user.email,
                "contact": user.additionalDetails.contactNumber
            },
            // "notes": {
                // "address": "Razorpay Corporate Office"
            // },
            // "theme": {
                // "color": "#3399cc"
            // }
        };
     
      


        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })
     
        if(printSuccess){
            // toast.success("Payment Completed.Verifying....")
            setLoading(false);
            toast.dismiss(toastId);
          }
          return true
    }catch(err){
        console.log("ERROR FROM PAYMENT API....",err)
        if(printSuccess){
            setLoading(false);
            toast.dismiss(toastId);
            // console.log("errmessage.....",err.response.data.message)
            // console.log("CHECK...",err.message === "User already registered to a provided course")
            if("User already registered to a provided course" === err?.response?.data?.message){
                toast.error("User already registered")
                // console.log("hey")
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
        console.log("ERROR FROM VERFIY PAYMENT.....",err)
        if(printSuccess){
            if(setLoading) setLoading(false);
            toast.dismiss(toastId);
          }
          if(printSuccess)
          toast.error("Verification of the payment failed",{
            position: "bottom-center"
        });
        return false
    }
}

// export const sendSuccessEmail = async ({course,user}) => {
//     try{
//         const response = await mailSender(email,"Enrolled in the course",
//             )
//         if(!response){
//             return res.status(400).json({
//                 success:false,
//                 message:"Error in sending the mail of successful course enrollment"
//             })
//         }


//     }catch(err){
//         console.log("ERROR OCCURRED WHILE SENDING THE MAIL OF SUCCESSFUL ENROLLMENT.....",err)
//         return res.status(500).json({
//             success:false,
//             message:err.message
//         })
//     }
// }