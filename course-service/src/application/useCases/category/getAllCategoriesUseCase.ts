import { IDependencies } from "../../interfaces/IDependencies";

export const getAllCategoriesUseCase = (dependencies: IDependencies) => {

    const {
        repositories: { getAllCategories }
    } = dependencies;

    return {
        execute: async (filter: any, page: number, limit: number) => {
            return await getAllCategories(filter, page, limit);
        }
    }
};