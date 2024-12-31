import { Input } from "./index";
import { ValidationErrorText, Button1 } from "./index";

const SignIn = () => {
  return (
    <div className="flex flex-col w-full gap-2">
      <Input type="text" placeHolder="email" />
      <ValidationErrorText error={"validation error"} />
      <Input type="text" placeHolder="password" />
      <ValidationErrorText error={"validation error"} />
      <Button1 text="Sign In" />
    </div>
  );
};

export default SignIn;
