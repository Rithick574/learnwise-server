import { IDependencies } from "@/application/interfaces/IDependencies";

//category
import {
    updateCategoryController,
    createCategoryController,
    getAllCategoriesController,
    getAvailableCategoriesController
} from "@/presentation/controllers/category";


export const controllers = (dependencies: IDependencies) => {
    return {
        getAllCategories: getAllCategoriesController(dependencies),
        getAvailableCategories: getAvailableCategoriesController(dependencies),
        createCategory: createCategoryController(dependencies),
        updateCategory: updateCategoryController(dependencies),
    }
};