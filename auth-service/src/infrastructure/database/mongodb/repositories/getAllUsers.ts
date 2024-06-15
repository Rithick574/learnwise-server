import { User } from "../models";
import { UserEntity } from "@/domain/entities";


export const getAllUser=async():Promise<UserEntity[]|false>=>{
    try {
        const allUser=await User.find({},{password:0});
        if(!allUser){
            return false;
        }
        return allUser;
    } catch (error:any) {
        throw new Error(error);
        
    }
}