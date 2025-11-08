
// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import {authApi} from '../api/authApi'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(authApi.middleware)
  
});
