import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addtoCart: (state, action) => {
        state.comments = [ ...state.cart, { ...action.payload}];
    },
  },
});

export const { setCart, addtoCart} = cartSlice.actions;
export default cartSlice.reducer;
