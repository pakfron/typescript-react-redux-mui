import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "../store";
import { loginAction } from "../thunk/authThunk";
import { setAccessToken } from "../../utils/local-storage";

type User = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type errorValidation = {
  value: string;
  error: boolean;
};
type userError = {
  message: string;
  username: errorValidation;
  password: errorValidation;
};
type authState = {
  error: userError;
  user: User;
  accessToken: string;
  userId: number;
  isLoading: boolean;
};
const initialState: authState = {
  error: {
    message: "",
    username: {
      value: "",
      error: false,
    },
    password: {
      value: "",
      error: false,
    },
  },
  user: {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  accessToken: "",
  userId: 0,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    usernameOnChange(state, action) {
      state.user.username = action.payload;
    },
    passwordOnChange(state, action) {
      state.user.password = action.payload;
    },
    loginValidate(state, action) {
      const username = action.payload?.username;
      const password = action.payload?.password;
      if (username !== undefined && password !== undefined) {
        state.error.username.value = username;
        state.error.username.error = true;
        state.error.password.value = password;
        state.error.password.error = true;
        return;
      }
      if (username !== undefined) {
        state.error.username.value = username;
        state.error.username.error = true;
        state.error.password.value = "";
        state.error.password.error = false;
        return;
      }
      if (password !== undefined) {
        state.error.username.value = "";
        state.error.username.error = false;
        state.error.password.value = password;
        state.error.password.error = true;
        return;
      }
    },
    GetToken(state,action){
      state.accessToken = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(loginAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.user.username =
        action.payload?.user.username || state.user.username;
      state.error.message = "";
      state.accessToken = action.payload?.accessToken || "";
      state.userId = action.payload?.user.id || 0;
      state.isLoading = false;
      state.error.username.value = "";
      state.error.username.error = false;
      state.error.password.value = "";
      state.error.password.error = false;
      setAccessToken(state.accessToken)
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error.message = action.error.message || "";
      console.log(state.error.message);
      state.error.username.value = "";
      state.error.username.error = false;
      state.error.password.value = "";
      state.error.password.error = false;
    });
  },
});

export const { usernameOnChange, passwordOnChange, loginValidate ,GetToken} =
  authSlice.actions;
export const authSelector = (store: rootState) => store.authReducer;
export default authSlice.reducer;
