import axios from 'axios';

let CancelToken = axios.CancelToken;
let itemCancelToken;

export async function getItems(filter, param = '') {
    itemCancelToken && itemCancelToken();

    if (filter === 'buylimit') {
        return (await axios.get(`/BuyLimitSearch/${param}`, {
            cancelToken: new CancelToken(function executor(c) {
                itemCancelToken = c;
            })
        })).data || [];
    } else if (filter === 'type') {
        return (await axios.get(`/SearchByTypes/${param}`, {
            cancelToken: new CancelToken(function executor(c) {
                itemCancelToken = c;
            })
        })).data || [];
    } else if (filter === 'rising') {
        const data = (await axios.get('/RisingItemSearch'));
        const dataData = data.data;
        return dataData || [];
    } else if (filter === 'falling') {
        return (await axios.get('/FallingItemSearch', {
            cancelToken: new CancelToken(function executor(c) {
                itemCancelToken = c;
            })
        })).data || [];
    } else if (filter === 'input') {
        return (await axios.get(`/SearchByKeyword/${param}`, {
            cancelToken: new CancelToken(function executor(c) {
                itemCancelToken = c;
            })
        })).data || [];
    } else {
        return (await axios.get('/RandomListing', {
            cancelToken: new CancelToken(function executor(c) {
                itemCancelToken = c;
            })
        })).data || [];
    }
    // switch (filter) {
    //     case 'buylimit':
    //         return (await axios.get(`/BuyLimitSearch/${param}`, {
    //             cancelToken: new CancelToken(function executor(c) {
    //                 itemCancelToken = c;
    //             })
    //         })).data || [];
    //     case 'type':
    //         return (await axios.get(`/SearchByTypes/${param}`, {
    //             cancelToken: new CancelToken(function executor(c) {
    //                 itemCancelToken = c;
    //             })
    //         })).data || [];
    //     case 'rising':
    //         return (await axios.get('/RisingItemSearch', {
    //             cancelToken: new CancelToken(function executor(c) {
    //                 itemCancelToken = c;
    //             })
    //         })).data || [];
    //     case 'falling':
    //         return (await axios.get('/FallingItemSearch', {
    //             cancelToken: new CancelToken(function executor(c) {
    //                 itemCancelToken = c;
    //             })
    //         })).data || [];
    //     case 'input':
    //         return (await axios.get(`/SearchByKeyword/${param}`, {
    //             cancelToken: new CancelToken(function executor(c) {
    //                 itemCancelToken = c;
    //             })
    //         })).data || [];
    //     default:
    //         return (await axios.get('/RandomListing', {
    //             cancelToken: new CancelToken(function executor(c) {
    //                 itemCancelToken = c;
    //             })
    //         })).data || [];
    // }
}

// Nav handlers

let buyLimitCancelToken;
let typeCancelToken;
let pageLimitCancelToken;

export async function getBuyLimits() {
    buyLimitCancelToken && buyLimitCancelToken();

    return (await axios.get('/BuyLimitListing', {
        cancelToken: new CancelToken(function executor(c) {
            buyLimitCancelToken = c;
        })
    })).data;
}

export async function getTypes() {
    typeCancelToken && typeCancelToken();

    return (await axios.get('/TypeListing', {
        cancelToken: new CancelToken(function executor(c) {
            typeCancelToken = c;
        })
    })).data;
}

export async function getPageLimit() {
    pageLimitCancelToken && pageLimitCancelToken();

    return (await axios.get('/DefaultPageLimit', {
        cancelToken: new CancelToken(function executor(c) {
            pageLimitCancelToken = c;
        })
    })).data;
}

// Update data

let updateCancelToken;

export async function doUpdate() {
    updateCancelToken && updateCancelToken();

    await axios.get('/Update', {
        cancelToken: new CancelToken(function executor(c) {
            updateCancelToken = c;
        })
    });
}