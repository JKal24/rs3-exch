import { api, graph_api } from './api';
import axios from 'axios'

// Commands functions for inputting and retrieving data from the database

let initCancelToken;
let getCancelToken;

export async function initInfo(filter, keyword) {
    try {
        // Cancels existing token
        if (typeof initCancelToken != typeof undefined) {
            initCancelToken.cancel('Request cancelled');
        }

        // New token
        initCancelToken = axios.CancelToken.source();

        // Creates the api for axios requests with the cancel token
        const apiCancellable = axios.create({
            baseURL: 'http://localhost:8000',
            cancelToken: initCancelToken.token
        });

        switch (filter) {
            case 'buylimit':
                return await apiCancellable.get(`/BuyLimitInit/${keyword}`);
            case 'type':
                return await apiCancellable.get(`/InitByType/${keyword}`);
            case 'invest':
                return await apiCancellable.get('/InvestmentInit');
            case 'stable':
                return await apiCancellable.get('/StableItemInit');
            case 'input':
                return await apiCancellable.get(`/SearchText/${keyword.trim()}`);
            default:
                return;
        }
    } catch (error) {
        throw Error(`Request denied ${error}`)
    }
}

export async function getInfo(filter = 'N/A') {
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
                return await apiCancellable.get('/BuyLimitSearch');
            case 'type':
                return await apiCancellable.get('/SearchByTypes');
            case 'invest':
                return await apiCancellable.get('/InvestmentSearch');
            case 'stable':
                return await apiCancellable.get('/StableItemSearch');
            case 'input':
                return await apiCancellable.get('/SearchByKeyword');
            default:
                return await apiCancellable.get('/FavoritesInit');
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

// Favorite handlers

export async function addFavorite(item) {
    return await api.post('/FavoritesInsert', item);
}

export async function removeFavorite(item_name) {
    return await api.post('/FavoritesDelete', { item_name });
}

// Graph handler

export async function getGraph(item_id, item_name) {
    return await graph_api.get(`/${item_id}/${item_name}`);
}
