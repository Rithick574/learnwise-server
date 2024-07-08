import { Request, Response, NextFunction } from "express";
import ErrorResponse from "./errorResponse";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorResponse) {
    return res.status(err.status).json({
      success: false,
      status: err.status,
      message: err.message,
    });
  }


  return res.status(400).json({
    success: false,
    status: 400,
    message: "Internal Server Error",
  });
};

export default errorHandler;