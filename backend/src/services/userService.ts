import { Mongoose, ObjectId } from "mongoose";
import User from "../models/userModel.js";
import { UserType } from "../types/userTypes.js";
import errorCreator from "../utils/error.js";
import { StatusCodes } from "../utils/statusCode.js";

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

export const findUserByEmailService = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

export const findUserByIdService = async (id: ObjectId | string) => {
  const user = await User.findById(id);
  return user;
};

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

  await User.updateOne({ _id: userId }, { username, email, profileImage });
};
