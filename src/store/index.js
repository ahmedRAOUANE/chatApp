import { configureStore } from "@reduxjs/toolkit";

// slices
import userSlice from "./userSlice";
import loaderSlice from "./loaderSlice";
import userFreindsSlice from "./userFreindsSlice";
import searchSlice from "./searchSlice";
import modalSlice from "./modalSlice"
import notificationSlice from "./notificationSlice";
import chatsSlice from "./chatsSlice";

const store = configureStore({
    reducer: {
        userSlice,
        loaderSlice,
        userFreindsSlice,
        searchSlice,
        modalSlice,
        notificationSlice,
        chatsSlice,
    },
});

export default store