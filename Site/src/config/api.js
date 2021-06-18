import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8000'
})

export const graph_api = axios.create({
    baseURL: 'http://localhost:5000'
});
