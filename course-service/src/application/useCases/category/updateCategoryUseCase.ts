import { CategoryEntity } from "@/domain/entities/categoryEntity";
import { IDependencies } from "../../interfaces/IDependencies";

export const updateCategoryUseCase = (dependencies: IDependencies) => {

    const {
        repositories: { updateCategory }
    } = dependencies;

    return {
        execute: async (data: CategoryEntity) => {
            return await updateCategory(data);
        }
    }
};