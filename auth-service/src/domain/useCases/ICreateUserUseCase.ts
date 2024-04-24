import { UserEntity } from "@/domain/entities";

export interface ICreateUserUseCase {
    execute(data: UserEntity): Promise<UserEntity | null>;
}