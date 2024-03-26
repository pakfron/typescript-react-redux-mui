import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "../store";
import { loginAction } from "../thunk/authThunk";

type User = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type authState = {
  user: User;
  accessToken: string;
  userId: number;
  isLoading: boolean;
};
const initialState: authState = {
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
  },
  extraReducers(builder) {
    builder.addCase(loginAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.user.username = action.payload?.user.username || "";
      state.accessToken = action.payload?.acessToken || "";
      state.userId = action.payload?.user.id || 0;
      state.isLoading = false;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      console.log(action.error.message);
      state.isLoading = false;
    });
  },
});

export const { usernameOnChange, passwordOnChange } = authSlice.actions;
export const authSelector = (store: rootState) => store.authReducer;
export default authSlice.reducer;
