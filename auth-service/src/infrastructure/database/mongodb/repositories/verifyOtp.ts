import {Otp} from "../models/otpSchema"

export const verifyOtp = async (email: string, otp:string): Promise<boolean> => {
    try {
        const verified = await Otp.findOne({email:email,otp:otp}) 
        if(!verified) return false
        return true
    } catch (error) {
        console.log(error, "Something Went wrong")
        return false
    }
}
