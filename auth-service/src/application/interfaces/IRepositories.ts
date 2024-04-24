import { UserEntity } from "@/domain/entities";


export interface IRepositories{
    create: (data: UserEntity) => Promise<UserEntity | null>;
}