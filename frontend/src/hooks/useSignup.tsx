import { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import {
  checkValidText,
  checkValidEmail,
  checkValidPassword,
} from "../utils/validation";
import { signUpUserApi } from "../features/auth/signup/signupApi";
import { AppDispatch } from "../redux/store";

const useSignup = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const dispatch: AppDispatch = useDispatch();

  const usernameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const err = checkValidText(value, "username", 3, 15);
    setUsernameError(err);
    setUsername(value);
  };

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
    dispatch(signUpUserApi({ username, email, password }));
  };

  return {
    username,
    email,
    password,
    usernameError,
    emailError,
    passwordError,
    usernameChangeHandler,
    emailChangeHandler,
    passwordChangeHandler,
    handleSubmit,
  };
};

export default useSignup;
