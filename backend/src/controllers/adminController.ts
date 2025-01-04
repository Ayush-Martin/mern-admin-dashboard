import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../utils/statusCode.js";
import errorCreator from "../utils/error.js";
import { hashPassword } from "../utils/password.js";
import { UserType } from "../types/userTypes.js";
import { successResponse } from "../utils/responseCreators.js";

//services
import {
  blockUnblockUserService,
  deleteUserService,
  getUserDataService,
  getUsersListService,
} from "../services/adminService.js";
import { addUserService, updateUserService } from "../services/userService.js";

//get all user data
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search } = req.query;
    const userList = await getUsersListService(String(search));
    res
      .status(StatusCodes.OK)
      .json(successResponse("users list returned", userList));
  } catch (err) {
    next(err);
  }
};

//get specific user data
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    const userData = await getUserDataService(userId);

    res
      .status(StatusCodes.OK)
      .json(successResponse("user data returned", userData));
  } catch (err) {
    next(err);
  }
};

//to update a user
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    const { username, email }: { username: string; email: string } = req.body;

    if (!username || !email) {
      errorCreator("all fields are required", StatusCodes.BAD_REQUEST);
      return;
    }

    //If profile image is not updated changed to empty to be handle in service
    const profileImage = req.file ? req.file.filename : "";

    const updatedUserData = await updateUserService(
      userId,
      username,
      email,
      profileImage
    );

    res.status(StatusCodes.OK).json(
      successResponse("userUpdated", {
        username: updatedUserData?.username,
        email: updatedUserData?.email,
        profileImage: updatedUserData?.profileImage,
      })
    );
  } catch (err) {
    next(err);
  }
};

//toggle block unblock user
export const blockUnblockUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    await blockUnblockUserService(userId);
    res
      .status(StatusCodes.OK)
      .json(successResponse("user block status updated"));
  } catch (err) {
    next(err);
  }
};

//add new user
export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password }: UserType = req.body;

    if (!username || !email || !password) {
      errorCreator("all fields are required", StatusCodes.BAD_REQUEST);
      return;
    }

    const hashedPassword = hashPassword(password);
    await addUserService(username, email, hashedPassword);

    res.status(StatusCodes.CREATED).json(successResponse("new user added"));
  } catch (err) {
    next(err);
  }
};

//delete a user
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    await deleteUserService(userId);

    res.status(StatusCodes.CREATED).json(successResponse("user is deleted"));
  } catch (err) {}
};
