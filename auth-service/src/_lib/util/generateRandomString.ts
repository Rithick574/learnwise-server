import crypto from "crypto";

export const generateRandomString = () => {
    return crypto.randomBytes(64).toString('hex');
}