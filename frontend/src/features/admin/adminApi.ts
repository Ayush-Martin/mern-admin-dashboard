import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axiosConfig";

export const getUsersApi = createAsyncThunk(
  "admin/getUsers",
  (search:string) => {
    return axios
      .get(`/admin?search=${search}`)
      .then((res) => res.data.userList);
  }
);
