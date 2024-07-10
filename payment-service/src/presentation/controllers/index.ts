import { IDependencies } from "../../application/interfaces/IDependencies";
import { createCheckoutSessionController } from "./createCheckoutSession";
import { savePaymentController } from "./savePayment";
import {getSubscriptionDataController } from "./getSubscriptionData"
import {subscriptionWebhook} from "./subscriptionWebhook"
import {createSubscriptionSessionController} from "./createSubscriptionSession"
import {getSubscribedInstructors} from "./getSubscribedInstructors"


export const controllers = (dependencies: IDependencies) => {
    return {
        createCheckoutSession: createCheckoutSessionController(dependencies),
        savePayment: savePaymentController(dependencies),
        getsubscriptionData:getSubscriptionDataController(dependencies),
        webhook:subscriptionWebhook(dependencies),
        createSessionSubscription:createSubscriptionSessionController(dependencies),
        getStudentsSubscription:getSubscribedInstructors(dependencies)
    }
}