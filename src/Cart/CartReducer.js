import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  cartItems: [],
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
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});

export const { setCart, addtoCart, setCartItems} = cartSlice.actions;
export default cartSlice.reducer;
