import { IDependencies } from "../../application/interfaces/IDependencies";

export const findUserByIdUseCase = (dependencies: IDependencies) => {
    const {
        repositories: { findById }
    } = dependencies;

    return {
        execute: async (id: string) => {
            return await findById(id);
        }
    }
}