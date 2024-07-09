import { UserEntity } from "../../domain/entities";

export interface IFindUserByEmailUseCase {
    execute(email: string): Promise<UserEntity | null>;
}