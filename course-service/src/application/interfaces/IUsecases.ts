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
  ISalesReportUseCase,
  IGetEnrollmentsForInstructorOverTimeUseCase,
  IGetTopCoursesForInstructorUseCase,
  IGetTotalStudentsForInstructorUseCase,
  IGetTotalCoursesForInstructorUseCase,
  IPaymentListUseCase,
  IEditCourseUseCase,
  IEnrollmentProgressUseCase,
  IGetEnrollmentByUserIdUseCase
} from "../../domain/useCases";
import { IDependencies } from "./IDependencies";
import { ICreateExamUseCase, IGetExamUseCase, ISubmitExamUseCase } from "../../domain/useCases/exams";

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
  getEnrollmentsForInstructorOverTimeUseCase:(dependencies:IDependencies)=>IGetEnrollmentsForInstructorOverTimeUseCase;
  getTopCoursesForInstructorUseCase:(dependencies:IDependencies)=> IGetTopCoursesForInstructorUseCase;
  getTotalStudentsForInstructorUseCase:(dependencies:IDependencies)=> IGetTotalStudentsForInstructorUseCase;
  getTotalCoursesForInstructorUseCase:(dependencies:IDependencies)=> IGetTotalCoursesForInstructorUseCase;
  paymentListUseCase:(dependencies:IDependencies)=>IPaymentListUseCase;
  editCourseUseCase:(dependencies:IDependencies)=>IEditCourseUseCase;
  createExamUseCase:(dependencies:IDependencies) => ICreateExamUseCase;
  getExamUseCase:(dependencies:IDependencies) => IGetExamUseCase;
  submitExamUseCase:(dependencies:IDependencies)=> ISubmitExamUseCase;
  enrollmentProgressUseCase:(dependencies:IDependencies)=>IEnrollmentProgressUseCase;
  getEnrollmentByUserIdUseCase:(dependencies:IDependencies)=>IGetEnrollmentByUserIdUseCase;
}
