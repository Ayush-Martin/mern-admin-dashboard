import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../utils/statusCode.js";
import errorCreator from "../utils/error.js";
import { updateUserService } from "../services/userService.js";

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email }: { username: string; email: string } = req.body;

    if (!username || !email) {
      errorCreator("all fields are required", StatusCodes.BAD_REQUEST);
      return;
    }
    console.log(1);
    const profileImage = req.file ? req.file.filename : "";

    if (!req.userId) {
      console.log(req.userId);
      return;
    }
    console.log(2);
    const updatedUserData = await updateUserService(
      req.userId,
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
