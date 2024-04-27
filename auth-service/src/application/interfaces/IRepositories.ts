import { UserEntity } from "@/domain/entities";


export interface IRepositories{
    create: (data: UserEntity) => Promise<UserEntity | null>;
    findByEmail: (email: string) => Promise<UserEntity | null>;
    findById: (id: string) => Promise<UserEntity | null>;
    verifyOtp:(email:string,otp:string)=>Promise<Boolean | null>
}