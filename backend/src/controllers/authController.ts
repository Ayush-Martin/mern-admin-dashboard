import { Request, Response, NextFunction } from "express";
import { UserType } from "../types/userTypes.js";
import { addUserService } from "../services/userService.js";
import { StatusCodes } from "../utils/statusCode.js";
import errorCreator from "../utils/error.js";
import { hashPassword } from "../utils/password.js";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password }: UserType = req.body;

    if (!username || !email || !password) {
      errorCreator("all fields are required", StatusCodes.BAD_REQUEST);
    }

    const hashedPassword = hashPassword(password);
    await addUserService({ username, email, password: hashedPassword });

    res
      .status(StatusCodes.CREATED)
      .json({ success: true, message: "new user created" });
  } catch (err) {
    next(err);
  }
};
