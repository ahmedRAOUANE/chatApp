import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {results: null},
    reducers: {
        setResults: (state, {payload}) => {
            state.results = payload;
        }
    }
})

export const { setResults } = searchSlice.actions;
export default searchSlice.reducer
