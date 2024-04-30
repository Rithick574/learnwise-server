import jwt from "jsonwebtoken";

export const verifyForgetPasswordToken = (token: string) => {
    return jwt.verify(
      token,
      String(process.env.FORGOT_PASSWORD_TOKEN_SECRET),
      (error, decoded) => {
        if (error) {
          throw new Error(error?.message);
        } else {
          console.log("🚀 ~ file: verifyForgotPasswordToken.ts:13 ~ verifyForgetPasswordToken ~ decoded:", decoded)
          return decoded;
        }
      }
    );
  };
  