import bg1 from "../../assets/bg1.jpg";
import { Button1, Header, Input } from "../../components";
import { MdEdit, MdDelete } from "react-icons/md";
import useProfile from "../../hooks/useProfile";
import { ValidationErrorText } from "../../components";

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
  } = useProfile();

  return (
    <div className="relative">
      <img src={bg1} className="object-cover w-screen h-screen" />
      <Header />
      <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
        <div className="flex flex-col items-center m-auto bg-white rounded-md gap-7 p-7 bg-opacity-10 w-96">
          <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-24 ">
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

              <MdDelete />
            </div>
          </div>
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
