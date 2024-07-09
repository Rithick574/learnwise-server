import {generateInstructorConfirmationMail} from "../../_lib/nodemailer"

export const instructorNotification = async (
    email: string,
) => {
try {
    generateInstructorConfirmationMail({email})
} catch (error:any) {
    console.log("🚀 ~ file: instructorNotification.ts:7 ~ error:", error)
}
}