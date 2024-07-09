import { IDependencies } from "../../application/interfaces/IDependencies";
import { UserEntity } from "../../domain/entities";

export const createUserUseCase = (dependencies: IDependencies) => {
    const {
        repositories: { create }
    } = dependencies;

    return {
        execute: async (data: UserEntity) => {
            try {

                return await create(data);
                
            } catch (error: any) {
                throw new Error(error.message || "User creation failed");
            }
        }
    }
}