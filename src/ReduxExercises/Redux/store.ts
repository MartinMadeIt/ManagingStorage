import { configureStore } from "@reduxjs/toolkit";
import { companySlice } from "./companySlice";
import { moneySlice } from "./moneySlice";
import { orderSlice } from "./orderSlice";

export const store = configureStore({
    reducer: {
        money : moneySlice.reducer,
        orders : orderSlice.reducer,
        company: companySlice.reducer}
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

