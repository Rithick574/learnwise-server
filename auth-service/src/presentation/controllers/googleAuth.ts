import { Request, Response, NextFunction } from "express";
import { generateRefreshToken, generateAccessToken } from "../../_lib/jwt";
import { generateRandomString } from "../../_lib/util/generateRandomString";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { UserEntity } from "../../domain/entities";
import { userCreatedProducer } from "../../infrastructure/kafka/producers";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuthController = (dependencies: IDependencies) => {
  const {
    useCases: { createUserUseCase, findUserByEmailUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { credential } = req.body;

      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      if (!payload || !payload.email) {
        return res.status(400).json({
          success: false,
          message:
            "Google token is invalid or does not contain an email address.",
        });
      }

      const { email, given_name } = payload;

      const exist = await findUserByEmailUseCase(dependencies).execute(email);

      if (exist) {
        const accessToken = generateAccessToken({
          _id: String(exist?._id),
          email: exist?.email!,
          role: exist?.role!,
        });

        const refreshToken = generateRefreshToken({
          _id: String(exist?._id),
          email: exist?.email!,
          role: exist?.role!,
        });

        res.cookie("access_token", accessToken, {
          httpOnly: true,
        });

        res.cookie("refresh_token", refreshToken, {
          httpOnly: true,
        });

        return res.status(200).json({
          success: true,
          data: exist,
          message: "User Google login!",
        });
      }

      const result = await createUserUseCase(dependencies).execute({
        email: email,
        isVerified: true,
        firstName: given_name,
        lastName: "p",
        password: `${generateRandomString()}`,
      } as UserEntity);

      
      if (!result) {
        throw new Error("User creation failed!");
      }

      //produce-user-creation-message
      await userCreatedProducer(result, "USER_SERVICE_TOPIC");


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
        message: "User Google signup!",
      });
    } catch (error: any) {
      next(error);
    }
  };
};
