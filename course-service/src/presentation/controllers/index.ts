import { IDependencies } from "@/application/interfaces/IDependencies";

//category
import {
  updateCategoryController,
  createCategoryController,
  getAllCategoriesController,
  getAvailableCategoriesController,
} from "@/presentation/controllers/category";

//course
import {
  createCourseController,
  createEndpointUrl,
  getPlaybackId,
  getAllCoursesController,
  getPublishedCoursesController,
  updateCourseController,
  getCourseController,
  courseManagementController,
  updateCourseStatusController,
  instructorCourseController,
} from "@/presentation/controllers/course";

//enrollment
import {
  getEnrolledController,
  myStudentsController,
  adminDashboard,
  salesReportController,
  instructorDashboardController,
} from "@/presentation/controllers/enrollment";

//review
import {
  createReviewController,
  getReviewsController,
} from "@/presentation/controllers/reviews";

export const controllers = (dependencies: IDependencies) => {
  return {
    getAllCategories: getAllCategoriesController(dependencies),
    getAvailableCategories: getAvailableCategoriesController(dependencies),
    createCategory: createCategoryController(dependencies),
    updateCategory: updateCategoryController(dependencies),
    createUploadUrl: createEndpointUrl(dependencies),
    getPlaybackid: getPlaybackId(),
    createCourse: createCourseController(dependencies),
    getAllCourses: getAllCoursesController(dependencies),
    getPublishedCourses: getPublishedCoursesController(dependencies),
    getCourse: getCourseController(dependencies),
    updateCourse: updateCourseController(dependencies),
    changeCourseStatus: courseManagementController(dependencies),
    updateCourseStatus: updateCourseStatusController(dependencies),
    myCourse: instructorCourseController(dependencies),
    getEnrollment: getEnrolledController(dependencies),
    createReview: createReviewController(dependencies),
    getReview: getReviewsController(dependencies),
    myStucents: myStudentsController(dependencies),
    adminDash: adminDashboard(dependencies),
    salesreport: salesReportController(dependencies),
    instructorDash: instructorDashboardController(dependencies),
  };
};
