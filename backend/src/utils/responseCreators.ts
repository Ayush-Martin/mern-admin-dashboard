import { ApiResponse } from "../types/responseTypes";

export const successResponse = <T>(
  message: string,
  data?: T
): ApiResponse<T> => {
  return { success: true, message, data };
};

export const errorResponse = (error: string): ApiResponse<null> => {
  return { success: false, error };
};
