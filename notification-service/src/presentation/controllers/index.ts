import { IDependencies } from "@/application/interfaces/IDependencies";
import { sendVerificationMailController } from "./sendVerificationMail";

export const controllers = (dependencies: IDependencies) => {
    return {
        sendVerificationMail: sendVerificationMailController(dependencies)
    }
};