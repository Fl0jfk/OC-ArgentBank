import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: localStorage.getItem("token") !==null,
    token: localStorage.getItem("token"),
    error: '',
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    authSuccess: (state, action) => {
        state.isAuth = true;
        state.token = action.payload;
        state.error = '';
    },
    authRejected: (state, action) => {
        state.isAuth = false;
        state.token = null;
        state.error = action.error.message;
    },
    authOutSuccess: state => {
        state.isAuth = false;
        state.token = null;
        state.error = '';
    },
  },
});

export const { authPending, authSuccess, authRejected, authOutSuccess } = authSlice.actions;

export default authSlice.reducer;