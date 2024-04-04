import { createSlice } from "@reduxjs/toolkit";

const userFreindsSlice = createSlice({
    name: "userFreinds",
    initialState: {freinds: null},
    reducers: {
        setUserFreinds: (state, {payload}) => {
            state.freinds = payload
        }
    }
})

export const { setUserFreinds } = userFreindsSlice.actions;
export default userFreindsSlice.reducer
