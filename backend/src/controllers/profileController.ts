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

    const profileImage = req.file ? req.file.filename : "";

    if (!req.userId) return;

    await updateUserService(req.userId, username, email, profileImage);

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "profile updated" });
  } catch (err) {
    next(err);
  }
};
