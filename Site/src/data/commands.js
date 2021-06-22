import { api } from './api';
import axios from 'axios'

import oboe from 'oboe';

// Commands functions for inputting and retrieving data from the database

let initCancelToken;
let getCancelToken;

export function retrieveInfo(filter = 'N/A', param = '') {
    switch (filter) {
        case 'buylimit':
            oboe(`/BuyLimitSearch/${param}`).node('!.[*]', function(x) {
                console.log('from path matching', x)
            }).done(_ => {
                console.log("Done stream");
            })
        case 'type':
            oboe(`/SearchByTypes/${param}`).node('!.[*]', function(x) {
                console.log('from path matching', x)
            }).done(_ => {
                console.log("Done stream");
            })
        case 'rising':
            oboe(`/RisingItemSearch`).node('!.[*]', function(x) {
                console.log('from path matching', x)
            }).done(_ => {
                console.log("Done stream");
            })
        case 'falling':
            return oboe(`http://localhost:8000/FallingItemSearch`).node('!.[*]', function(x) {
                if (x) {
                    console.log('item: ', x)
                }
                return oboe.drop();
            }).done(_ => {
                console.log("Done stream");
            })
        case 'input':
            oboe(`/SearchByKeyword/${param}`).node('!.[*]', function(x) {
                console.log('from path matching', x)
            }).done(_ => {
                console.log("Done stream");
            })
        default:
            oboe('http://localhost:8000/RandomListing').node('![*]', function(x) {
                if (x) {
                    console.log('item: ', x)
                }
                return oboe.drop();
            }).done(_ => {
                console.log("Done stream");
            })
        }
}

export async function getInfo(filter = 'N/A', param = '') {
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
            cancelToken: getCancelToken.token,
        });

        const streamData = async (uri) => {
            const data = await apiCancellable({
                url: uri,
                method: 'GET',
                onDownloadProgress: progressEvent_1 => {
                    const dataChunk = progressEvent_1.currentTarget.response;
                    // dataChunk contains the data that have been obtained so far (the whole data so far).. 
                    // So here we do whatever we want with this partial data.. 
                    // In my case I'm storing that on a redux store that is used to 
                    // render a table, so now, table rows are rendered as soon as 
                    // they are obtained from the endpoint.
                }
            });
            return await Promise.resolve(data); 
        }

        switch (filter) {
            case 'buylimit':
                return await streamData(`/BuyLimitSearch/${param}`);
            case 'type':
                return await streamData(`/SearchByTypes/${param}`);
            case 'rising':
                return await streamData('/RisingItemSearch');
            case 'falling':
                return await apiCancellable.get('/FallingItemSearch');
            case 'input':
                return await apiCancellable.get(`/SearchByKeyword/${param}`);
            default:
                return await streamData('/RandomListing');
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

// Update data

export async function doUpdate() {
    api.get('/Update');
}