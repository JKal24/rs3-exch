import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        focus: false,
        key: '',
        filterKeywords: [],
        filterPrice: 0,
        filterTypes: [],
        filterMaxBuyLimit: 30000,
        filterMinBuyLimit: 0
    },
    reducers: {
        toggleFocus: (state) => { state.focus = !state.focus; },
        changeTab: (state, action) => {
            if (state.key === action.payload) state.key = ''; 
            else state.key = action.payload
        },
        filterKeywords: (state, action) => {
            state.filterKeywords = action.payload.split(",").map(keyword => keyword.replace(/\s/g,''));
        },
        filterPrice: (state, action) => {
            const givenPrice = action.payload;
            if (isNaN(givenPrice)) { state.filterPrice = 0; }
            else { state.filterPrice = givenPrice; }
        },
        filterTypes: (state, action) => {
            const typeData = action.payload;
            if (typeData.checked) {
                state.filterTypes.push(typeData.id);
            } else {
                state.filterTypes = state.filterTypes.filter(type => type !== typeData.id);
            }
        },
        filterMaxBuyLimit: (state, action) => {
            const givenLimit = action.payload;
            if (isNaN(givenLimit)) { state.filterMaxBuyLimit = 30000; }
            else { state.filterMaxBuyLimit = givenLimit; }
        },
        filterMinBuyLimit: (state, action) => {
            const givenLimit = action.payload;
            if (isNaN(givenLimit)) { state.filterMinBuyLimit = 0; }
            else { state.filterMinBuyLimit = givenLimit; }
        }
    }
});

export const { toggleFocus, changeTab, filterKeywords, filterPrice, filterTypes, filterMaxBuyLimit, filterMinBuyLimit } = searchSlice.actions;

export default searchSlice.reducer;