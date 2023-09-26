import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: sessionStorage.getItem("token") || localStorage.getItem("token") !==null,
    token: sessionStorage.getItem("token") || localStorage.getItem("token")
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    authSuccess: (state, action) => {
        state.isAuth = true;
        state.token = action.payload;
    },
    authRejected: state => {
        state.isAuth = false;
        state.token = null;
    },
    authOut: state => {
        state.isAuth = false;
        state.token = null;
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
    },
  },
});

export const { authSuccess, authRejected, authOut } = authSlice.actions;

export default authSlice.reducer;