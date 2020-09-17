import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8000'
})

export async function getInfo(filter) {
    switch(filter) {
        case 'buylimit':
            return await api.get('/BuyLimitSearch')
        case 'type':
            return await api.get('/SearchByTypes');
        case 'invest':
            return await api.get('/InvestmentSearch');
        case 'stable':
            return await api.get('/StableItemSearch');
        case 'input':
            return await api.get('/SearchByKeyword')
    }
}