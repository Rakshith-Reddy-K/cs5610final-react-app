import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "../ProductDetails/Comments/CommentsReducer";
import cartReducer from "../Cart/CartReducer";

const store = configureStore({
  reducer: {
    commentsReducer,
    cartReducer,
  }
});

export default store;