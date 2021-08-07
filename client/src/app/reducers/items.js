import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getItems, getPageLimit, doUpdate } from "../../data/commands";

const DEFAULT_LIMIT = 10;

export const readDefaultPageLimit = createAsyncThunk('items/limits',
    async (_, { rejectWithValue }) => {
        try {
            return await getPageLimit();
        } catch (err) {
            rejectWithValue("Using default limit...");
        }
    }
)

export const readItems = createAsyncThunk('items/read',
    async ( { filter, param }, { rejectWithValue }) => {
        try {
            return await getItems(filter, param);
        } catch (err) {
            rejectWithValue(err.message);
        }
    }
)

export const updateItems = createAsyncThunk('items/update',
    async _ => {
        await doUpdate();
    }
)

const itemSlice = createSlice({
    name: "items",
    initialState: {
        contents: [],
        error: '',
        loaded: false,
        itemsPerPage: DEFAULT_LIMIT
    },
    reducers: {
        input: (state, action) => { 
            state = { ...state, contents: action.payload } 
        },
        refresh: (state) => { 
            state = { ...state, contents: [], error: '' } 
        },
        error: (state, action) => { 
            state.error = action.payload; 
        }
    },
    extraReducers: {
        [readItems.fulfilled]: (state, action) => {
            state.contents = action.payload;
            state.loaded = true;
        },
        [readItems.rejected]: (state, action) => {
            state.error = action.error;
        },
        [updateItems.fulfilled]: (state) => {
            state.error = '';
        },
        [readDefaultPageLimit.fulfilled]: (state, action) => {
            state.itemsPerPage = action.payload;
        }
    }
})

export const { input, refresh, error } = itemSlice.actions;

export default itemSlice.reducer;