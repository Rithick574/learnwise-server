import {
  ICreateCategoryUseCase,
  IGetAllCategoriesUseCase,
  IGetAvailableCategoriesUseCase,
  IUpdateCategoryUseCase,
  ICreateCourseUseCase,
  IGetAllCoursesUseCase,
  IGetPublishedCoursesUseCase,
  IGetCourseUseCase,
  IUpdateCourseStatusUseCase,
  IGetInstructorCourseUseCase,
  IPublishCoursesUseCase,
  IGetEnrollmentUseCase,
  ICreateReviewUseCase,
  IGetReviewUseCase,
  IMyStudentsUseCase,
  IAdminDashboardUseCase,
  IGetTopCourseUseCase,
  ISalesReportUseCase
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
  updateCourseStatusUseCase: (
    dependencies: IDependencies
  ) => IUpdateCourseStatusUseCase;
  getInstructorCourseUseCase: (
    dependencies: IDependencies
  ) => IGetInstructorCourseUseCase;
  PublishCoursesUseCase: (
    dependencies: IDependencies
  ) => IPublishCoursesUseCase;
  getEnrollmentUseCase: (dependencies: IDependencies) => IGetEnrollmentUseCase;
  createReviewUseCase:(dependencies:IDependencies) => ICreateReviewUseCase;
  getReviewUseCase: (dependencies:IDependencies) => IGetReviewUseCase;
  myStudentsUseCase:(dependencies:IDependencies)=> IMyStudentsUseCase;
  adminDashboardUseCase:(dependencies:IDependencies)=>IAdminDashboardUseCase;
  getTopCourseUseCase:(dependencies:IDependencies)=> IGetTopCourseUseCase;
  salesReportUseCase:(dependencies:IDependencies)=> ISalesReportUseCase;
}
