import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';

//We create here the Redux store
export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});