import { IDependencies } from "@/application/interfaces/IDependencies";
import { signupController } from "./signup";
import {loginController} from "./login"
import {getUserController} from "./getUser"
import {logoutController} from "./logout"
import {googleAuthController} from "./googleAuth"
import {forgotPasswordController} from "./forgotPassword"



export const controllers = (dependencies: IDependencies) => {
    return{
        signup: signupController(dependencies),
        login: loginController(dependencies),
        getUser: getUserController(dependencies),
        logout: logoutController(dependencies),
        googleAuth: googleAuthController(dependencies),
        forgotPassword: forgotPasswordController(dependencies)
    }
}