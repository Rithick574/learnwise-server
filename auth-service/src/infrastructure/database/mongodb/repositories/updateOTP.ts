import { Otp } from "@/infrastructure//database/mongodb/models";
import { IOtp } from "@/domain/entities";

export const updateOTP = async (
    data: {
        email: string,
        otp: string
    }
): Promise<IOtp | null> => {
    try {

        const updatedUser = await Otp.create(data)

        if (!updatedUser) {
            throw new Error("User otp updation failed!");
        }

        return updatedUser;

    } catch (error: any) {
        throw new Error(error?.message);
    }
}