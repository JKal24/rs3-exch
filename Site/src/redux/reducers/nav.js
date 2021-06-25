import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTypes, getBuyLimits } from '../../data/commands';

export const createTypes = createAsyncThunk(
    "nav/type",
    async () => {
        return await getTypes();
    }
)

export const createBuyLimits = createAsyncThunk(
    "nav/buylimit",
    async () => {
        return await getBuyLimits();
    }
)

const navSlice = createSlice({
    name: "nav",
    initialState: {
        openTypes: false,
        openBuyLimits: false,
        buylimits: {},
        types: {},
        loadedBuyLimits: false,
        loadedTypes: false
    },
    reducers: {
        toggleOpenBuylimits: (state) => { state.openBuyLimits = !state.openBuyLimits; },
        toggleOpenTypes: (state) => { state.openTypes = !state.openTypes; },
    },
    extraReducers: {
        [createTypes.fulfilled]: (state, action) => { state.types = action.payload; state.loadedTypes = true; },
        [createBuyLimits.fulfilled]: (state, action) => { state.buylimits = action.payload; state.loadedBuyLimits = true; }
    }
});

export const { toggleOpenBuylimits, toggleOpenTypes } = navSlice.actions;

export default navSlice.reducer;