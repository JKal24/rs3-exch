import axios from 'axios';

export async function getItems(filter, param = '') {
    // Shuffle only the non-input and random arrays
    switch (filter) {
        case 'buylimit':
            return shuffle((await axios.get(`/BuyLimitSearch/${param}`)).data || []);

        case 'type':
            return shuffle((await axios.get(`/SearchByTypes/${param}`)).data || []);

        case 'rising':
            return shuffle((await axios.get('/RisingItemSearch')).data || []);

        case 'falling':
            return shuffle((await axios.get('/FallingItemSearch')).data || []);

        case 'input-filter':
            const { keywords, filterPrice, filterTypes, filterMaxBuyLimit, filterMinBuyLimit } = param;
            
            const fullBuylimits = [filterMinBuyLimit, filterMaxBuyLimit];

            return (await axios.get(`/SearchByFilter/${keywords}/${filterPrice}/${filterTypes}/${fullBuylimits}`));

        case 'input':
            return (await axios.get(`/SearchByKeyword/${param}`)).data || [];

        default:
            return (await axios.get('/RandomListing')).data || [];
    }
}

// Shuffle items

function shuffle(array) {
    var currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
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