import {instructorNotification} from "../../../infrastructure/services/instructorNotification"

export default async (data: { email: string}) => {
    await instructorNotification(data.email)
}