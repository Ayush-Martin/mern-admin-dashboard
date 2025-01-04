import { ChangeEvent, useState } from "react";
import {
  checkValidEmail,
  checkValidPassword,
  checkValidText,
} from "../utils/validation";
import axios from "axios";
import { errorNotification, successNotification } from "../utils/notifications";
import { ApiResponseError } from "../config/axiosConfig";

const useAddUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/admin", { username, email, password });
      successNotification(res.data.message);
    } catch (err) {
      const resErr = err as ApiResponseError;
      errorNotification(resErr.response.data.error || "error while adding");
    }
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

export default useAddUser;
