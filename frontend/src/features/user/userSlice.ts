/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import {
  refreshTokenApi,
  signInUserApi,
  signUpUserApi,
  signOutApi,
  updateUserApi,
} from "./userApi";
import {
  errorNotification,
  successNotification,
} from "../../utils/notifications";


const initialState = {
  id: "",
  username: "",
  email: "",
  isAdmin: false,
  profileImage: "",
  accessToken: "",
};

interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  profileImage: string;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(refreshTokenApi.fulfilled, (state, action) => {
      const {
        id,
        username,
        email,
        isAdmin,
        profileImage,
      }: {
        id: string;
        username: string;
        email: string;
        isAdmin: boolean;
        profileImage: string;
      } = jwtDecode(action.payload);

      state.id = id;
      state.username = username;
      state.email = email;
      state.isAdmin = isAdmin;
      state.profileImage = profileImage;
      state.accessToken = action.payload;
    });

    builder.addCase(refreshTokenApi.pending, () => {
      console.log("hi hello");
    });

    builder.addCase(refreshTokenApi.rejected, (state) => {
      errorNotification("you must login");
      state.username = "";
      state.email = "";
      state.isAdmin = false;
      state.profileImage = "";
      state.accessToken = "";
    });

    builder.addCase(signInUserApi.fulfilled, (state, action) => {
      const { id, username, email, isAdmin, profileImage }: User = jwtDecode(
        action.payload.data
      );

      state.id = id;
      state.username = username;
      state.email = email;
      state.isAdmin = isAdmin;
      state.profileImage = profileImage;
      state.accessToken = action.payload.data;
      successNotification(action.payload.message);
    });

    builder.addCase(signInUserApi.rejected, (state, action) => {
      const error = action?.payload as any;
      state = initialState;
      errorNotification(error);
    });

    builder.addCase(signUpUserApi.fulfilled, (state, action) => {
      successNotification(action.payload);
    });

    builder.addCase(signUpUserApi.rejected, (state, action) => {
      const error = action?.payload as any;
      errorNotification(error);
    });

    builder.addCase(signOutApi.fulfilled, (state) => {
      successNotification("you are logged out");
      state.username = "";
      state.email = "";
      state.isAdmin = false;
      state.profileImage = "";
      state.accessToken = "";
    });

    builder.addCase(updateUserApi.fulfilled, (state, action) => {
      const { username, email, profileImage } = action.payload;

      state.username = username;
      state.email = email;
      state.profileImage = profileImage;
      successNotification(action.payload.message);
    });

    builder.addCase(updateUserApi.rejected, (state, action) => {
      const error = action?.payload as any;
      errorNotification(error);
    });
  },
});

export default userSlice.reducer;
