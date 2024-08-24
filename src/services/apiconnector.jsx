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
// export default apiConnector
import axios from "axios";
const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        // Add any other default headers here
    }
    
});
const apiConnector = (method,url,bodyData,headers,params) => {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers: null,
        params: params ? params : null,
    })
}
export default apiConnector