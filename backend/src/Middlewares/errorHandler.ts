import { NextFunction, Request, response, Response } from "express";
import { CustomError } from "../types/errorTypes.js";
import { StatusCodes } from "../utils/statusCode.js";

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = Number(err.status) || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = (err.message as string) || "An unexpected error occurred";
  console.log(err);
  res.status(status).json({
    success: false,
    message: message,
    error: true,
  });
};

export default errorHandler;
