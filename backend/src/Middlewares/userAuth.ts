import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../utils/statusCode.js";
import errorCreator from "../utils/error.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

export const checkUserAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      errorCreator("Access token not found", StatusCodes.UNAUTHORIZED);
      return;
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, payload) => {
      try {
        if (err) {
          errorCreator("Invalid token", StatusCodes.UNAUTHORIZED);
        }

        let userData = await User.findById(payload?.sub);

        if (!userData) {
          return;
        }

        if (userData?.isBlocked) {
          errorCreator("you are blocked by admin", StatusCodes.UNAUTHORIZED);
        }

        req.userId = String(userData?._id);
        next();
      } catch (err) {
        next(err);
      }
    });
  } catch (err) {
    next(err);
  }
};
