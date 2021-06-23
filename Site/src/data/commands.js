import { api } from './api';
import oboe from 'oboe';
import { useSelector, useDispatch } from 'react-redux';

export function retrieveInfo(filter = 'N/A', param = '') {
    const requestData = useSelector(state => state.items.requestData);
    const cancelRequest = useSelector(state => state.items.cancelRequest);
    let parseString = 'http://localhost:8000/';

    switch (filter) {
        case 'buylimit':
            parseString = parseString.concat(`BuyLimitSearch/${param}`);
            break;
        case 'type':
            parseString = parseString.concat(`SearchByTypes/${param}`);
            break;
        case 'rising':
            parseString = parseString.concat('RisingItemSearch');
            break;
        case 'falling':
            parseString = parseString.concat('FallingItemSearch');
            break;
        case 'input':
            parseString = parseString.concat(`SearchByKeyword/${param}`);
            break;
        default:
            parseString = parseString.concat('RandomListing');
    }

    const dataStream = [];

    return oboe(parseString).node('!.[*]', function (x) {
        if (x) {
            dataStream.push(x);
        }
        
        
        if (cancelToken) this.abort();

    }).done(_ => {
        console.log("Done stream");
    });
}

let cancelToken = false;
let requestPageData = false;

export function dropRequest() {
    this.cancelToken = true;
}

export function sendPageData() {
    this.requestPageData = true;
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