import axios from 'axios';
import store from './store/store';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Function to get the token from the Redux store
const getToken = () => {
    return store.getState().auth.user.token;
};

// Interceptor to add Authorization header
axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
