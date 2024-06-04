import { IDependencies } from "@/application/interfaces/IDependencies";
import { createCheckoutSessionController } from "./createCheckoutSession";
import { savePaymentController } from "./savePayment";


export const controllers = (dependencies: IDependencies) => {
    return {
        createCheckoutSession: createCheckoutSessionController(dependencies),
        savePayment: savePaymentController(dependencies),
    }
}