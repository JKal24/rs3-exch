import axios from 'axios';

const serverURI = process.env.SERVER_URI || 'http://localhost:5000';

export const api = axios.create({
    baseURL: serverURI
})