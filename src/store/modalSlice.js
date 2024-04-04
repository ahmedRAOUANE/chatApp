import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "search",
    initialState: {isOpen: false, type: ""},
    reducers: {
        setIsOpen: (state, {payload}) => {
            state.isOpen = payload;
        },
        setType: (state, {payload}) => {
            state.type = payload;
        },
    }
})

export const { setIsOpen, setType } = modalSlice.actions;
export default modalSlice.reducer;