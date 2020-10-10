import api from './api';

// Commands functions for inputting and retrieving data from the database

export async function initInfo(filter, keyword) {
    switch (filter) {
        case 'buylimit':
            await api.get(`/BuyLimitInit/${keyword}`);
            return;
        case 'type':
            await api.get(`/InitByType/${keyword}`);
            return;
        case 'invest':
            await api.get('/InvestmentInit');
            return;
        case 'stable':
            await api.get('/StableItemInit');
            return;
        case 'input':
            await api.get(`/SearchText/${keyword.trim()}`);
            return;
        default:
            return;
    }
}

export async function getInfo(filter) {
    switch (filter) {
        case 'buylimit':
            return await api.get('/BuyLimitSearch');
        case 'type':
            return await api.get('/SearchByTypes');
        case 'invest':
            return await api.get('/InvestmentSearch');
        case 'stable':
            return await api.get('/StableItemSearch');
        case 'input':
            return await api.get('/SearchByKeyword');
        default:
            return await api.get('/FavoritesInit');
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