import { ChangeEvent, useState } from "react";
import {
  checkValidEmail,
  checkValidPassword,
  checkValidText,
} from "../utils/validation";
import axios from "axios";
import { errorNotification, successNotification } from "../utils/notifications";

const useAddUser = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

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
      const responseError = err as any;
      errorNotification(responseError.response.data.error);
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
