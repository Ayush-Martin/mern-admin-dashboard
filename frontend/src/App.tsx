import { Route, Routes } from "react-router-dom";
import { Layout, ProtectedRoutes } from "./components";
import Home from "./pages/user/Home";
import Auth from "./pages/auth/auth";
import Dashboard from "./pages/admin/Dashboard";
import Profile from "./pages/user/Profile";
import useRefreshToken from "./hooks/useRefreshToken";
import EditUser from "./pages/admin/EditUser";
import AddUser from "./pages/admin/AddUser";

const App = () => {
  useRefreshToken();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<ProtectedRoutes role="auth" />}>
          <Route path="/auth" element={<Auth />} />
        </Route>

        <Route element={<ProtectedRoutes role="user" />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<ProtectedRoutes role="admin" />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/:userId" element={<EditUser />} />
          <Route path="/admin/add" element={<AddUser />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
