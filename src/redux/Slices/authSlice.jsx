import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: localStorage.getItem("token") !==null,
    token: localStorage.getItem("token"),
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
    authOutSuccess: state => {
        state.isAuth = false;
        state.token = null;

    },
  },
});

export const { authSuccess, authRejected, authOutSuccess } = authSlice.actions;

export default authSlice.reducer;