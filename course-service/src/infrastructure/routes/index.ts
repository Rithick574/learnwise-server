import { jwtMiddleware } from "@/_lib/common";
import { verifyAdmin, verifyInstructor } from "@/_lib/common/middlewares";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { controllers } from "@/presentation/controllers";
import { Router } from "express";

export const routes = (dependencies: IDependencies) => {
  const router = Router();
  const {
    createCategory,
    getAllCategories,
    getAvailableCategories,
    updateCategory,
    createUploadUrl,
    getPlaybackid,
    createCourse,
    getAllCourses,
    getPublishedCourses,
    getCourse,
    updateCourse,
    changeCourseStatus,
    updateCourseStatus,
    myCourse
  } = controllers(dependencies);

  // category
  router
    .route("/")
    .get(jwtMiddleware, verifyAdmin, getAllCategories)
    .post(jwtMiddleware, verifyAdmin, createCategory)
    .put(jwtMiddleware, verifyAdmin, updateCategory);
  router.route("/category/available").get(getAvailableCategories);

  //mux
  router.route("/create-upload-url").post(createUploadUrl);
  router.route("/get-playback-id/:uploadId").get(getPlaybackid);

  //course
  router
    .route("/create-course")
    .post(jwtMiddleware, verifyInstructor, createCourse);
    router
    .route("/course/:id")
    .get(getCourse)
    .put(jwtMiddleware, verifyInstructor, updateCourse)
    .patch(updateCourseStatus);
    router.route("/course").get(getAllCourses).patch(changeCourseStatus)
    router.route("/publishedcourses").get(getPublishedCourses);
    router.route("/mycourse/:id").get(myCourse)
  return router;
};
