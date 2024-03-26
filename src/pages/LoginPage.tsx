import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import {
  authSelector,
  loginValidate,
  passwordOnChange,
  usernameOnChange,
} from "../store/Slice/authSlice";
import { useAppDispatch } from "../store/store";
import { loginAction } from "../store/thunk/authThunk";
import { userLoginShema } from "../utils/login-validator";
import { ValidationError } from "yup";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../utils/local-storage";

export default function LoginPage() {
  const navigate = useNavigate();
  const authReducer = useSelector(authSelector);
  const dispatch = useAppDispatch();
  const handleUsernameOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(usernameOnChange(e.target.value));
  };

  const handlePasswordOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(passwordOnChange(e.target.value));
  };

  const loginSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      type data = {
        username: string;
        password: string;
      };
      const input: data = {
        username: authReducer.user.username,
        password: authReducer.user.password,
      };
      const user = await userLoginShema.validate(input, { abortEarly: false });
      dispatch(loginValidate(true));
      const login = await dispatch(loginAction(user));
      console.log(login)
      if(login.type==='auth/login/fulfilled'){
        // navigate('/')
      }
     
    } catch (error) {
      if (error instanceof ValidationError) {
        const resultError: Record<string, string> = error.inner.reduce(
          (acc: Record<string, string>, item) => {
            const key: string = String(item.path);
            acc[key] = item.message;
            return acc;
          },
          {}
        );
        dispatch(loginValidate(resultError));
      }
    }
  };

  if (authReducer.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center mt-5">
      <form className="flex flex-col gap-5 items-center">
        <div className="h-[80px]">
          <TextField
          className="w-[260px]"
            type="text"
            label="username"
            placeholder="Username"
            variant="filled"
            value={authReducer.user.username}
            onChange={(e) => {
              handleUsernameOnChange(e);
            }}
            error={authReducer.error.username.error}
            helperText={authReducer.error.username.value}
          />
        </div>
        <div className="h-[80px]">
          <TextField
          className="w-[260px]"
            type="password"
            label="password"
            placeholder="Password"
            variant="filled"
            value={authReducer.user.password}
            onChange={(e) => {
              handlePasswordOnChange(e);
            }}
            error={authReducer.error.password.error}
            helperText={authReducer.error.password.value}
          />
        </div>
        <div className="flex justify-center">
          <Button
            onClick={(e) => {
              loginSubmit(e);
            }}
            type="submit"
            className="bg-[#FF6624] hover:bg-[#e55b20] w-[260px] text-white font-bold "
          >
            Sign In
          </Button>
        </div>
        <Typography className="font-bold text-red-600">{authReducer.error.message}</Typography>
      </form>
    </div>
  );
}
