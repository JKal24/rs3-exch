import { api } from './api';
import axios from 'axios';

export async function getItems(filter, param = '') {
    let items;
    switch (filter) {
        case 'buylimit':
            items = (await axios.get(`/BuyLimitSearch/${param}`, )).data;
            break;
        case 'type':
            items = (await axios.get(`/SearchByTypes/${param}`)).data;
            break;
        case 'rising':
            items = (await axios.get('/RisingItemSearch')).data;
            break;
        case 'falling':
            items = (await axios.get('/FallingItemSearch')).data;
            break;
        case 'input':
            items = (await axios.get(`/SearchByKeyword/${param}`)).data;
            break;
        default:
            items = (await axios.get('/RandomListing')).data;

        return items || [];
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
    axios.get('/Update');
}