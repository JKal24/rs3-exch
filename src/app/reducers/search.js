import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        focus: false
    },
    reducers: {
        toggleFocus: (state) => { state.focus = !state.focus; }
    }
});

export const { toggleFocus } = searchSlice.actions;

export default searchSlice.reducer;