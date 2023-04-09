import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

export const auth = createAsyncThunk(
    'BurgerAuth/auth',
    (email, password) => {
        const authData = {
            email: email,
            password: password,
        };
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA87qqaUf805bzrDBx5_E4R6YgIMOtLP6w', authData)
            .then(response => console.log(response.data))
        // .catch(err => console.log(err.message))
    }
)

const BurgerAuthSlice = createSlice({
    name: 'BurgerAuth',
    initialState,
    reducers: {
        setAuth(state, action) {
            state.auth = action.payload
        },
        setUnauth(state, action) {
            state.auth = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(auth.fulfilled, (state, action) => {
            state.token = action.payload
        })
    }
});


export const burgerAuthActions = BurgerAuthSlice.actions

export const burgerAuthReducer = BurgerAuthSlice.reducer