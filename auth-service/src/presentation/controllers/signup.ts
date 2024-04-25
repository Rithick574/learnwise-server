import { Request, Response, NextFunction } from "express";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { signupValidation } from "@/_lib/validation";
import { hashPassword } from "@/_lib/bcrypt";
import { generateAccessToken, generateRefreshToken } from "@/_lib/jwt";
import { userCreatedProducer } from "@/infrastructure/kafka/producers";

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

      const userData = await createUserUseCase(dependencies).execute(value);

      if (!userData) {
        throw new Error("User creation failed!");
      }

      await userCreatedProducer(userData)

      const accessToken = generateAccessToken({
        _id: String(userData?._id),
        email: userData?.email!,
        role: userData?.role!,
      });

      const refreshToken = generateRefreshToken({
        _id: String(userData?._id),
        email: userData?.email!,
        role: userData?.role!,
      });

      res.cookie("access_token", accessToken, {
        httpOnly: true,
      });

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
      });

      res.status(200).json({
        success: true,
        data: userData,
        message: "User created!",
      });
      
    } catch (error: any) {
      next(error);
    }
  };
};
