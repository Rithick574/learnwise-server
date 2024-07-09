import { IDependencies } from "../../../application/interfaces/IDependencies";


export const getTopCourseUseCase = (dependencies : IDependencies)=>{
    const {repositories:{getTopCourse}} = dependencies;
    return {
        execute:async()=>{
            return await getTopCourse()
        }
    }
}
