import { Otp } from "../models";
import { IOtp } from "../../../../domain/entities";

export const updateOTP = async (
    data: {
        email: string,
        otp: string
    }
): Promise<IOtp | null> => {
    try {

        const result = await Otp.updateOne(
            { email: data.email }, 
            { $set: { otp: data.otp } },
            { upsert: true, new: true }
        );

        if (!result) {
            throw new Error("OTP update/creation failed!");
        }


        const updatedUser = await Otp.findOne({ email: data.email });

        return updatedUser;

    } catch (error: any) {
        throw new Error(error?.message);
    }
}