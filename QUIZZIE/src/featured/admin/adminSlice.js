import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  email: "",
};

const adminReducer = createSlice({
  name: "admin",
  initialState,
  reducers: {
    initialised: (state) => {
      if (localStorage.getItem("accessToken")) {
        state.isAuthenticated = true;
      }
    },
    signup: (state, action) => {
      state.email = action.payload.email;
    },
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.email = "";
    },
  },
});

export const { signup, login, logout, initialised } = adminReducer.actions;
export default adminReducer.reducer;
