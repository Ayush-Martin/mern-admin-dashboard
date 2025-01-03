import { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { checkValidEmail, checkValidPassword } from "../utils/validation";
import { signInUserApi } from "../features/user/userApi";
import { AppDispatch } from "../redux/store";
import { useLocation, Navigate, useNavigate } from "react-router-dom";

const useSignin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const err = checkValidEmail(value);
    setEmailError(err);
    setEmail(value);
  };

  const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const err = checkValidPassword(value);
    setPasswordError(err);
    setPassword(value);
  };

  const handleSubmit = () => {
    dispatch(signInUserApi({ email, password })).then(() => {
      navigate(from, { replace: true });
    });
  };

  return {
    email,
    password,
    emailError,
    passwordError,
    emailChangeHandler,
    passwordChangeHandler,
    handleSubmit,
  };
};

export default useSignin;
