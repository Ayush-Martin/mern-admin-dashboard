import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useState } from "react";
import { checkValidEmail, checkValidText } from "../utils/validation";
import { ChangeEvent } from "react";
import { updateUserApi } from "../features/user/userApi";

const useProfile = () => {
  const dispatch: AppDispatch = useDispatch();
  const initialUserState = useSelector((state: RootState) => state.user);

  const [username, setUsername] = useState(initialUserState.username);
  const [email, setEmail] = useState(initialUserState.email);
  const [profileImage, setProfileImage] = useState(
    initialUserState.profileImage
  );
  const [updatedProfileImage, setUpdatedProfileImage] = useState<File | null>(
    null
  );
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");

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

  const profileImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUpdatedProfileImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfileImage = () => {
    setProfileImage("");
  };

  const updateProfile = () => {
    dispatch(
      updateUserApi({ username, email, profileImage: updatedProfileImage })
    );
  };

  return {
    username,
    email,
    profileImage,
    usernameError,
    emailError,
    usernameChangeHandler,
    emailChangeHandler,
    profileImageChangeHandler,
    updateProfile,
    removeProfileImage
  };
};

export default useProfile;
