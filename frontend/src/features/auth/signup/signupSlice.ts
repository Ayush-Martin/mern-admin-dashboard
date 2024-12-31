/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { signUpUserApi } from "./signupApi";
import {
  successNotification,
  errorNotification,
} from "../../../utils/notifications";

const initialState = {
  loading: false,
  message: "",
  error: false,
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(signUpUserApi.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(signUpUserApi.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.error = false;
      successNotification(action.payload);
    });

    builder.addCase(signUpUserApi.rejected, (state, action) => {
      const error = action?.payload as any;
      state.loading = false;
      state.message = error;
      errorNotification(error);
    });
  },
});

export default signUpSlice.reducer;
