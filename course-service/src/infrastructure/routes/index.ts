import { jwtMiddleware } from "../../_lib/common";
import { verifyAdmin, verifyInstructor } from "../../_lib/common/middlewares";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controllers } from "../../presentation/controllers";
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
    myCourse,
    getEnrollment,
    createReview,
    getReview,
    myStucents,
    adminDash,
    salesreport,
    instructorDash,
    payments,
    editCourses,
    createExam,
    getEexam,
    submitExam,
    progress,
    getEnrollmentByUserId
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
  router.route("/course").get(getAllCourses).patch(changeCourseStatus);
  router.route("/publishedcourses").get(getPublishedCourses);
  router.route("/mycourse/:id").get(myCourse);
  router.route("/course/update/:courseId").put(editCourses);

  //exam
  router.route("/exam/submit").post(submitExam);
  router.route("/exam/:courseId").post(createExam).get(getEexam);


  //enrollment
  router.route("/enrollment").get(getEnrollment).put(progress);
  router.route("/mystudents/:id").get(myStucents);
  router.route("/admindashboard").get(adminDash);
  router.route("/enrollment/salesreport").get(salesreport);
  router.route("/instructor/dashboard/:instructorRef").get(instructorDash);
  router.route("/enrollment/:userId").get(getEnrollmentByUserId)

  //review
  router.route("/review").post(createReview);
  router.route("/review/:id").get(getReview);

  //payments
  router.route("/payments").get(payments);

  return router;
};
