import { useState } from "react";
import { SignUp, SignIn } from "../../components/index";

const Auth = () => {
  const [signIn, setSignIn] = useState(true);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col gap-16 m-auto bg-white rounded-md p-7 bg-opacity-10 w-96 ">
        <h1 className="text-3xl text-center text-white transition-opacity duration-500 ease-in-out">
          {signIn ? "Sign In" : "Sign Up"}
        </h1>

        {signIn ? <SignIn /> : <SignUp />}
        <button
          onClick={() => setSignIn((prev) => !prev)}
          className="text-white underline transition-opacity duration-300 ease-in-out"
        >
          {signIn
            ? "Don’t have an account? Register"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
