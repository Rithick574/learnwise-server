import { IDependencies } from "@/application/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";
import mongoose from 'mongoose';

export const createChatController = (dependencies: IDependencies) => {
    const {
        useCases: { createChatUseCase }
    } = dependencies;

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;

            // Convert participant IDs to ObjectId
            if (data.participants && Array.isArray(data.participants)) {
                data.participants = data.participants.map((id: string) => {
                    try {
                        return new mongoose.Types.ObjectId(id);
                    } catch (err) {
                        throw new Error(`Invalid ObjectId: ${id}`);
                    }
                });
            } else {
                throw new Error('Participants must be an array');
            }

            const result = await createChatUseCase(dependencies).execute(data);

            if (!result) {
                throw new Error("Chat creation failed");
            }

            res.status(200).json({
                success: true,
                data: result,
                message: 'Chat created successfully!'
            });
        } catch (error) {
            next(error);
        }
    }
}
