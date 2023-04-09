import { configureStore } from "@reduxjs/toolkit"

import { burgerBuilderReducer } from "./burgerbuilderSlice/burgerbuilderSlice";
import { burgerAuthReducer } from "./burgerAuthSlice/burgerAuthSlice"

export const store = configureStore({
    reducer: {
        burgerBuilder: burgerBuilderReducer,
        burgerAuth: burgerAuthReducer
    }
})