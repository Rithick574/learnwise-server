import {generateForgotPasswordMail} from "../../_lib/nodemailer"

export const sendChangePasswordMail = async (
    email: string,
    token: string
) => {
    try {
        await generateForgotPasswordMail({
            email: email,
            url: `http://localhost:5173/auth/change-password?token=${token}`
        });
    } catch (error: any) {
        console.log("🚀 ~ file: sendChangePasswordMail.ts:15 ~ error:", error)
    }

}