// import axios from "axios";
// const axiosInstance = axios.create({
//     withCredentials: true,
    
// });
// const apiConnector = (method,url,bodyData,headers,params) => {
//     return axiosInstance({
//         method:`${method}`,
//         url:`${url}`,
//         data: bodyData ? bodyData : null,
//         headers: headers ? headers: null,
//         params: params ? params : null,
//     })
// }
import axios from "axios";

// Create an Axios instance with default settings
const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        // Add any other default headers here
    }
});

// API connector function to handle requests
const apiConnector = async (method, url, bodyData, headers, params) => {
    // Define default headers
    const defaultHeaders = {
        'Content-Type': 'application/json',
        ...headers // Merge any provided headers with default headers
    };

    try {
        const response = await axiosInstance({
            method: method,
            url: url,
            data: bodyData || null,
            headers: defaultHeaders, // Use merged headers
            params: params || null,
        });
        return response.data; // Return only the data part of the response
    } catch (error) {
        // Enhanced error logging
        console.error("API Error:", error.message);
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
        } else if (error.request) {
            console.error("Request data:", error.request);
        }
        throw error; // Re-throw the error to be handled by the caller
    }
};

export default apiConnector;


