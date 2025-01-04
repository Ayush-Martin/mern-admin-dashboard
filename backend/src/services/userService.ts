import { ObjectId } from "mongoose";
import User from "../models/userModel.js";
import errorCreator from "../utils/error.js";
import { StatusCodes } from "../utils/statusCode.js";

//used to add or register user to database
export const addUserService = async (
  username: string,
  email: string,
  password: string
) => {
  const userExist = await User.findOne({ $or: [{ username }, { email }] });

  if (userExist) {
    errorCreator("username or email exist", StatusCodes.CONFLICT);
  }

  const newUser = new User({ username, email, password });

  await newUser.save();
};

//return data of a user by email
export const findUserByEmailService = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

//return data of a user by id
export const findUserByIdService = async (id: ObjectId | string) => {
  const user = await User.findById(id);
  return user;
};

//update user data
export const updateUserService = async (
  userId: ObjectId | string,
  username: string,
  email: string,
  profileImage: string
) => {
  const userData = await User.findOne({
    $or: [{ username }, { email }],
    _id: { $ne: userId },
  });

  if (userData) {
    errorCreator("username or email exist", StatusCodes.CONFLICT);
  }

  const BACKEND_DOMAIN = process.env.BACKEND_DOMAIN || "http://localhost:5000";
  let updatedProfileImage = `${BACKEND_DOMAIN}/uploads/${profileImage}`;

  if (!profileImage) {
    const user = await User.findById(userId);
    updatedProfileImage = user?.profileImage as string;
  }

  return await User.findOneAndUpdate(
    { _id: userId },
    { username, email, profileImage: updatedProfileImage },
    { new: true }
  );
};
