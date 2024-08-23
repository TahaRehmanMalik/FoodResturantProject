import { configureStore } from '@reduxjs/toolkit';
import reserveReducer from '../reservation/reserveSlice';
import homeReducer from '../component/homeSlice';
import authReducer from '../Auth/authSlice';
export const store = configureStore({
    reducer: {
      reservation:reserveReducer,
      home:homeReducer,
      auth:authReducer
    },
  })