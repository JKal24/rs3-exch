import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ITEMS_PER_PAGE } from "../../config/format";
import { getItems } from "../../data/commands";

export const readItems = createAsyncThunk('items/read',
    async ( { filter = null, param = '' }, thunkAPI) => {
        try {
            return await getItems(filter, param);
        } catch (err) {
            thunkAPI.rejectWithValue(err.message);
        }
    }
)

const itemSlice = createSlice({
    name: "items",
    initialState: {
        contents: [],
        error: '',
        page: 1,
        pageItems: [],
        index: 0,
        loaded: false
    },
    reducers: {
        input: (state, action) => { state = { ...state, contents: action.payload, pageItems: action.payload.slice(0, ITEMS_PER_PAGE) } },
        refresh: (state) => { state = { contents: [], error: '', pageItems: [], page: 1, index: 0 } },
        incrementPage: (state) => { state.page += 1; state.pageItems = state.contents.slice[state.index, state.index + ITEMS_PER_PAGE]; state.index += ITEMS_PER_PAGE; },
        decrementPage: (state) => {
            if (state.page > 1) {
                state.page = state.page - 1; state.pageItems = state.contents.slice[state.index - ITEMS_PER_PAGE, state.index]; state.index -= ITEMS_PER_PAGE;
            }
        },
        setFirstPage: (state) => { state.page = 1; state.pageItems = state.contents.slice[0, ITEMS_PER_PAGE]; state.index = 0 },
        error: (state, action) => { state.error = action.payload }
    },
    extraReducers: {
        [readItems.fulfilled]: (state, action) => {
            state.contents = action.payload;
            state.pageItems = (action.payload).slice(0, ITEMS_PER_PAGE);
            state.loaded = true;
        },
        [readItems.rejected]: (state, action) => {
            state.error = action.error;
        }
    }
})

export const { input, request, receive, refresh, incrementPage, decrementPage, setFirstPage, error } = itemSlice.actions;

export default itemSlice.reducer;