import { configureStore } from "@reduxjs/toolkit";
import user from "../features/user/userSlice";
import admin from "../features/admin/adminSlice";

const store = configureStore({
  reducer: {
    user,
    admin,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
