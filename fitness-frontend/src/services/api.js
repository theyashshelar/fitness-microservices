import axios from "axios"

const API_URL = 'http://localhost:8080/api'

const api = axios.create({
    baseURL: API_URL
});

api.interceptors.request.use((config) => {
    // Note: Ensure your App is actually saving these to localStorage, 
    // or pull them from your Redux store/AuthContext instead.
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (userId) {
        config.headers['X-User-ID'] = userId;
    }

    return config;
});

export const getActivities = () => api.get('/activities');
export const addActivity = (activity) => api.post('/activities', activity);
export const getActivityDetail = (id) => api.get(`/recommendations/activity/${id}`);

// FIXED: Now uses the 'api' instance to include your security headers
export const deleteActivity = (id) => api.delete(`/activities/${id}`);
