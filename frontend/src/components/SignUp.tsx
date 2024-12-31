import { Input } from "./index";
import { ValidationErrorText, Button1 } from "./index";
import useSignup from "../hooks/useSignup";

const SignUp = () => {
  const {
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
  } = useSignup();
  return (
    <div className="flex flex-col w-full gap-3">
      <Input
        type="text"
        placeHolder="username"
        value={username}
        inputChangeHandler={usernameChangeHandler}
      />
      {usernameError && <ValidationErrorText error={usernameError} />}
      <Input
        type="text"
        placeHolder="email"
        value={email}
        inputChangeHandler={emailChangeHandler}
      />
      {emailError && <ValidationErrorText error={emailError} />}
      <Input
        type="text"
        placeHolder="password"
        value={password}
        inputChangeHandler={passwordChangeHandler}
      />
      {passwordError && <ValidationErrorText error={passwordError} />}
      <Button1
        clickHandler={handleSubmit}
        text="Sign Up"
        disabled={
          !!(
            usernameError ||
            emailError ||
            passwordError ||
            !username ||
            !email ||
            !password
          )
        }
      />
    </div>
  );
};

export default SignUp;
