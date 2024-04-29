import { Request, Response, NextFunction } from "express";
import ErrorResponse from "./errorResponse";

const errorHandler = (
 err: any,
 req: Request,
 res: Response,
 next: NextFunction
) => {
 return res.status(err.status).json({
  success: false,
  status: err.status,
  message: err.message,
 });
};

export default errorHandler;
