import { configureStore } from "@reduxjs/toolkit"

import { burgerBuilderReducer } from "./burgerbuilderSlice/burgerbuilderSlice"

export const store = configureStore({
    reducer: {
        burgerBuilder: burgerBuilderReducer,
    }
})