import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from '../../data/api';

export const createTypes = createAsyncThunk(
    "nav/retrieveTypes",
    async _ => {
        return (await api.get('/TypeListing')).data;
    }
)

export const createBuyLimits = createAsyncThunk(
    "nav/retrieveBuyLimits",
    async (_) => {
        const buylimits = await api.get('/BuyLimitListing');
        return buylimits.data;
    }
)