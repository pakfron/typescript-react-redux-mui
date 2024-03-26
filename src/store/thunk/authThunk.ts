import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../../api/authApi";
import axios from "../../configs/axios";
import { ValidationError } from "yup";
import { userLoginShema } from "../../utils/login-validator";
type input = {
  username: string;
  password: string;
};

export const loginAction = createAsyncThunk(
  "auth/login",
  async (input: input) => {
    try {
      const response = await loginUser(input);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response?.data.message;
      }
    }
  }
);
