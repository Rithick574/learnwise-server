import { Router } from "express";
import { controllers } from "@/presentation/controllers";
import { IDependencies } from "@/application/interfaces/IDependencies";
import {jwtMiddleware} from '@learnwise/common'

export const routes = (dependencies: IDependencies) => {

const {createCheckoutSession} =controllers(dependencies)

    const router = Router();

    router.route("/create-checkout-session").post(createCheckoutSession);

    return router;
}
