import axios from "axios";
import { LocalStorage } from "../utils/localStorage.js";

// Create an Axios instance for API requests
const apiClient = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    timeout: 120000,
});


apiClient.interceptors.request.use(
    function (config) {
        // Retrieve user token from local storage
        const token = LocalStorage.get("token");
        // Set authorization header with bearer token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);


export const LoginApi = async (username, email, password) => {
    try {
        const res = await apiClient.post('/api/v1/users/Login', {
            username,
            email,
            password,
        });
        return res.data; // Axios responses contain parsed data in `res.data`
    } catch (error) {
        throw error;
    }
};


export {
    apiClient,

};
