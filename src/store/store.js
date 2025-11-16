import { configureStore } from "@reduxjs/toolkit";
import { uiSlice, authSlice, productSlice } from './';



export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        product: productSlice.reducer
    }
})
