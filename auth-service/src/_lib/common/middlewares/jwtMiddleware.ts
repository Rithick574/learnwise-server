import jwt from 'jsonwebtoken';
import { generateAccessToken } from "@/_lib/jwt";
import { Request, Response, NextFunction } from "express";

interface UserPayload {
    _id: string;
    email: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}

export const jwtMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { access_token, refresh_token } = req.cookies;

        if (!access_token && !refresh_token) {
            console.log("first if");
            return next();
        }

        let user;

        if (access_token) {
            console.log("second if");
            
            user = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET!) as UserPayload;
        }

        if (!user && refresh_token) {
            console.log("third if");
            
            user = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET!) as UserPayload;
            console.log("🚀 ~ file: jwtMiddleware.ts:40 ~ jwtMiddleware ~ user:", user)

            if (user) {
                console.log("fourth if");
                
                const newAccessToken = generateAccessToken(user);
                res.cookie("access_token", newAccessToken, {
                    httpOnly: true,
                });
            }
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in JWT middleware:", error);
        next(error); 
    }
};
