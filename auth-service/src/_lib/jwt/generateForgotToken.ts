import jwt from "jsonwebtoken";

export const generateForgotPasswordToken = (
    payload: {
        email: string,
    }
) => {
    const secret = process.env.FORGOT_PASSWORD_TOKEN_SECRET;
    if (!secret) {
        throw new Error("token secret is not defined!");
    }

    try {
        return jwt.sign(
            payload,
            secret,
            { expiresIn: '15m' }
        );
    } catch (error) {
        throw new Error("Failed to generate refresh token.");
    }
};
