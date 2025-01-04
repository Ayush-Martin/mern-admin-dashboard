/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { getUsersApi } from "./adminApi";

const initialState: { users: any[] } = {
  users: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersApi.fulfilled, (state, action) => {
      state.users = action.payload.data;
    });
  },
});

export default adminSlice.reducer;
