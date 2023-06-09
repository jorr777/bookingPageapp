import { createSlice } from "@reduxjs/toolkit"
import { userLogin } from "./ActionCreators"


const initialState = {
    user: {},
    isLoading: true,
    error: ''
}



export const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        signOut(state) {
            state.user = {}
        },
        addOnTheCart(state, action) {
            state.user.orders = [...state.user.orders, action.payload]
        }
    },
    extraReducers: {
        [userLogin.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.error = ''
            state.user = action.payload;
        },
        [userLogin.pending.type]: (state) => {
            state.isLoading = true;
        },
        [userLogin.rejected.type]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },
    }
})


export default authSlice.reducer
export const { signOut, addOnTheCart } = authSlice.actions

