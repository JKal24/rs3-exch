import { api } from './api';

export async function getItems(filter, param = '') {
    let items;
    switch (filter) {
        case 'buylimit':
            items = (await api.get(`/BuyLimitSearch/${param}`, )).data;
            break;
        case 'type':
            items = (await api.get(`/SearchByTypes/${param}`)).data;
            break;
        case 'rising':
            items = (await api.get('/RisingItemSearch')).data;
            break;
        case 'falling':
            items = (await api.get('/FallingItemSearch')).data;
            break;
        case 'input':
            items = (await api.get(`/SearchByKeyword/${param}`)).data;
            break;
        default:
            items = (await api.get('/RandomListing')).data;

        return items || [];
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