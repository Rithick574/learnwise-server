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
  courseManagementController
} from "@/presentation/controllers/course";

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
    changeCourseStatus:courseManagementController(dependencies)
  };
};
