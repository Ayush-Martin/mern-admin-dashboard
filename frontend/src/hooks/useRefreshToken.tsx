import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { refreshTokenApi } from "../features/user/userApi";

const useRefreshToken = () => {
  const { accessToken } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (!accessToken) {
      dispatch(refreshTokenApi());
    }
  }, [accessToken, dispatch]);
};

export default useRefreshToken;
