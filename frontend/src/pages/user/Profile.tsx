import { Button1, Header, Input } from "../../components";
import { MdEdit, MdDelete } from "react-icons/md";
import useProfile from "../../hooks/useProfile";
import { ValidationErrorText } from "../../components";
import { Link } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";

const Profile = () => {
  const {
    username,
    email,
    profileImage,
    usernameError,
    emailError,
    usernameChangeHandler,
    emailChangeHandler,
    profileImageChangeHandler,
    updateProfile,
    removeProfileImage,
  } = useProfile();

  return (
    <div>
      <Header>
        <Link
          to={"/"}
          className="flex items-center gap-2 text-white hover:text-orange-500"
        >
          <FaHome />
          Home
        </Link>
        <Link
          to={"/profile"}
          className="flex items-center gap-2 text-white hover:text-orange-500"
        >
          <FaUser />
          Profile
        </Link>
      </Header>
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col items-center h-auto max-h-full bg-white rounded-md gap-7 p-7 bg-opacity-10 w-96">
          <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-24">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="object-cover w-full h-full rounded-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-white capitalize bg-black rounded-full text-7xl">
                  {username[0]}
                </div>
              )}
            </div>
            <div className="flex text-xl text-white gap-7">
              <input
                type="file"
                className="hidden"
                id="profile-image"
                onChange={profileImageChangeHandler}
              />
              <label htmlFor="profile-image" className="cursor-pointer">
                <MdEdit />
              </label>

              <button>
                <MdDelete onClick={() => removeProfileImage()} />
              </button>
            </div>
          </div>

          {/* Input fields */}
          <div className="flex flex-col gap-2 w-60">
            <Input
              placeHolder="username"
              value={username}
              inputChangeHandler={usernameChangeHandler}
              type="text"
            />
            {usernameError && <ValidationErrorText error={usernameError} />}
            <Input
              placeHolder="email"
              value={email}
              inputChangeHandler={emailChangeHandler}
              type="text"
            />
            {emailError && <ValidationErrorText error={emailError} />}
          </div>

          <div>
            <Button1 text="save" clickHandler={updateProfile} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
