import { IDependencies } from "@/application/interfaces/IDependencies";


export const myStudentsUseCase = (dependencies : IDependencies)=>{
    const {repositories:{myStudents}} = dependencies;
    return {
        execute:async(id:string)=>{
            return await myStudents(id)
        }
    }
}
