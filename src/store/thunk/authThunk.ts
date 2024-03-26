import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../../api/authApi";
import { AxiosError } from "axios";
import axios from "../../configs/axios";
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
        throw error.response?.data.message
      }
    }
  }
);
