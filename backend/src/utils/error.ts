import { StatusCodes } from "./statusCode.js";
import { CustomError } from "../types/errorTypes.js";

const errorCreator = (
  message: string,
  status: number = StatusCodes.INTERNAL_SERVER_ERROR
): never => {
  console.log(message, status);
  const err: CustomError = new Error(message) as CustomError;
  err.status = status;
  throw err;
};

export default errorCreator;
