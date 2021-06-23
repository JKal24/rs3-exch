import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTypes, getBuyLimits } from '../../data/commands';

export const createTypes = createAsyncThunk(
    "nav/retrieveTypes",
    async (type) => {
        return await getTypes();
    }
)

export const createBuyLimits = createAsyncThunk(
    "nav/retrieveBuyLimits",
    async (buylimit) => {
        return await getBuyLimits();
    }
)

