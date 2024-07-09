import { IDependencies } from "../../application/interfaces/IDependencies";
import { sendVerificationMail } from "../../infrastructure/services";
import { Request, Response, NextFunction } from "express";

export const sendVerificationMailController = (dependencies: IDependencies) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new Error("Email is required!");
      }

      await sendVerificationMail(req.user.email);

      res.status(200).json({
        success: true,
        data: {},
        message: "Email send!",
      });
    } catch (error) {
      next(error);
    }
  };
};
