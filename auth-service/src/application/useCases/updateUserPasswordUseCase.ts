import { IDependencies } from "../interfaces/IDependencies";

export const updateUserPasswordUseCase = (dependencies:IDependencies)=>{
    const {repositories:{updateUserPassword}} =dependencies;
    return {
        execute:async(data: { email: string; password: string }) => {
            return await updateUserPassword({
                email: data.email,
                password: data.password,
              });
        }
    }
}