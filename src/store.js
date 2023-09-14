

import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./redux/slice/todo";
import authSlice from "./redux/slice/authSlice";

const store = configureStore({
  reducer: {
    tasks: todoReducer,
    user: authSlice,
  },
});

export default store;