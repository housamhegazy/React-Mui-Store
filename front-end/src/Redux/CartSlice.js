import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  insertedProducts :[]
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addToCart: (state, action) => {
     const newArray = state.insertedProducts.push({...action.payload, "Quantity":1})
     state.insertedProducts = newArray;
    },
    increaseProducts: (state, action) => {
       const increasedProduct = state.insertedProducts.find((item)=>{item.id === action.payload.id})
       increasedProduct.Quantity++
    },
    decreaseProducts: (state, action) => {
        const increasedProduct = state.insertedProducts.find((item)=>{item.id === action.payload.id})
        increasedProduct.Quantity--
        if(increasedProduct.Quantity === 0){
        const newArray2 = state.insertedProducts.filter((item)=>{item.id !== action.payload.id})
        state.insertedProducts = newArray2;
        }
    },
    deleteProducts: (state, action) => {
        const newArray2 = state.insertedProducts.filter((item)=>{item.id !== action.payload.id})
        state.insertedProducts = newArray2;
    },
  },
})

// Action creators are generated for each case reducer function
export const {addToCart, increaseProducts, decreaseProducts, deleteProducts } = counterSlice.actions

export default counterSlice.reducer