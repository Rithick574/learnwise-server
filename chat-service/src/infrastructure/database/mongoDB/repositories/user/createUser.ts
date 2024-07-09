import { ErrorResponse } from "@learnwise/common";
import { User } from "../../models/user";
import { UserEntity } from "../../../../../domain/entities";

export const createUser = async (
    data: UserEntity
): Promise<UserEntity | null> => {
    try {

        const newUser = await User.create(data);

        if (!newUser) {
            throw ErrorResponse.internalError("User creation failed!");
        }

        return newUser;

    } catch (error: any) {
        if (error instanceof ErrorResponse) {
            throw error;
          }
          throw ErrorResponse.internalError(
            error.message || "An unexpected error occurred"
          );
    }
}