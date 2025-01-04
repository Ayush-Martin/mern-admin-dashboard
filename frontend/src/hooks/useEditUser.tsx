import { useEffect, useState } from "react";
import { checkValidEmail, checkValidText } from "../utils/validation";
import { ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import axios, { ApiResponseError } from "../config/axiosConfig";
import { errorNotification, successNotification } from "../utils/notifications";

const useEditUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [updatedProfileImage, setUpdatedProfileImage] = useState<File | null>(
    null
  );
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const { userId } = useParams();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/admin/${userId}`);
        const { username, email, profileImage } = res.data.data;
        setUsername(username);
        setEmail(email);
        setProfileImage(profileImage);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [userId]);

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

  const updateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append(
        "profileImage",
        updatedProfileImage ? updatedProfileImage : ""
      );
      const res = await axios.put(`/admin/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const resData = res.data.data;
      setUsername(resData.username);
      setEmail(resData.email);
      setProfileImage(resData.profileImage);
      successNotification("profile updated");
    } catch (err) {
      const resErr = err as ApiResponseError;
      errorNotification(resErr.response.data.error || "error while updating");
    }
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
    removeProfileImage,
  };
};

export default useEditUser;
