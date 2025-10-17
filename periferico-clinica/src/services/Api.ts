import axios from 'axios';


const apiString: string = 'http://localhost:3000/api'; // luego sera la url del backend

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

