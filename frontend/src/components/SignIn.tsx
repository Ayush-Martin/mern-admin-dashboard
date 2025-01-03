import { Input } from "./index";
import { ValidationErrorText, Button1 } from "./index";
import useSignin from "../hooks/useSignin";

const SignIn = () => {
  const {
    email,
    password,
    emailError,
    passwordError,
    emailChangeHandler,
    passwordChangeHandler,
    handleSubmit,
  } = useSignin();
  return (
    <div className="flex flex-col w-full gap-3">
      <Input
        type="text"
        placeHolder="email"
        value={email}
        inputChangeHandler={emailChangeHandler}
      />
      {emailError && <ValidationErrorText error={emailError} />}
      <Input
        type="password"
        placeHolder="password"
        value={password}
        inputChangeHandler={passwordChangeHandler}
      />
      {passwordError && <ValidationErrorText error={passwordError} />}
      <Button1
        clickHandler={handleSubmit}
        text="Sign In"
        disabled={!!(emailError || passwordError || !email || !password)}
      />
    </div>
  );
};

export default SignIn;
