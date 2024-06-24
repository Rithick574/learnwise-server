import { ChatEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const createChatUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { createChat },
  } = dependencies;

  const execute = async (data: ChatEntity) => {
    return await createChat(data);
  };

  return {
    execute,
  };
};
