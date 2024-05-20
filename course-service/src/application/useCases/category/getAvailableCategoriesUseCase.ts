import { IDependencies } from "../../interfaces/IDependencies";

export const getAvailableCategoriesUseCase = (dependencies: IDependencies) => {

    const {
        repositories: { getAvailableCategories }
    } = dependencies;

    return {
        execute: async () => {
            return await getAvailableCategories();
        }
    }
};