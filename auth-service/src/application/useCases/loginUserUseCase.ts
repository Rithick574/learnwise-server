import { IDependencies } from "@/application/interfaces/IDependencies";
import { comparePassword } from "@/_lib/bcrypt";


export const loginUserUseCase = (dependencies: IDependencies) => {
    const {
        repositories: { findByEmail }
    } = dependencies;

    return {
        execute: async (email: string, password: string) => {
            try {

                const result = await findByEmail(email);
                
                if (!result) {
                    throw new Error("Email or password is incorrect!");
                }

                const match = await comparePassword(password, result.password!);

                if(!match){
                    throw new Error("Email or password is incorrect!");
                }

                return result;
           
            } catch (error: any){
                throw new Error(error.message);
            }
        }
    }
}