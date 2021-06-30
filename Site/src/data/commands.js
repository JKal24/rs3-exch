import { api } from './api';

export async function getItems(filter, param = '') {
    switch (filter) {
        case 'buylimit':
            return (await api.get(`/BuyLimitSearch/${param}`, )).data;
        case 'type':
            return (await api.get(`/SearchByTypes/${param}`)).data;
        case 'rising':
            const data = (await api.get('/RisingItemSearch')).data;
            return (await api.get('/RisingItemSearch')).data;
        case 'falling':
            return (await api.get('/FallingItemSearch')).data;
        case 'input':
            return (await api.get(`/SearchByKeyword/${param}`)).data;
        default:
            return (await api.get('/RandomListing')).data;
    }
}

// Nav handlers

export async function getBuyLimits() {
    return (await api.get('/BuyLimitListing')).data;
}

export async function getTypes() {
    return (await api.get('/TypeListing')).data;
}

export async function getPageLimit() {
    return (await api.get('/DefaultPageLimit')).data;
}

// Update data

export async function doUpdate() {
    api.get('/Update');
}