import express,{ Router } from "express";
import { controllers } from "../../presentation/controllers";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const routes = (dependencies: IDependencies) => {

const {createCheckoutSession,savePayment,getsubscriptionData,webhook,createSessionSubscription,getStudentsSubscription} =controllers(dependencies)

    const router = Router();

    //payment
    router.route("/create-checkout-session").post(createCheckoutSession);
    router.route("/savePayment").post(savePayment);

    //subscription
    router.route("/subscription/:userId/:instructorId").get(getsubscriptionData);
    router.post("/webhook", express.raw({ type: 'application/json' }), webhook);
    router.route("/subscription/create-subscription-checkout-session").post(createSessionSubscription)
    router.route('/subscriptions/:userEmail').get(getStudentsSubscription)

    return router;
}
