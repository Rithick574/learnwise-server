import { IDependencies } from "@/application/interfaces/IDependencies";



export const loginUserUseCase = (dependencies: IDependencies) => {
    const {
        repositories: { findByEmail }
    } = dependencies;

    return {
        execute: async (email: string, password: string) => {
            try {

                const result = await findByEmail(email);
                return result;
           
            } catch (error: any){
                throw new Error(error.message);
            }
        }
    }
}