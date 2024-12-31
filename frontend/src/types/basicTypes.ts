export interface responseType {
  success: boolean;
  message: string;
  data?: unknown;
  error?: boolean;
}

export interface errorResponse {
  message: string;
  errorCode?: number;
}
