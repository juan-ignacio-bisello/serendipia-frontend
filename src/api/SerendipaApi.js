import axios from 'axios';

const serendipiaApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Interceptor para agregar token sin romper headers
serendipiaApi.interceptors.request.use((config) => {

    const token = localStorage.getItem('token');

    if (token) {
        config.headers['x-token'] = token;
    }

    return config;
});

export default serendipiaApi;
