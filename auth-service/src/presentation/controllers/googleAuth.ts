import { Request, Response, NextFunction } from "express";
import { generateRefreshToken,generateAccessToken } from "@/_lib/jwt";
import { generateRandomString } from "@/_lib/util/generateRandomString";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { UserEntity } from "@/domain/entities";
import { userCreatedProducer } from "@/infrastructure/kafka/producers";

export const googleAuthController = (dependencies: IDependencies) => {

    const {
        useCases: { createUserUseCase, findUserByEmailUseCase }
    } = dependencies;

    return async (req: Request, res: Response, next: NextFunction) => {

        try {

            const body: {
                given_name: string,
                family_name: string,
                email: string
            } = req.body;

            const exist = await findUserByEmailUseCase(dependencies).execute(body.email);

            if(exist){
                
                const accessToken = generateAccessToken({
                    _id: String(exist?._id),
                    email: exist?.email!,
                    role: exist?.role!
                });
    
                const refreshToken = generateRefreshToken({
                    _id: String(exist?._id),
                    email: exist?.email!,
                    role: exist?.role!
                });

                res.cookie("access_token", accessToken, {
                    httpOnly: true
                });
    
                res.cookie("refresh_token", refreshToken, {
                    httpOnly: true
                });
    
                return res.status(200).json({
                    success: true,
                    data: {},
                    message: "User Google login!"
                });
                
            }

            const result = await createUserUseCase(dependencies).execute({
                email: body.email,
                isVerified: true,
                firstName: body.given_name,
                lastName: body.family_name,
                username: `${body.given_name}_${body.family_name}${new Date().toTimeString().substring(0,2)}`,
                password: `${generateRandomString()}`
            } as UserEntity);

            if (!result) {
                throw new Error("User creation failed!");
            }

            const accessToken = generateAccessToken({
                _id: String(result?._id),
                email: result?.email!,
                role: result?.role!
            });

            const refreshToken = generateRefreshToken({
                _id: String(result?._id),
                email: result?.email!,
                role: result?.role!
            });

            //produce-user-creation-message
            await userCreatedProducer(result);
            
            res.cookie("access_token", accessToken, {
                httpOnly: true
            });

            res.cookie("refresh_token", refreshToken, {
                httpOnly: true
            });

            res.status(200).json({
                success: true,
                data: {},
                message: "User Google signup!"
            });

        } catch (error) {
            next(error);
        }
    }
}