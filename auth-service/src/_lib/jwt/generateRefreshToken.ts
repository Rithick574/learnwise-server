import jwt from "jsonwebtoken";

export const generateRefreshToken = (
    payload: {
        _id: string,
        email: string,
        role: string
    }
) => {
    const secret = process.env.REFRESH_TOKEN_SECRET;
    if (!secret) {
        throw new Error("Refresh token secret is not defined!");
    }

    try {
        return jwt.sign(
            payload,
            secret,
            { expiresIn: '30d' }
        );
    } catch (error) {
        throw new Error("Failed to generate refresh token.");
    }
};
