import { controllers } from "@/presentation/controllers";
import { Router } from "express";
import { jwtMiddleware } from "@/_lib/common";
import { IDependencies } from "@/application/interfaces/IDependencies";


export const notificationRoutes = (dependencies: IDependencies) => {

    const {
        sendVerificationMail
    } = controllers(dependencies);

    const router = Router();

    router.route("/email-verification")
        .get(jwtMiddleware, sendVerificationMail);

   
    return router;
}
