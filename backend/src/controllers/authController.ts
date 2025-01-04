import { Request, Response, NextFunction } from "express";
import { UserType } from "../types/userTypes.js";
import { StatusCodes } from "../utils/statusCode.js";
import errorCreator from "../utils/error.js";
import { compareHashPassword, hashPassword } from "../utils/password.js";
import { createAccessToken, createRefreshToken } from "../utils/jwt.js";

//services
import {
  addUserService,
  findUserByEmailService,
  findUserByIdService,
} from "../services/userService.js";

//models
import RefreshToken from "../models/refreshTokenModel.js";
import { successResponse } from "../utils/responseCreators.js";

//register user
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
    await addUserService(username, email, hashedPassword);

    res
      .status(StatusCodes.CREATED)
      .json(successResponse("register successfully"));
  } catch (err) {
    next(err);
  }
};

//login user
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

    if (user.isBlocked) {
      errorCreator("You are blocked by admin", StatusCodes.UNAUTHORIZED);
      return;
    }

    const accessToken = createAccessToken(
      user.id,
      user.username,
      user.email,
      user.profileImage,
      user.isAdmin
    );

    const refreshToken = await createRefreshToken(user.id);
    const validDays = Number(process.env.REFRESH_TOKEN_EXPIRATION_DAYS) || 7;

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: validDays * 24 * 60 * 60 * 1000,
      })
      .status(StatusCodes.OK)
      .json(successResponse("user is authenticated", accessToken));
  } catch (err) {
    next(err);
  }
};

export const signout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies.refreshToken as string | undefined;

    if (!refreshToken) return;

    await RefreshToken.deleteOne({ token: refreshToken });

    res.clearCookie("refreshToken", { httpOnly: true, path: "/" });
    res.status(200).json(successResponse("you are now logged out"));
  } catch (err) {
    next(err);
  }
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.userId) {
    errorCreator("user not found", StatusCodes.UNAUTHORIZED);
    return;
  }

  const user = await findUserByIdService(req?.userId);

  if (!user) {
    errorCreator("user not found", StatusCodes.UNAUTHORIZED);
    return;
  }

  const accessToken = createAccessToken(
    user.id,
    user.username,
    user.email,
    user.profileImage,
    user.isAdmin
  );

  res.status(StatusCodes.OK).json({
    success: true,
    message: "user is authenticated",
    data: accessToken,
  });
};
