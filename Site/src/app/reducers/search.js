import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        focus: false,
        key: 'filter'
    },
    reducers: {
        toggleFocus: (state) => { state.focus = !state.focus; },
        changeTab: (state, action) => { state.key = action.payload },
    }
});

export const { toggleFocus, changeTab } = searchSlice.actions;

export default searchSlice.reducer;