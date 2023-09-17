import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    isAuth: localStorage.getItem("token") !==null,
    token: null,
    error: '',
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    authPending: state => {
        state.isLoading = true;
    },
    authSuccess: (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.token = action.payload.token;
        state.error = '';
    },
    authRejected: (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.token = null;
        state.error = action.error.message;
    },
    authOutSuccess: state => {
        state.isLoading = false;
        state.isAuth = false;
        state.token = null;
        state.error = '';
    },
    userAlreadyAuth: (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.token = action.payload.token;
        state.error = '';
    }
  },
});

export const { authPending, authSuccess, authRejected, authOutSuccess, userAlreadyAuth } = authSlice.actions;

export default authSlice.reducer;