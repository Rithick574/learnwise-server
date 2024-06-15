import { UserEntity } from "@/domain/entities";

export interface IGetAllUsers {
    execute(): Promise<UserEntity[] | boolean>;
}