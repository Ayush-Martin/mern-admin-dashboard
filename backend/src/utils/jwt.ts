import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import RefreshToken from "../models/refreshTokenModel.js";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "secret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "secret";
const ACCESS_TOKEN_EXPIRATION_MINUTES =
  Number(process.env.ACCESS_TOKEN_EXPIRATION_MINUTES) | 5;
const REFRESH_TOKEN_EXPIRATION_DAYS =
  Number(process.env.REFRESH_TOKEN_EXPIRATION_DAYS) | 7;

export const createAccessToken = (
  id: ObjectId,
  username: string,
  email: string,
  profileImage: string,
  isAdmin: boolean = false
) => {
  return jwt.sign(
    { id, sub: id, username, email, profileImage, isAdmin },
    ACCESS_TOKEN_SECRET,
    { expiresIn: `${ACCESS_TOKEN_EXPIRATION_MINUTES}m` }
  );
};

export const createRefreshToken = async (id: ObjectId) => {
  const token = jwt.sign({ id, sub: id }, REFRESH_TOKEN_SECRET, {
    expiresIn: `${REFRESH_TOKEN_EXPIRATION_DAYS}d`,
  });
  const newRefreshToken = new RefreshToken({ token });
  await newRefreshToken.save();
  return token;
};
