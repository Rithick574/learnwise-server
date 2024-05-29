import { jwtMiddleware } from "@/_lib/common";
import { verifyAdmin } from "@/_lib/common/middlewares";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { controllers } from "@/presentation/controllers";
import { Router } from "express";



export const routes = (dependencies: IDependencies) => {
    const router = Router();
    const {createCategory,getAllCategories,getAvailableCategories,updateCategory,createUploadUrl,getPlaybackid,createCourse,getAllCourses,getPublishedCourses} = controllers(dependencies)

    // category
    router.route('/')
    .get(jwtMiddleware,verifyAdmin,getAllCategories)
    .post(jwtMiddleware,verifyAdmin,createCategory)
    .put(jwtMiddleware,verifyAdmin,updateCategory)
    router.route("/category/available")
        .get(getAvailableCategories);

    //mux    
    router.route("/create-upload-url").post(createUploadUrl)    
    router.route('/get-playback-id/:uploadId').get(getPlaybackid)

    //course
    router.route("/create-course").post(createCourse);
    router.route('/course').get(getAllCourses).put()
    router.route('/publishedcourses').get(getPublishedCourses)
    //edit course
    // router.route('/course/:id').put()

    return router;
  };
