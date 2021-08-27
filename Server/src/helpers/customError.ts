enum ErrorCode {
  InternalServerError = "INTERNAL_SERVER_ERROR",
  UnAuthorized = "UNAUTHORIZED",
  ValidationError = "VALIDATION_ERROR",
  Forbidden = "FORBIDDEN",
  LoginFailed = "LOGIN_FAILED",
  NotFound = "NOT_FOUND",
}

export class CustomError extends Error {
  constructor(
    public statusCode: number,
    public code: ErrorCode,
    message: string
  ) {
    super(message);
  }
}

export const SERVER_ERR = new CustomError(
  500,
  ErrorCode.InternalServerError,
  "Error in Server while handling Request"
);
export const UNAUTHORIZED_ERR = new CustomError(
  401,
  ErrorCode.UnAuthorized,
  "You are not allowed to perform this action"
);
export const LOGIN_FAIL_ERR = new CustomError(
  401,
  ErrorCode.LoginFailed,
  "Invalid credentials"
);
export const NOT_FOUND_ERR = new CustomError(
  404,
  ErrorCode.NotFound,
  "Resource Not Found"
);
export const VALIDATION_ERROR = (message: string): CustomError =>
  new CustomError(422, ErrorCode.ValidationError, message);
