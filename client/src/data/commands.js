import axios from 'axios';

export async function getItems(filter, param = '') {
    switch (filter) {
        case 'buylimit':
            return (await axios.get(`/BuyLimitSearch/${param}`)).data || [];
        case 'type':
            return (await axios.get(`/SearchByTypes/${param}`)).data || [];
        case 'rising':
            return (await axios.get('/RisingItemSearch')).data || [];
        case 'falling':
            return (await axios.get('/FallingItemSearch')).data || [];
        case 'input':
            return (await axios.get(`/SearchByKeyword/${param}`)).data || [];
        default:
            return (await axios.get('/RandomListing')).data || [];
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

export async function doUpdate() {
    await axios.get('/Update');
}