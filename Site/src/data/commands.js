import { api } from './api';
import axios from 'axios'

// Commands functions for inputting and retrieving data from the database

let initCancelToken;
let getCancelToken;

export async function getInfo(filter = 'N/A', param) {
    try {
        // Cancels existing token
        if (typeof getCancelToken != typeof undefined) {
            getCancelToken.cancel('Request cancelled');
        }
        
        // New token
        getCancelToken = axios.CancelToken.source();

        // Creates the api for axios requests with the cancel token
        const apiCancellable = axios.create({
            baseURL: 'http://localhost:8000',
            cancelToken: getCancelToken.token
        });

        switch (filter) {
            case 'buylimit':
                return await apiCancellable.get(`/BuyLimitSearch/${param}`);
            case 'type':
                return await apiCancellable.get(`/SearchByTypes/${param}`);
            case 'rising':
                return await apiCancellable.get('/RisingItemSearch');
            case 'falling':
                return await apiCancellable.get('/FallingItemSearch');
            case 'input':
                return await apiCancellable.get(`/SearchByKeyword/${param}`);
            default:
                return apiCancellable.get('/RandomListing');
        }
    } catch (error) {
        throw Error(`Request denied ${error}`)
    }
}

export function manual_cancelToken() {
    if (typeof initCancelToken != typeof undefined) {
        initCancelToken.cancel('Request cancelled');
    }

    if (typeof getCancelToken != typeof undefined) {
        getCancelToken.cancel('Request cancelled');
    }
}

// Nav handlers

export async function getBuyLimits() {
    return (await api.get('/BuyLimitListing')).data;
}

export async function getTypes() {
    return (await api.get('/TypeListing')).data;
}

// Update data

export async function doUpdate() {
    api.get('/Update');
}