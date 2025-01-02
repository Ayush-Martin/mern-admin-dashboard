import Auth from "./pages/auth/auth";
import Home from "./pages/user/Home";

export const authRouter = [
  {
    path: "/auth",
    component: Auth,
  },
];

export const userRouter = [{ path: "/", component: Home }];
