import { Request, Response, NextFunction } from "express";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { signupValidation } from "@/_lib/validation";
import { hashPassword } from "@/_lib/bcrypt/hashpassword";
import { generateAccessToken, generateRefreshToken } from "@/_lib/jwt";

export const signupController = (dependencies: IDependencies) => {
  const {
    useCases: { createUserUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = signupValidation.validate(req.body);
      if (error) {
        throw new Error(error.message);
      }
      value.password = await hashPassword(value.password);

      const result = await createUserUseCase(dependencies).execute(value);

      if (!result) {
        throw new Error("User creation failed!");
      }

      const accessToken = generateAccessToken({
        _id: String(result?._id),
        email: result?.email!,
        role: result?.role!,
      });

      const refreshToken = generateRefreshToken({
        _id: String(result?._id),
        email: result?.email!,
        role: result?.role!,
      });

      res.cookie("access_token", accessToken, {
        httpOnly: true,
      });

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
      });

      res.status(200).json({
        success: true,
        data: result,
        message: "User created!",
      });
      
    } catch (error: any) {
      next(error);
    }
  };
};
