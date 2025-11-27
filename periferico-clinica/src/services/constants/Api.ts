import axios from 'axios';

// Si esta en modo desarrollo, se utilizara localhost
const apiBaseUrl = import.meta.env.DEV
  ? 'http://localhost:8081'
  : (import.meta.env.VITE_API_BASE_URL || 'https://periferico-clinica-g6-2132940f4c98.herokuapp.com');

const apiString: string = `${apiBaseUrl}/api`;

/**
 * API Instance 
 * @description: API Instance for the backend API
 */
const API = axios.create({
    baseURL: apiString,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default API;

