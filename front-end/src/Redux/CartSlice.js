import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  insertedProducts :[]
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addToCart: (state, action) => {
     const newArray = state.insertedProducts.push({...action.payload, "Quantity":"1"})
    //  state.insertedProducts = newArray;
    },
    increaseProducts: (state, action) => {
    //   state.insertedProducts =[]
    },
    decreaseProducts: (state, action) => {
    //   state.insertedProducts =[]
    },
    deleteProducts: (state, action) => {
    //   state.insertedProducts = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {addToCart, increaseProducts, decreaseProducts, deleteProducts } = counterSlice.actions

export default counterSlice.reducer