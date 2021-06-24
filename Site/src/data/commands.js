import { api } from './api';
import oboe from 'oboe';
import axios from 'axios'

let cancelToken;

export async function getItems(filter, param = '') {
    // Cancels existing token
    if (typeof cancelToken != typeof undefined) {
        cancelToken.cancel('Request cancelled');
    }
    
    // New token
    cancelToken = axios.CancelToken.source();

    // Creates the api for axios requests with the cancel token
    const apiCancellable = axios.create({
        baseURL: 'http://localhost:8000',
        cancelToken: cancelToken.token
    });

    switch (filter) {
        case 'buylimit': 
            return (await apiCancellable.get(`BuyLimitSearch/${param}`)).data;
        case 'type':
            return (await apiCancellable.get(`SearchByTypes/${param}`)).data;
        case 'rising':
            return (await apiCancellable.get('RisingItemSearch')).data;
        case 'falling':
            return (await apiCancellable.get('FallingItemSearch')).data;
        case 'input':
            return (await apiCancellable.get(`SearchByKeyword/${param}`)).data;
        default:
            const data = (await apiCancellable.get(`RandomListing`)).data;
            return data;
    }
}

export function manualCancelToken() {
    if (typeof getCancelToken != typeof undefined) {
        cancelToken.cancel('Request cancelled');
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

export function retrieveInfo(filter = 'N/A', param = '') {
    let parseString = 'http://localhost:8000/';

    switch (filter) {
        case 'buylimit':
            parseString = parseString.concat(`BuyLimitSearch/${param}`);
            break;
        case 'type':
            parseString = parseString.concat(`SearchByTypes/${param}`);
            break;
        case 'rising':
            parseString = parseString.concat('RisingItemSearch');
            break;
        case 'falling':
            parseString = parseString.concat('FallingItemSearch');
            break;
        case 'input':
            parseString = parseString.concat(`SearchByKeyword/${param}`);
            break;
        default:
            parseString = parseString.concat('RandomListing');
    }

    return parseString;
}