import { IDependencies } from "../interfaces/IDependencies"


export const findGroupByUserId=(dapendencies:IDependencies)=>{
    const {
        repositories:{findGroupByUserId}
    }=dapendencies

    return{
        execute:async(userId:string)=>{
            return await findGroupByUserId(userId)
        }
    }
}