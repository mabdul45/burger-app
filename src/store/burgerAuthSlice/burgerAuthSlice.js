import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

// export const auth = createAsyncThunk(
//     'BurgerAuth/auth',
//     async ({ ...authParams }) => {
//         const isSignup = authParams.isSignup;
//         const authData = {
//             email: authParams.email,
//             password: authParams.password,
//             returnSecureToken: true
//         };

//         let url = ''

//         if (!isSignup) {
//             url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA87qqaUf805bzrDBx5_E4R6YgIMOtLP6w'
//         } else {
//             url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA87qqaUf805bzrDBx5_E4R6YgIMOtLP6w';
//         }
//         await axios.post(url, authData)
//             .then(response =>
//                 response.data
//                 // .catch(err => {
//                 //     console.log('POST REQUEST FAILLED', err.data, err);
//                 //     rejectWithValue(err.response.data.error.message, console.log('ERROR', err))
//                 //     if (err.data.status === 400) { }
//                 // })
//             )
//     })

// console.log(auth,);

// const BurgerAuthSlice = createSlice({
//     name: 'BurgerAuth',
//     initialState,
//     reducers: {
//         setUnauth(state, action) {
//             state.token = null
//             state.authRedirectPath = action.payload
//         }
//     },
//     extraReducers: builder => {
//         builder.addCase(auth.pending, (state, action) => {
//             state.loading = true
//             console.log('action', 'auth pending', action);
//         })
//         builder.addCase(auth.fulfilled, (state, action) => {
//             console.log('action', 'auth fulfilled', action.payload);
//             state.token = null
//             state.userId = null
//             state.loading = false
//         })
//         builder.addCase(auth.rejected, (state, action) => {
//             state.error = action.payload
//             console.log('action', 'auth rejected', action);
//             state.token = null
//             state.userId = null
//             state.loading = false

//         })
//     }
// });


export const auth = createAsyncThunk(
    'BurgerAuth/auth',
    async ({ ...authParams }, { rejectWithValue }) => {
        const isSignup = authParams.isSignup;
        const authData = {
            email: authParams.email,
            password: authParams.password,
            returnSecureToken: true
        };

        let url = ''

        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA87qqaUf805bzrDBx5_E4R6YgIMOtLP6w'
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA87qqaUf805bzrDBx5_E4R6YgIMOtLP6w';
        }
        try {
            const response = await axios.post(url, authData)
            console.log('POST REQUEST SUCCESS', response.data);
            return response.data
        } catch (error) {
            console.log('POST REQUEST FAILLED', error.data, error);
            return rejectWithValue(error.response.data.error.message, console.log('ERROR', error))
        }

    }
);

const BurgerAuthSlice = createSlice({
    name: 'BurgerAuth',
    initialState,
    reducers: {
        setLogout(state, action) {
            state.token = null
            state.userId = null
            state.authRedirectPath = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(auth.pending, (state, action) => {
            state.loading = true
            console.log('action', 'auth pending', action);
        })
        builder.addCase(auth.fulfilled, (state, action) => {
            console.log('action', 'auth fulfilled', action.payload);
            state.token = action.payload.idToken
            state.userId = action.payload.localId
            state.loading = false
        })
        builder.addCase(auth.rejected, (state, action) => {
            state.error = action.payload
            console.log('action', 'auth rejected', action);
            state.token = null
            state.userId = null
            state.loading = false
        })
    }
});


export const burgerAuthActions = BurgerAuthSlice.actions;

export const burgerAuthReducer = BurgerAuthSlice.reducer