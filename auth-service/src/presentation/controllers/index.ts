import { IDependencies } from "@/application/interfaces/IDependencies";
import { signupController } from "./signup";
import {loginController} from "./login"
import {getUserController} from "./getUser"


export const controllers = (dependencies: IDependencies) => {
    return{
        signup: signupController(dependencies),
        login: loginController(dependencies),
        getUser: getUserController(dependencies),
    }
}