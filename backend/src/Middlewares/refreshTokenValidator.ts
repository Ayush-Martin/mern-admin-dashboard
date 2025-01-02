import { NextFunction, Request, Response } from "express";
import errorCreator from "../utils/error.js";
import { StatusCodes } from "../utils/statusCode.js";
import RefreshToken from "../models/refreshTokenModel.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

export const refreshTokenValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies.refreshToken as string | undefined;

    if (!refreshToken) {
      console.log(1);
      errorCreator("No refresh token provided", StatusCodes.UNAUTHORIZED);
      return;
    }

    const validRefreshToken = await RefreshToken.findOne({
      token: refreshToken,
    });

    if (!validRefreshToken) {
      console.log(2);
      errorCreator("Invalid refresh token", StatusCodes.UNAUTHORIZED);
      return;
    }

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, payload) => {
      try {
        if (err) {
          req.cookies.remove();
          errorCreator("invalid refresh token", StatusCodes.UNAUTHORIZED);
          return;
        }
        console.log(payload?.sub);
        req.userId = payload?.sub as string;
        next();
      } catch (err) {
        next(err);
      }
    });
  } catch (err) {
    next(err);
  }
};
