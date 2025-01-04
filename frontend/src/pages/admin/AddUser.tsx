import { FaHome } from "react-icons/fa";
import { Button, Header, Input, ValidationErrorText } from "../../components";
import { Link } from "react-router-dom";
import useAddUser from "../../hooks/useAddUser";
import { FC } from "react";

const AddUser: FC = () => {
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
  } = useAddUser();
  return (
    <div>
      <Header>
        <Link
          to={"/admin"}
          className="flex items-center gap-2 text-white hover:text-orange-500"
        >
          <FaHome />
          Home
        </Link>
      </Header>
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col gap-16 m-auto bg-white rounded-md p-7 bg-opacity-10 w-96 ">
          <h1 className="text-3xl text-center text-white">Add New User</h1>
          <div className="flex flex-col w-full gap-3 ">
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
              type="password"
              placeHolder="password"
              value={password}
              inputChangeHandler={passwordChangeHandler}
            />
            {passwordError && <ValidationErrorText error={passwordError} />}
            <Button
              clickHandler={handleSubmit}
              text="Add"
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
        </div>
      </div>
    </div>
  );
};

export default AddUser;
