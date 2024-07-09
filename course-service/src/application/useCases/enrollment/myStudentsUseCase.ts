import { IDependencies } from "../../../application/interfaces/IDependencies";


export const myStudentsUseCase = (dependencies : IDependencies)=>{
    const {repositories:{myStudents}} = dependencies;
    return {
        execute:async(id:string,filter: any, page: number, limit: number)=>{
            return await myStudents(id,filter, page, limit)
        }
    }
}
