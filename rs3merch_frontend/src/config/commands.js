import api from './api';
import axios from 'axios'

// Commands functions for inputting and retrieving data from the database

let source;

export async function initInfo(filter, keyword) {
    try {
        if (source) { source.cancel() };

        // Creates cancel token
        source = axios.CancelToken.source()

        // Creates the api for axios requests with the cancel token
        const apiCancellable = axios.create({
            baseURL: 'http://localhost:8000',
            cancelToken: source.token
        });

        switch (filter) {
            case 'buylimit':
                await apiCancellable.get(`/BuyLimitInit/${keyword}`);
                return;
            case 'type':
                await apiCancellable.get(`/InitByType/${keyword}`);
                return;
            case 'invest':
                await apiCancellable.get('/InvestmentInit');
                return;
            case 'stable':
                await apiCancellable.get('/StableItemInit');
                return;
            case 'input':
                await apiCancellable.get(`/SearchText/${keyword.trim()}`);
                return;
            default:
                return;
        }
    } catch (error) {
        if (axios.isCancel(error)) {
            // Handle if request was cancelled
            console.log('Request cancelled', error.message);
        } else {
            // Handle usual errors
            console.log('Something went wrong: ', error.message)
        }
    }
}

export async function getInfo(filter) {
    try {
        if (source) { source.cancel() };
        source = axios.CancelToken.source()

        const apiCancellable = axios.create({
            baseURL: 'http://localhost:8000',
            cancelToken: source.token
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
        if (axios.isCancel(error)) {
            // Handle if request was cancelled
            console.log('Request cancelled', error.message);
        } else {
            // Handle usual errors
            console.log('Something went wrong: ', error.message)
        }
    }
}

export async function getFavorites() {
    return await api.get('/FavoritesInit');
}

export async function addFavorite(item) {
    return await api.post('/FavoritesInsert', item);
}

export async function removeFavorite(item_name) {
    return await api.post('/FavoritesDelete', { item_name });
}
