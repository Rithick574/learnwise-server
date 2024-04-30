import { hashPassword } from "@/_lib/bcrypt";
import { ErrorResponse } from "@/_lib/common/error";
import { verifyForgetPasswordToken } from "@/_lib/jwt";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { Request, Response, NextFunction } from "express";

export const updatePasswordController = (dependencies:IDependencies) => {
const {useCases:{findUserByEmailUseCase,updateUserPasswordUseCase}} = dependencies;

return async(req:Request,res:Response,next:NextFunction)=>{
    try {
        let { param, password } = req.body;
        const email = await String(verifyForgetPasswordToken(param))
        console.log("🚀 ~ file: updatePassword.ts:13 ~ returnasync ~ email:", email)
        if(!email || !password){
            return next(ErrorResponse.badRequest("Email and password are required fields"))
        }

        const userExist= await findUserByEmailUseCase(dependencies).execute(email)
        console.log("🚀 ~ file: updatePassword.ts:19 ~ returnasync ~ userExist:", userExist)
        if (!userExist) {
           return next(ErrorResponse.notFound("User not found"))
          }

          const hashNewPassword = await hashPassword(password)
          console.log("🚀 ~ file: updatePassword.ts:26 ~ returnasync ~ hashNewPassword:", hashNewPassword)

          const updatePassword = await updateUserPasswordUseCase(dependencies).execute({email,password})
          console.log("🚀 ~ file: updatePassword.ts:29 ~ returnasync ~ updatePassword:", updatePassword)

          if(updatePassword){
            return res.status(200).json({
                success: true,
                data: userExist,
                message: "Password updated successfully",
              });
          }else{
            return next(ErrorResponse.internalError("Failed to update password"))
          }

    } catch (error:any) {
        console.error("Error updating password:", error);
        return next(ErrorResponse.internalError("Error updating password"))
    }
}

}