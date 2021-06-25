import { api } from './api';
import axios from 'axios'

const cancelToken = axios.CancelToken;
const source = cancelToken.source();

export async function getItems(filter, param) {
    // Cancels existing token
    clearCancelToken();

    // Creates the api for axios requests with the cancel token
    const apiCancellable = axios.create({
        baseURL: 'http://localhost:8000',
        cancelToken: source.token
    });

    switch (filter) {
        case 'buylimit':
            return (await apiCancellable.get(`/BuyLimitSearch/${param}`)).data;
        case 'type':
            return (await apiCancellable.get(`/SearchByTypes/${param}`)).data;
        case 'rising':
            return (await apiCancellable.get('/RisingItemSearch')).data;
        case 'falling':
            return (await apiCancellable.get('/FallingItemSearch')).data;
        case 'input':
            return (await apiCancellable.get(`/SearchByKeyword/${param}`)).data;
        default:
            try {
                const data = await apiCancellable.get('/RandomListing');
                return (await apiCancellable.get(`/RandomListing`)).data;
            } catch (err) {
                console.log(err.message);
            }
            
    }
}

// In the event that a request needs to be cancelled
// Normally a request is cancelled if the page is refreshed

export function clearCancelToken() {
    if (source != undefined) {
        source.cancel('Request cancelled');
    } else {
        // New token
        source = cancelToken.source();
    }
}

// Nav handlers

export async function getBuyLimits() {
    const data = (await api.get('/BuyLimitListing')).data;
    return data;
}

export async function getTypes() {
    return (await api.get('/TypeListing')).data;
}

// Update data

export async function doUpdate() {
    api.get('/Update');
}