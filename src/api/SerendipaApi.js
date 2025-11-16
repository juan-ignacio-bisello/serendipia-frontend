import axios from 'axios';

const { VITE_API_URL } = import.meta.env;

// Evitar doble /api – La URL EN .env ya debe venir completa
const serendipiaApi = axios.create({
    baseURL: VITE_API_URL
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
