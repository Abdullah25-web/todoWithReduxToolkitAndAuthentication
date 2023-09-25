// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../common/constanst";
import axios from "axios";
import axiosInstance from "../../axiosInstance";
import Cookies from "js-cookie";

const initialState = {
  email: "",
  password: "",
  token: "",
  loading: false,
  error: "",
  user: null,
  msg: ",",
};

export const signUpUser = createAsyncThunk("signupuser", async (body) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/signup`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
});

export const logInUser = createAsyncThunk("loginuser", async (body) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/login`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { error, msg, token, user } = response.data;
    if (!error) {
      Cookies.set("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
});

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    clearForm: (state) => {
      state.email = "";
      state.password = "";
    },
    addToken: (state, action) => {
      state.token = action.payload;
    },
    addUser: (state, action) => {
      state.user = action.payload; // Set user directly from the action payload
    },
    logout: (state, action) => {
      state.token = "";
      state.user = null;
      localStorage.clear();
    },
  },
  extraReducers: {
    //login
    [logInUser.pending]: (state, action) => {
      state.loading = true;
    },
    [logInUser.rejected]: (state, action) => {
      state.loading = true;
    },
    [logInUser.fulfilled]: (state, action) => {
      console.log(action.payload);
      const { error, msg, token, user } = action.payload;

      state.loading = false; // Set loading to false
      if (error) {
        state.error = error;
      } else {
        // console.log(token);
        state.msg = msg;
        state.token = token;
        state.user = user;
        Cookies.set("token", token);
        localStorage.setItem("msg", msg);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
      }
    },
    //signup
    [signUpUser.pending]: (state, action) => {
      state.loading = true;
    },
    [signUpUser.rejected]: (state, action) => {
      state.loading = true;
    },
    [signUpUser.fulfilled]: (state, action) => {
      const { error, msg, token } = action.payload;
      localStorage.setItem("token", token);

      state.loading = false; // Set loading to false
      if (error) {
        state.error = error;
      } else {
        state.msg = msg;
      }
    },
  },
});

export const { setEmail, setPassword, clearForm, addToken, addUser, logout } =
  authSlice.actions;
export default authSlice.reducer;
