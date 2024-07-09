import { sendChangePasswordMail } from "../../../infrastructure//services/sendChangePasswordMail";

export default async (data: { email: string; token: string }) => {
  try {
    await sendChangePasswordMail(data.email, data.token);
  } catch (error: any) {
    console.log(
      "request-password-changed-consumed mail send error: ",
      error?.message
    );
  }
};
