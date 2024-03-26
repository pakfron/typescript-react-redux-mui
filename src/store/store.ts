import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import authReducer from "./Slice/authSlice";
const reducer = {
  authReducer,
};

export const store = configureStore({
  reducer,
});

export type rootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
