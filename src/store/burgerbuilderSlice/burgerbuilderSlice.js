import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios-orders';

const initialState = {
    ingredients: null,
    loading: false,
    totalPrice: 4
}

export const fetchIngredients = createAsyncThunk(
    'BurgerBuilder/fetchIngredients',
    () => axios.get('/ingredients.json')
        .then(response => response.data)
        .catch(err => console.log(err.message))
)

const burgerBuilderSlice = createSlice({
    name: 'BurgerBuilder',
    initialState,
    reducers: {
        setIngredient(state, action) {
            state.ingredients = action.payload
        },
        setTotalPrice(state, action) {
            state.totalPrice = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchIngredients.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchIngredients.fulfilled, (state, action) => {
            state.loading = false;
            state.ingredients = action.payload;
            state.totalPrice = 4
        })
    },
})

export const burgerBuilderActions = burgerBuilderSlice.actions

export const burgerBuilderReducer = burgerBuilderSlice.reducer