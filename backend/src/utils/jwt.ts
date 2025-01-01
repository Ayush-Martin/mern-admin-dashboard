import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

export const createAccessToken = (
  id: ObjectId,
  email: string,
  isAdmin: boolean = false
) => {
  return jwt.sign({ id, email, isAdmin }, ACCESS_TOKEN_SECRET);
};


