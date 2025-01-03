/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { getUserApi, getUsersApi } from "./adminApi";

const initialState: { users: any[] } = {
  users: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersApi.fulfilled, (state, action) => {
      console.log(action.payload);
      state.users = action.payload;
    });
  },
});

export default adminSlice.reducer;
