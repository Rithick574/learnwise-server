import {instructorNotification} from "@/infrastructure/services/instructorNotification"

export default async (data: { email: string}) => {
    console.log("🚀 ~ file: instructorEmailconfirmation.ts:2 ~ email:", data.email)
    await instructorNotification(data.email)
}