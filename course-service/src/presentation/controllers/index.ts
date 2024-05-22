import { IDependencies } from "@/application/interfaces/IDependencies";

//category
import {
    updateCategoryController,
    createCategoryController,
    getAllCategoriesController,
    getAvailableCategoriesController
} from "@/presentation/controllers/category";

//course
import {createEndpointUrl,getPlaybackId} from "@/presentation/controllers/course"

export const controllers = (dependencies: IDependencies) => {
    return {
        getAllCategories: getAllCategoriesController(dependencies),
        getAvailableCategories: getAvailableCategoriesController(dependencies),
        createCategory: createCategoryController(dependencies),
        updateCategory: updateCategoryController(dependencies),
        createUploadUrl:createEndpointUrl(dependencies),
        getPlaybackid:getPlaybackId(),
    }
};