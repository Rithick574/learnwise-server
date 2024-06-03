import { IDependencies } from "@/application/interfaces/IDependencies";
import { createCheckoutSessionController } from "./createCheckoutSession";


export const controllers = (dependencies: IDependencies) => {
    return {
        createCheckoutSession: createCheckoutSessionController(dependencies)
    }
}