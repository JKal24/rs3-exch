import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ITEMS_PER_PAGE } from "../../config/format";
import oboe from 'oboe';

export const readItems = createAsyncThunk('items/oboeItems',
    async (signal, filter, param, thunkAPI) => {
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
        const push = 0;

        return oboe(parseString).node('!.[*]', function (x) {
            if (x) {
                dataStream.push(x);
                push++;
            }

            if (push == 5) {
                thunkAPI.dispatch(input(dataStream));
            }

            if (signal.aborted) {
                thunkAPI.dispatch(refresh());
                return [];
            }
        }).done(_ => {
            thunkAPI.dispatch(input(dataStream));
            return dataStream;
        });
    }
)

export const itemSlice = createSlice({
    name: "items",
    initialState: {
        contents: [],
        error: '',
        page: 1,
        pageItems: [],
        index: 0
    },
    reducers: {
        input: (state, action) => { state = {...state, contents: action.payload, pageItems: action.payload.slice(0, ITEMS_PER_PAGE)} },
        refresh: (state) => { state = {contents: [], error: '', pageItems: [], page: 1, index: 0 } },
        incrementPage: (state) => { state.page += 1; state.pageItems = state.contents.slice[state.index, state.index + ITEMS_PER_PAGE]; state.index += ITEMS_PER_PAGE; },
        decrementPage: (state) => {
            if (state.page > 1) {
                state.page = state.page - 1; state.pageItems = state.contents.slice[state.index - ITEMS_PER_PAGE, state.index]; state.index -= ITEMS_PER_PAGE;
            } 
        },
        setFirstPage: (state) => { state.page = 1; state.pageItems = state.contents.slice[0, ITEMS_PER_PAGE]; state.index = 0 },
        error: (state, action) => { state.error = action.payload }
    },
    extraReducers: (builder) => {
        builder.addCase(readItems.fulfilled, (state, action) => {
            state.contents = action.payload;
        })
    }
})

export const { input, request, receive, refresh, incrementPage, decrementPage, setFirstPage, error } = itemSlice.actions;

export default itemSlice.reducer;