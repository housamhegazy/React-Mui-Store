import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  insertedProducts: JSON.parse(localStorage.getItem("insertedProducts")) || [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productsWithQuantity = { ...action.payload, Quantity: 1 };
      state.insertedProducts.push(productsWithQuantity);
      localStorage.setItem(
        "insertedProducts",
        JSON.stringify(state.insertedProducts)
      );
    },

    increaseProducts: (state, action) => {
      const increasedProduct = state.insertedProducts.find((item) => {
        return item.id === action.payload.id;
      });
      increasedProduct.Quantity++;
      localStorage.setItem(
        "insertedProducts",
        JSON.stringify(state.insertedProducts)
      );
    },
    decreaseProducts: (state, action) => {
      const decreasedProduct = state.insertedProducts.find((item) => {
        return item.id === action.payload.id;
      });
      decreasedProduct.Quantity--;
      if (decreasedProduct.Quantity === 0) {
        const newArray2 = state.insertedProducts.filter((item) => {
          return item.id !== action.payload.id;
        });
        state.insertedProducts = newArray2;
      }
      localStorage.setItem(
        "insertedProducts",
        JSON.stringify(state.insertedProducts)
      );
    },
    deleteProducts: (state, action) => {
      const newArray2 = state.insertedProducts.filter((item) => {
        return item.id !== action.payload.id;
      });
      state.insertedProducts = newArray2;
      localStorage.setItem(
        "insertedProducts",
        JSON.stringify(state.insertedProducts)
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, increaseProducts, decreaseProducts, deleteProducts } =
  counterSlice.actions;

export default counterSlice.reducer;
