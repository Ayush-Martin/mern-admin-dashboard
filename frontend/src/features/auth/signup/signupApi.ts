/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../config/axiosConfig";
import { responseType } from "../../../types/basicTypes";

export const signUpUserApi = createAsyncThunk<
  string,
  {
    username: string;
    email: string;
    password: string;
  }
>("signUp/signUpUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post("/auth/signup", userData);
    return response.data.message;
  } catch (err: any) {
    console.log(err);
    return rejectWithValue(
      err.response?.data?.message || "Something went wrong. Please try again."
    );
  }
});
