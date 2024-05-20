import { IDependencies } from "@/application/interfaces/IDependencies";
import { CategoryEntity } from "../../../domain/entities/categoryEntity";



export const createCategoryUseCase = (dependencies: IDependencies) => {

    const {
        repositories: { createCategory }
    } = dependencies;

    return {
        execute: async (data: CategoryEntity) => {
            return await createCategory(data);
        }
    }
};