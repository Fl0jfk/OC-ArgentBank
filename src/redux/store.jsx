import { configureStore } from '@reduxjs/toolkit';
import connectionSliceReducer from './Slices/connectionSlice';

export const store = configureStore({
    reducer: {
        connection: connectionSliceReducer
    },
});