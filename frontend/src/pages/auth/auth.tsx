import { useState } from "react";
import bg1 from "../../assets/bg1.jpg";
import { SignUp, SignIn } from "../../components/index";

const Auth = () => {
  const [signIn, setSignIn] = useState(true);

  return (
    <div className="relative">
      <img src={bg1} className="object-cover w-screen h-screen" />
      <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
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
    </div>
  );
};

export default Auth;
