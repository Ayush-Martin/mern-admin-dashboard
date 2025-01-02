import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import RefreshToken from "../models/refreshTokenModel.js";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

export const createAccessToken = (
  id: ObjectId,
  username: string,
  email: string,
  profilePhoto: string,
  isAdmin: boolean = false
) => {
  return jwt.sign(
    { id, sub: id, username, email, profilePhoto, isAdmin },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "10m" }
  );
};

export const createRefreshToken = async (id: ObjectId) => {
  const token = jwt.sign({ id, sub: id }, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  const newRefreshToken = new RefreshToken({ token });
  await newRefreshToken.save();
  return token;
};
