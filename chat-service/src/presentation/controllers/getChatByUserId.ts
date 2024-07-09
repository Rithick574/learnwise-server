import { IDependencies } from "../../application/interfaces/IDependencies";
import { ErrorResponse } from "@learnwise/common";
import { NextFunction, Request, Response } from "express";

export const getChatByUserId = (dependencies: IDependencies) => {
  const {
    useCases: { findChatByUserIdUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {      
      const userId = req.params.id;
      const result = await findChatByUserIdUseCase(dependencies).execute(
        userId
      );
      
      if (!result) {
        return next(ErrorResponse.badRequest("Can't find any chat by this user"))
      }
      res.status(201).json({
        success: true,
        data: result,
        message: "chats found",
      });
    } catch (error) {
      console.log("🚀 ~ file: getChatByUserId.ts:28 ~ return ~ error:", error)
      next(error)
    }
  };
};
