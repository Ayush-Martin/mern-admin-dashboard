import { configureStore } from "@reduxjs/toolkit";
import signUp from "../features/auth/signup/signupSlice";

const store = configureStore({
  reducer: {
    signUp,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;