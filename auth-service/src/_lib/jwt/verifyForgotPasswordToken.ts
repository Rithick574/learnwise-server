import jwt from "jsonwebtoken";

export const verifyForgetPasswordToken = (token: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            String(process.env.FORGOT_PASSWORD_TOKEN_SECRET),
            (error, decoded) => {
                if (error) {
                    reject(new Error(error.message));
                } else {
                    resolve(decoded);
                }
            }
        );
    });
};
