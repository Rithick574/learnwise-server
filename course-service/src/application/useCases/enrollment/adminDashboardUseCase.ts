import { IDependencies } from "@/application/interfaces/IDependencies";


export const adminDashboardUseCase = (dependencies : IDependencies)=>{
    const {repositories:{adminDashboard}} = dependencies;
    return {
        execute:async()=>{
            return await adminDashboard()
        }
    }
}
