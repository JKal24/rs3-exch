import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getItems } from "../../data/commands";
import axios from 'axios';

export const readItems = createAsyncThunk('items/read',
    async ( { filter = 'N/A', param = '' }, { signal, rejectWithValue }) => {
        try {
            const source = axios.CancelToken.source();
            signal.addEventListener("abort", () => {
                source.cancel();
            })
            return await getItems(filter, param);
        } catch (err) {
            rejectWithValue(err.message);
        }
    }
)

export const refreshItems = createAsyncThunk('items/refresh',
    async () => {
        axios.CancelToken.source().cancel();
    }
)

const itemSlice = createSlice({
    name: "items",
    initialState: {
        contents: [],
        error: '',
        page: 1,
        pageItems: [],
        contentIndex: 0,
        loaded: false,
        itemsPerPage: 5
    },
    reducers: {
        input: (state, action) => { state = { ...state, contents: action.payload, pageItems: action.payload.slice(0, state.itemsPerPage) } },
        refresh: (state) => { state = { contents: [], error: '', pageItems: [], page: 1, contentIndex: 0 } },
        incrementPage: (state) => { state.page += 1; state.pageItems = state.contents.slice[state.contentIndex, state.contentIndex + state.itemsPerPage]; state.contentIndex += state.itemsPerPage; },
        decrementPage: (state) => {
            if (state.page > 1) {
                state.page = state.page - 1; state.pageItems = state.contents.slice[state.contentIndex - state.itemsPerPage, state.contentIndex]; state.contentIndex -= state.itemsPerPage;
            }
        },
        setFirstPage: (state) => { state.page = 1; state.pageItems = state.contents.slice[0, state.itemsPerPage]; state.contentIndex = 0 },
        error: (state, action) => { state.error = action.payload }
    },
    extraReducers: {
        [readItems.fulfilled]: (state, action) => {
            state.contents = action.payload;
            state.pageItems = (action.payload).slice(0, state.itemsPerPage);
            state.loaded = true;
        },
        [readItems.rejected]: (state, action) => {
            state.error = action.error;
        },
        [refreshItems.fulfilled]: (state) => {
            state.error = '';
            state.contents = [];
            state.pageItems = [];
            state.page = 1;
            state.contentIndex = 0;
        }
    }
})

export const { input, request, receive, refresh, incrementPage, decrementPage, setFirstPage, error } = itemSlice.actions;

export default itemSlice.reducer;