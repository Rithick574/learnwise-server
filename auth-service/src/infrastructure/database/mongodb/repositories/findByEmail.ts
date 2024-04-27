import { User } from "@/infrastructure/database/mongodb/models";
import { UserEntity } from "@/domain/entities";

export const findByEmail = async (
    email: string
): Promise<UserEntity | null> => {
    console.log("🚀 ~ file: findByEmail.ts:7 ~ email:", email)
    try {

        const existingUser = await User.findOne({
            email: email
        });
        console.log("🚀 ~ file: findByEmail.ts:13 ~ existingUser:", existingUser)

        return existingUser;

    } catch (error: any) {
        throw new Error(error?.message);
    }
}