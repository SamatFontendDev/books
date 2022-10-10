import { configureStore } from "@reduxjs/toolkit";
import { googleBooksApi } from "./googleBooks/googleBooks.api";

export const store = configureStore({
    reducer: {
        [googleBooksApi.reducerPath]: googleBooksApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(googleBooksApi.middleware)
})