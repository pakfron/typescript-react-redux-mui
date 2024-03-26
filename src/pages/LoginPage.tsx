import { Button, TextField } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import {
  authSelector,
  passwordOnChange,
  usernameOnChange,
} from "../store/Slice/authSlice";
import { useAppDispatch } from "../store/store";
import { loginAction } from "../store/thunk/authThunk";

type Props = {};
export default function LoginPage({}: Props) {
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

  const loginSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    type input = {
      username: string;
      password: string;
    };
    const input = {
      username: authReducer.user.username,
      password: authReducer.user.password,
    };
    dispatch(loginAction(input));
  };

  if(authReducer.isLoading){
    return <div>Loading...</div>
  }

  return (
    <div className="flex justify-center mt-5">
      <form className="flex flex-col gap-5">
        <div>
          <TextField
            type="text"
            label="username"
            placeholder="Username"
            variant="filled"
            value={authReducer.user.username}
            onChange={(e) => {
              handleUsernameOnChange(e);
            }}
          />
        </div>
        <div>
          <TextField
            type="password"
            label="password"
            placeholder="Password"
            variant="filled"
            value={authReducer.user.password}
            onChange={(e) => {
              handlePasswordOnChange(e);
            }}
          />
        </div>
        <div className="flex justify-center">
          <Button
            onClick={(e) => {
              loginSubmit(e);
            }}
            type="submit"
            className="bg-[#FF6624] hover:bg-[#e55b20] w-full text-white font-bold"
          >
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}
