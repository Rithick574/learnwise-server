import nodemailer from "nodemailer";


export const generateForgotPasswordMail = async (
    data: {
        email: string,
        url: string
    }
) => {

    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
        secure: true,
      });

      const mailData = {
        from: process.env.MAIL_USER,
        to: data.email,
        subject: "Forgot password",
        html:   `<h2>Use this button to change your password </h2>
                 <h4>This link will expire after 15 minutes</h4>
                 <a href="${data.url}"><button>Change password<button></a>`,
      };

      transporter.sendMail(mailData, (error, info) => {
        return new Promise((resolve, reject) => {
          if (error) {
            console.log("Error occured while sending the OTP", error);
            reject(false);
          } else {
            resolve(true);
          }
        });
      });
}