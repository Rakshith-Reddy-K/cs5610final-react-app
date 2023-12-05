import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "../ProductDetails/Comments/CommentsReducer";

const store = configureStore({
  reducer: {
    commentsReducer,
  }
});

export default store;