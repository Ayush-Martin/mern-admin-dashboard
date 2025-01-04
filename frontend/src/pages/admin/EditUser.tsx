import { Button, Header, Input } from "../../components";
import { MdEdit, MdDelete } from "react-icons/md";
import useEditUser from "../../hooks/useEditUser";
import { ValidationErrorText } from "../../components";
import { Link, useParams } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FC, useEffect } from "react";
import axios from "axios";

const Profile: FC = () => {
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
  } = useEditUser();

  const { userId } = useParams();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/admin/${userId}`);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  });
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
            <Button
              text="save"
              disabled={!!(emailError || !email || usernameError || !username)}
              clickHandler={updateProfile}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
