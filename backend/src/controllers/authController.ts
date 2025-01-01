import { Request, Response, NextFunction } from "express";
import { UserType } from "../types/userTypes.js";
import {
  addUserService,
  findUserByEmailService,
} from "../services/userService.js";
import { StatusCodes } from "../utils/statusCode.js";
import errorCreator from "../utils/error.js";
import { compareHashPassword, hashPassword } from "../utils/password.js";
import { createAccessToken } from "../utils/jwt.js";

export const signup = async (
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
    await addUserService(username, email, password);

    res
      .status(StatusCodes.CREATED)
      .json({ success: true, message: "new user created" });
  } catch (err) {
    next(err);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password }: UserType = req.body;

    if (!email || !password) {
      errorCreator("all fields are required", StatusCodes.BAD_REQUEST);
      return;
    }

    const user = await findUserByEmailService(email);

    if (!user) {
      errorCreator("user not found", StatusCodes.UNAUTHORIZED);
      return;
    }

    const validPassword = compareHashPassword(password, user?.password);

    if (!validPassword) {
      errorCreator("invalid password", StatusCodes.UNAUTHORIZED);
      return;
    }

    const token = createAccessToken(user.id, user.email, user.isAdmin);

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "user is authenticated", data: token });
  } catch (err) {
    next(err);
  }
};
