import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../Slice/todosSlice";
import thunk from "redux-thunk";

const middleware = [thunk];

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
});

export default store;

//we delayed fnction using thunk
// like if we want x= 1+2
// but we will do funcThunck = () => {1+2}
// x = funcThunk
// 2. actions are by default synchronous
// if we want it to be async we wrap it in thunk function
//use apply middleware in create store func
// pass thunk in apply middleware funcs
