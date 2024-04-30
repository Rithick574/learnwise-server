import { UserEntity } from "../entities";

export interface IUpdateUserPasswordUseCase {
  execute(data: {
    email: string;
    password: string;
  }): Promise<UserEntity | null>;
}
