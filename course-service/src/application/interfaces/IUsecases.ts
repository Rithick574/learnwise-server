import {ICreateCategoryUseCase,IGetAllCategoriesUseCase,IGetAvailableCategoriesUseCase,IUpdateCategoryUseCase} from "@/domain/useCases"
import { IDependencies } from "./IDependencies";

export interface IUseCases {
    getAllCategoriesUseCase: (dependencies: IDependencies) => IGetAllCategoriesUseCase;
    getAvailableCategoriesUseCase: (dependencies: IDependencies) => IGetAvailableCategoriesUseCase;
    createCategoryUseCase: (dependencies: IDependencies) => ICreateCategoryUseCase;
    updateCategoryUseCase: (dependencies: IDependencies) => IUpdateCategoryUseCase;
}