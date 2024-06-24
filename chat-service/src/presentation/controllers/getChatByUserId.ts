import { IDependencies } from "@/application/interfaces/IDependencies";
import { NextFunction, Request, Response } from "express";

export const getChatByUserId = (dependencies: IDependencies) => {
  const {
    useCases: { findChatByUserIdUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      console.log(userId);

      const result = await findChatByUserIdUseCase(dependencies).execute(
        userId
      );
      if (!result) {
        throw new Error("Can't find any chat by this user");
      }
      res.status(201).json({
        success: true,
        data: result,
        message: "chats found",
      });
    } catch (error) {}
  };
};
