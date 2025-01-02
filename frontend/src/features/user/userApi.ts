/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axiosConfig";

export const refreshTokenApi = createAsyncThunk<any>(
  "user/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      console.log("fdf");
      const response = await axios.get("/auth/refresh", {
        withCredentials: true,
      });
      console.log(response);
      return response.data.data;
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  }
);

export const signInUserApi = createAsyncThunk<
  any,
  {
    email: string;
    password: string;
  }
>("user/signInUser", async (userData, { rejectWithValue }) => {
  try {
    console.log("signin");
    const response = await axios.post("/auth/signin", userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (err: any) {
    console.log(err);
    return rejectWithValue(
      err.response?.data?.message || "Something went wrong. Please try again."
    );
  }
});

export const signUpUserApi = createAsyncThunk<
  string,
  {
    username: string;
    email: string;
    password: string;
  }
>("user/signUpUser", async (userData, { rejectWithValue }) => {
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

export const updateUserApi = createAsyncThunk<
  any,
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

    return response.data.data;
  } catch (err: any) {
    console.error(err);
    return rejectWithValue(
      err.response?.data?.message || "Something went wrong. Please try again."
    );
  }
});

export const signOutApi = createAsyncThunk("user/signOutUser", () => {
  axios.get("/auth/signout", { withCredentials: true });
});
