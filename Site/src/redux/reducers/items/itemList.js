import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const itemSlicer = createSlice({
    name: "items",
    initialState: {
        requestData: false,
        contents: [],
        cancelRequest: false,
        error: ''
    },
    reducers: {
        add: (state, action) => { contents = [...state.contents, action.payload] },
        request: (state) => { state = {...state, requestData: true} }
    }
})

export default itemSlicer.reducer;