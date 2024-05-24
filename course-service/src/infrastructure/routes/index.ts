import { jwtMiddleware } from "@/_lib/common";
import { verifyAdmin } from "@/_lib/common/middlewares";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { controllers } from "@/presentation/controllers";
import { Router } from "express";



export const routes = (dependencies: IDependencies) => {
    const router = Router();
    const {createCategory,getAllCategories,getAvailableCategories,updateCategory,createUploadUrl,getPlaybackid} = controllers(dependencies)

    router.route('/')
    // .get(jwtMiddleware,verifyAdmin,getAllCategories)
    .get(getAllCategories)
    .post(jwtMiddleware,verifyAdmin,createCategory)
    .put(jwtMiddleware,verifyAdmin,updateCategory)
    router.route("/category/available")
        .get(getAvailableCategories);
    router.route("/create-upload-url").post(createUploadUrl)    
    router.route('/get-playback-id/:uploadId').get(getPlaybackid)
    return router;
  };