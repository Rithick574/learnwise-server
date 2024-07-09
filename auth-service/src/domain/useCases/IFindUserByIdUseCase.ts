import { UserEntity } from "../../domain/entities";

export interface IFindUserByIdUseCase {
    execute(id: string): Promise<UserEntity | null>;
}