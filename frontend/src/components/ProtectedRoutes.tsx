import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ role }: { role: string }) => {
  const { accessToken, isAdmin } = useSelector(
    (state: RootState) => state.user
  );
  const location = useLocation();

  switch (role) {
    case "admin":
      if (!isAdmin) {
        return <Navigate to="/" state={{ from: location }} replace />;
      }
      return <Outlet />;

    case "user":
      if (!accessToken) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
      }
      if (isAdmin) {
        return <Navigate to="/admin" state={{ from: location }} replace />;
      }
      return <Outlet />;

    case "auth":
      if (isAdmin && accessToken) {
        return <Navigate to="/admin" state={{ from: location }} replace />;
      }
      if (accessToken) {
        return <Navigate to="/" state={{ from: location }} replace />;
      }
      return <Outlet />;

    default:
      return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export default ProtectedRoutes;
