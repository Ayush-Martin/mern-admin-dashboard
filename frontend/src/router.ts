import Auth from "./pages/auth/auth";
import Home from "./pages/user/Home";
import Profile from "./pages/user/Profile";

export const authRouter = [
  {
    path: "/auth",
    component: Auth,
  },
];

export const userRouter = [
  { path: "/", component: Home },
  { path: "/profile", component: Profile },
];
