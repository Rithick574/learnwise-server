import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../error";
import { findUserById } from "@/infrastructure/database/mongoDB/repositories";

export const verifyInstructor = async (req: Request, res: Response, next: NextFunction) => {
    
    if (!req.user) {
        return next(ErrorResponse.unauthorized("Token not found,verify admin"));
    }
        
    const user = await findUserById(req.user._id);
    
    if (!user) {
        return next(ErrorResponse.unauthorized("Token not found,verify admin"));
    }

    if (user.role !== "instructor") {
        return next(ErrorResponse.unauthorized("Access denied, require instructor"));
    }
    next();
}