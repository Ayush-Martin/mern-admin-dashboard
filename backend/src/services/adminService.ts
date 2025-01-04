import { ObjectId } from "mongoose";
import User from "../models/userModel.js";

//returns list of all users based on search string
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

//returns data of a particular user
export const getUserDataService = async (userId: ObjectId | string) => {
  const userData = await User.findById(userId, {
    username: 1,
    email: 1,
    profileImage: 1,
  });
  return userData;
};

//toggle block status
export const blockUnblockUserService = async (userId: ObjectId | string) => {
  const user = await User.findById(userId);
  await User.updateOne({ _id: userId }, { isBlocked: !user?.isBlocked });
};

//delete a user
export const deleteUserService = async (userId: ObjectId | string) => {
  await User.deleteOne({ _id: userId });
};
