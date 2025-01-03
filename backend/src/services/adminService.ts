import { ObjectId } from "mongoose";
import User from "../models/userModel.js";

export const getUsersListService = async (search: string = "") => {
  const searchQuery = {
    email: new RegExp(search, "i"),
    isAdmin: false,
  };

  const usersList = await User.find(searchQuery, {
    username: 1,
    email: 1,
    isBlocked: 1,
  });
  return usersList;
};

export const getUserDataService = async (userId: ObjectId | string) => {
  const userData = await User.findById(userId, {
    username: 1,
    email: 1,
    profileImage: 1,
  });
  return userData;
};

export const blockUnblockUserService = async (userId: ObjectId | string) => {
  const user = await User.findById(userId);
  console.log(user);
  await User.updateOne({ _id: userId }, { isBlocked: !user?.isBlocked });
};

export const deleteUserService = async (userId: ObjectId | string) => {
  await User.deleteOne({ _id: userId });
};
