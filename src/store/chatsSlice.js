import { createSlice } from "@reduxjs/toolkit";

const chatsSlice = createSlice({
    name: "chats",
    initialState: {chats: [], chatId: null},
    reducers: {
        setChats: (state, {payload}) => {
            state.chats = payload
        }, 
        setChatId: (state, {payload}) => {
            state.chatId = payload;
        }
    }
})

export const { setChats, setChatId } = chatsSlice.actions;
export default chatsSlice.reducer;