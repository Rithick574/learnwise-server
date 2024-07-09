import { IDependencies } from "../../application/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";

export const createMessageController = (dependecies: IDependencies) => {
  const {
    useCases: { createMessageUseCase },
  } = dependecies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { messageData, chatData } = req.body;
      const result = await createMessageUseCase(dependecies).execute(
        messageData,
        chatData
      );

      if (!result) {
        throw new Error("Message Creation Failed!");
      }
      res.status(200).json({
        success: true,
        data: result,
        message: "message created",
      });
    } catch (error: any) {
      next(error);
    }
  };
};
