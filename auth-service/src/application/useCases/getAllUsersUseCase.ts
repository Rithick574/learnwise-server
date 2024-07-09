import { IDependencies } from "../../application/interfaces/IDependencies";

export const getAllUsersUseCase = (dependencies: IDependencies) => {
    const {
        repositories: { getAllUser }
    } = dependencies;

    return {
        execute: async () => {
            return await getAllUser();
        }
    }
}