import { NextFunction, Request, response, Response } from "express";
import { CustomError } from "../types/errorTypes.js";
import { StatusCodes } from "../utils/statusCode.js";
import { errorResponse } from "../utils/responseCreators.js";

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = Number(err.status) || StatusCodes.INTERNAL_SERVER_ERROR;
  const error = err.message || "An unexpected error occurred";
  console.log(err);
  res.status(status).json(errorResponse(error));
};

export default errorHandler;
