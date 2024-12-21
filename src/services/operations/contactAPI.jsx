// import toast from "react-hot-toast"
// import { contactusEndpoint } from "../apis"
// import apiConnector from "../apiconnector"
// export const contactUs = async ({firstName,lastName,message,phoneNo,email,countrycode},setLoading = null,printSuccess = true) => {
//     let toastId = ""
//     if (printSuccess) toastId = toast.loading("Loading...")
//     if (printSuccess) setLoading(true)
//     try {
      
//         const response = await apiConnector('POST', contactusEndpoint.CONTACT_US_API, 
//             {firstName,lastName,message,phoneNo,email,countrycode} );
//         console.log("RESPONSE FROM CONTACT US API.....", response);
//         if (!response.data.success) {
//             throw new Error(response.data.message);
//         }
        
//         if (printSuccess) {
//             setLoading(false);
//             toast.dismiss(toastId);
//         }
//         if (printSuccess)
//             toast.success("Successfully sent the email");
//         return true
//     } catch (err) {
//         console.log("ERROR FROM CONTACT US API........", err);
//         if (printSuccess) {
//             setLoading(false);
//             toast.dismiss(toastId);
//         }
//         if (printSuccess)
//             toast.error("Failed to send the email.");
//         return false
//     }
// }




import toast from "react-hot-toast"
import { contactusEndpoint } from "../apis"
import apiConnector from "../apiconnector"
export const contactUs = async ({firstName,lastName,message,phoneNo,email,countrycode},setLoading = null,printSuccess = true) => {
    let toastId = ""
    if (printSuccess) toastId = toast.loading("Loading...")
    if (printSuccess) setLoading(true)
    try {
      
        const response = await apiConnector('POST', contactusEndpoint.CONTACT_US_API, 
            {firstName,lastName,message,phoneNo,email,countrycode} );
        console.log("RESPONSE FROM CONTACT US API.....", response);
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        
        if (printSuccess) {
            setLoading(false);
            toast.dismiss(toastId);
        }
        if (printSuccess)
            toast.success("Successfully sent the email");
        return true
    } catch (err) {
        console.log("ERROR FROM CONTACT US API........", err);
        if (printSuccess) {
            setLoading(false);
            toast.dismiss(toastId);
        }
        if (printSuccess)
            toast.error("Failed to send the email.");
        return false
    }
}