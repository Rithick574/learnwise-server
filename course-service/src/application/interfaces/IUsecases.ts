import {
  ICreateCategoryUseCase,
  IGetAllCategoriesUseCase,
  IGetAvailableCategoriesUseCase,
  IUpdateCategoryUseCase,
  ICreateCourseUseCase,
  IGetAllCoursesUseCase,
  IGetPublishedCoursesUseCase,
  IGetCourseUseCase,
} from "@/domain/useCases";
import { IDependencies } from "./IDependencies";

export interface IUseCases {
  getAllCategoriesUseCase: (
    dependencies: IDependencies
  ) => IGetAllCategoriesUseCase;
  getAvailableCategoriesUseCase: (
    dependencies: IDependencies
  ) => IGetAvailableCategoriesUseCase;
  createCategoryUseCase: (
    dependencies: IDependencies
  ) => ICreateCategoryUseCase;
  updateCategoryUseCase: (
    dependencies: IDependencies
  ) => IUpdateCategoryUseCase;
  createCourseUseCase: (dependencies: IDependencies) => ICreateCourseUseCase;
  getAllCoursesUseCase: (dependencies: IDependencies) => IGetAllCoursesUseCase;
  getPublishedCoursesUseCase: (
    dependencies: IDependencies
  ) => IGetPublishedCoursesUseCase;
  getCourseUseCase: (dependencies: IDependencies) => IGetCourseUseCase;
}
