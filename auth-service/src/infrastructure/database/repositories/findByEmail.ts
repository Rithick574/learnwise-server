import { User } from "@/infrastructure/database/models";
import { UserEntity } from "@/domain/entities";

export const findByEmail = async (
    email: string
): Promise<UserEntity | null> => {
    try {

        const existingUser = await User.findOne({
            email: email
        });

        return existingUser;

    } catch (error: any) {
        throw new Error(error?.message);
    }
}