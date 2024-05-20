import { IDependencies } from "../../interfaces/IDependencies";

export const getAllCategoriesUseCase = (dependencies: IDependencies) => {

    const {
        repositories: { getAllCategories }
    } = dependencies;

    return {
        execute: async () => {
            return await getAllCategories();
        }
    }
};