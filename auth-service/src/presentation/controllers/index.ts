import { IDependencies } from "@/application/interfaces/IDependencies";
import { signupController } from "./signup";



export const controllers = (dependencies: IDependencies) => {
    return{
        signup: signupController(dependencies),
    }
}