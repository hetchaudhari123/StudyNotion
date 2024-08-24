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




/*
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



*/



import axios from 'axios';

// Define the function to fetch categories
const fetchCategories = async () => {
    try {
        // Make the API request
        const response = await axios({
            method: 'GET',
            url: 'https://studynotion2-iket.onrender.com/api/v1/course/get-all-categories',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Log the response data
        console.log('Categories:', response.data);
    } catch (error) {
        // Handle errors and log detailed information
        console.error("Direct Axios Error:", error.message);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("Request data:", error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error message:", error.message);
        }
    }
};

// Call the function to fetch categories
fetchCategories();
