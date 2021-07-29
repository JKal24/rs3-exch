import axios from 'axios';

export async function getItems(filter, param = '', cancelToken) {
    switch (filter) {
        case 'buylimit':
            return (await axios.get(`/BuyLimitSearch/${param}`, {
                cancelToken
            })).data || [];
        case 'type':
            return (await axios.get(`/SearchByTypes/${param}`, {
                cancelToken
            })).data || [];
        case 'rising':
            return (await axios.get('/RisingItemSearch', {
                cancelToken
            })).data || [];
        case 'falling':
            return (await axios.get('/FallingItemSearch', {
                cancelToken
            })).data || [];
        case 'input':
            return (await axios.get(`/SearchByKeyword/${param}`, {
                cancelToken
            })).data || [];
        default:
            return (await axios.get('/RandomListing', {
                cancelToken
            })).data || [];
    }
}

// Nav handlers

export async function getBuyLimits() {
    return (await axios.get('/BuyLimitListing')).data;
}

export async function getTypes() {
    return (await axios.get('/TypeListing')).data;
}

export async function getPageLimit() {
    return (await axios.get('/DefaultPageLimit')).data;
}

// Update data

export async function doUpdate(cancelToken) {
    await axios.get('/Update', {
        cancelToken
    });
}