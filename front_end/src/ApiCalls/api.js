import axios from "axios";

// Helper functions for localStorage
const LocalStorage = {
    set: (key, value) => {
        try {
            if (value) {
                localStorage.setItem(key, JSON.stringify(value));
            }
        } catch (error) {
            console.error("Error saving to localStorage", error);
        }
    },
    get: (key) => {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error("Error retrieving from localStorage", error);
            return null;
        }
    },
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error("Error removing from localStorage", error);
        }
    },
};

// Create an Axios instance for API requests
const apiClient = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    timeout: 120000,
});

// Add an interceptor to set authorization header with user token before requests
apiClient.interceptors.request.use(
    (config) => {
        const token = LocalStorage.get("token"); // Retrieve token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Set Authorization header
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// API call for login
export const LoginApi = async (username, email, password) => {
    try {
        const res = await apiClient.post('/api/v1/users/Login', {
            username,
            email,
            password,
        });
        return res.data; // Return the parsed data from Axios response
    } catch (error) {
        throw error;
    }
};

export { apiClient, LocalStorage };
