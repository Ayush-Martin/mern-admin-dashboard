import { Request, Response, NextFunction } from "express";
import {
  blockUnblockUserService,
  deleteUserService,
  getUserDataService,
  getUsersListService,
} from "../services/adminService.js";
import { StatusCodes } from "../utils/statusCode.js";
import { addUserService, updateUserService } from "../services/userService.js";
import errorCreator from "../utils/error.js";
import { hashPassword } from "../utils/password.js";
import { UserType } from "../types/userTypes.js";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search } = req.query;
    const userList = await getUsersListService(String(search));

    res.status(StatusCodes.OK).json({ success: true, userList });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;

    const userData = await getUserDataService(userId);

    res.status(StatusCodes.OK).json({ success: true, userData });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    const { username, email }: { username: string; email: string } = req.body;
    console.log(req.body);
    if (!username || !email) {
      errorCreator("all fields are required", StatusCodes.BAD_REQUEST);
      return;
    }
    console.log(1);
    const profileImage = req.file ? req.file.filename : "";

    const updatedUserData = await updateUserService(
      userId,
      username,
      email,
      profileImage
    );

    res.status(StatusCodes.OK).json({
      success: true,
      message: "profile updated",
      data: {
        username: updatedUserData?.username,
        email: updatedUserData?.email,
        profileImage: updatedUserData?.profileImage,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const blockUnblockUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    await blockUnblockUserService(userId);
    res.status(StatusCodes.OK).json({ success: true, message: "updated user" });
  } catch (err) {
    next(err);
  }
};

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

    res
      .status(StatusCodes.CREATED)
      .json({ success: true, message: "new user created" });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id;
    await deleteUserService(userId);

    res
      .status(StatusCodes.CREATED)
      .json({ success: true, message: "user deleted" });
  } catch (err) {}
};
