import { Request, Response, NextFunction } from "express";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { signupValidation } from "@/_lib/validation";
import { hashPassword } from "@/_lib/bcrypt";
import { generateAccessToken, generateRefreshToken } from "@/_lib/jwt";
import { userCreatedProducer } from "@/infrastructure/kafka/producers";
import {ErrorResponse} from "@/_lib/common/error"

export const signupController = (dependencies: IDependencies) => {
  const {
    useCases: { createUserUseCase, findUserByEmailUseCase, verifyOtpUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    const userCredentials = req.body;
    console.log(
      "🚀 ~ file: signup.ts:15 ~ return ~ userCredentials:",
      userCredentials
    );

    //To check whether the user email is taken or not
    if (!userCredentials.otp) {
      try {
        const userExist: any = await findUserByEmailUseCase(dependencies).execute(
          userCredentials.email
        );
        console.log("🚀 ~ file: signup.ts:28 ~ return ~ userExist:", userExist)
        if (userExist) {
          return next(ErrorResponse.conflict("Email is already resgitered, try another email"))
        }
      } catch (error: any) {
        console.log(error, "Something went Wrong");
        next(error);
      }
    }

    //if user not present sent otp to user using nodemailer
    if (!userCredentials.otp) {
      try {
        await userCreatedProducer(req.body.email);
        return res.status(200).json({
          success: true,
          message: "otp sent successfully",
        });
      } catch (error: any) {
        console.log(error, "Something Went Wrong in OTP section");
        return res.json({
          success: false,
          message: "Something went wrong in otp",
        });
      }
    }

    // verify otp if otp is present
    if (userCredentials.otp) {
      try {
        const isOtpVerified = await verifyOtpUseCase(dependencies).execute(
          userCredentials.email,
          userCredentials.otp
        );
        if (!isOtpVerified) {
          const { email, ...restValues } = userCredentials;
          return res.status(401).json({
            user: restValues,
            success: false,
            message: "OTP is Invalid try another",
          });
        }
      } catch (error: any) {
        console.log(error, "Something went wrong in verifyOtp");
        return res.json({
          success: false,
          message: "Otp invalid",
        });
      }
    }

    //create a new user if otp is present
    if (userCredentials.otp) {
      try {
        const { error, value } = signupValidation.validate(req.body);
        if (error) {
          throw new Error(error.message);
        }
        value.password = await hashPassword(value.password);

        const userData = await createUserUseCase(dependencies).execute(value);

        if (!userData) {
          return res.json({
            success: false,
            message: "Something Went wrong try again in create user",
          });
        }

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
        console.log(error, "<<Something went wrong in user signup>>");
      }
    }
  };
};
