import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { FC, ReactElement, useEffect } from "react";
import { refreshTokenApi } from "../features/user/userApi";

interface AuthTokenProps {
  children: ReactElement;
}

const AuthToken: FC<AuthTokenProps> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();
  const { accessToken } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    dispatch(refreshTokenApi()); //used to refresh token when app is start
  }, [accessToken, dispatch]);
  return <div>{children}</div>;
};

export default AuthToken;
