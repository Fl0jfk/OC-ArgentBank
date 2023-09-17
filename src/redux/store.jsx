import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from './Slices/authSlice';
import userSliceReducer from './Slices/userSlice';

export const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        user: userSliceReducer
    }
});