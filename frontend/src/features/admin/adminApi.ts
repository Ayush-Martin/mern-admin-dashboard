import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axiosConfig";
import { ApiResponse } from "../../types/responseTypes";

export const getUsersApi = createAsyncThunk<ApiResponse, string>(
  "admin/getUsers",
  (search) => {
    return axios.get(`/admin?search=${search}`).then((res) => res.data);
  }
);
