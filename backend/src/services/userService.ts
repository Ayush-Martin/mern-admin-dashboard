import User from "../models/userModel.js";
import { UserType } from "../types/userTypes.js";
import errorCreator from "../utils/error.js";
import { StatusCodes } from "../utils/statusCode.js";

export const addUserService = async ({
  username,
  email,
  password,
}: UserType) => {
  const userExist = await User.findOne({ $or: [{ username }, { email }] });

  if (userExist) {
    errorCreator("username or email exist", StatusCodes.CONFLICT);
  }

  const newUser = new User({ username, email, password });

  await newUser.save();
};
