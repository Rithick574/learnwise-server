import { Router } from "express";
import { controllers } from "@/presentation/controllers";
import { IDependencies } from "@/application/interfaces/IDependencies";
import {jwtMiddleware} from '@learnwise/common'

export const routes = (dependencies: IDependencies) => {

const {createCheckoutSession,savePayment} =controllers(dependencies)

    const router = Router();

    router.route("/create-checkout-session").post(createCheckoutSession);

    router.route("/savePayment").post(savePayment);

    return router;
}
