import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { ApiResponseError } from "../../config/axiosConfig";
import { ApiResponse } from "../../types/responseTypes";

export const refreshTokenApi = createAsyncThunk<ApiResponse>(
  "user/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/auth/refresh", {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      const resError = err as ApiResponseError;
      console.log(err);
      return rejectWithValue(resError.response.data.error);
    }
  }
);

export const signInUserApi = createAsyncThunk<
  ApiResponse,
  {
    email: string;
    password: string;
  }
>("user/signInUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post("/auth/signin", userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    const resError = err as ApiResponseError;
    console.log(err);
    return rejectWithValue(resError.response.data.error);
  }
});

export const signUpUserApi = createAsyncThunk<
  ApiResponse,
  {
    username: string;
    email: string;
    password: string;
  }
>("user/signUpUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post("/auth/signup", userData);
    return response.data;
  } catch (err) {
    const resError = err as ApiResponseError;
    console.log(err);
    return rejectWithValue(resError.response.data.error);
  }
});

export const updateUserApi = createAsyncThunk<
  ApiResponse,
  {
    username: string;
    email: string;
    profileImage: File | null;
  }
>("user/updateUser", async (updatedData, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append("username", updatedData.username);
    formData.append("email", updatedData.email);
    formData.append(
      "profileImage",
      updatedData.profileImage ? updatedData.profileImage : ""
    );

    const response = await axios.put("/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    const resError = err as ApiResponseError;
    console.log(err);
    return rejectWithValue(resError.response.data.error);
  }
});

export const signOutApi = createAsyncThunk("user/signOutUser", () => {
  axios.get("/auth/signout", { withCredentials: true });
});
