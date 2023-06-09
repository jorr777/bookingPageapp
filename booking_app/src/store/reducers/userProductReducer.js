import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    selectedProducts :[]
    
}



export const userProductsSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        selectProducts(state , action) {
            state.selectProducts.push(action.payload)
        }
    },


})


export default userProductsSlice.reducer

export const { selectProducts } = userProductsSlice.actions

