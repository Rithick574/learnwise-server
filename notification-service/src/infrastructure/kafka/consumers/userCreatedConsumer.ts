import { sendVerificationMail } from "../../../infrastructure/services";

export default async (data: string) => {
  try {
    await sendVerificationMail(data);
  } catch (error: any) {
    console.log("user-created-consumed mail send error: ", error?.message);
  }
};
