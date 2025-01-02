import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { authRouter, userRouter } from "./router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { useEffect } from "react";
import { refreshTokenApi } from "./features/user/userApi";

const App = () => {
  const { accessToken } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  console.log(accessToken);
  useEffect(() => {
    if (!accessToken) {
      dispatch(refreshTokenApi());
    }
  }, [accessToken, dispatch]);

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {authRouter.map((route) =>
            !accessToken ? (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ) : (
              <Route
                key={route.path}
                path={route.path}
                element={<Navigate to={"/"} />}
              />
            )
          )}

          {userRouter.map((route) =>
            accessToken ? (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ) : (
              <Route
                key={route.path}
                path={route.path}
                element={<Navigate to={"/auth"} />}
              />
            )
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
