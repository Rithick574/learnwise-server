import { IDependencies } from "../../application/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../_lib/common/error";
import { generateForgotPasswordToken } from "../../_lib/jwt";
import { requestForgotPassword } from "../../infrastructure/kafka/producers";

export const forgotPasswordController = (dependencies: IDependencies) => {
  const {
    useCases: { findUserByEmailUseCase },
  } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      if (!email) {
        return next(ErrorResponse.unauthorized("no email found"));
      }

      const existUser = await findUserByEmailUseCase(dependencies).execute(
        email
      );

      if (!existUser) {
        return next(
          ErrorResponse.unauthorized(
            "We couldn't find an account with that email address"
          )
        );
      }

      const token = generateForgotPasswordToken({
        email: email,
      });

      //produce message to notification
      await requestForgotPassword({ email, token });

      res.status(200).json({
        success: true,
        data: {},
        message: "Mail produced!",
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: "forgot password failed",
      });
    }
  };
};
