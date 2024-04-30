import nodemailer from "nodemailer";

export const generateForgotPasswordMail = async (
    data: {
        email: string,
        url: string
    }
) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 465, 
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
        secure: true,
    });

    const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .email-container {
                background-color: #ffffff;
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                box-shadow: 0 0 5px rgba(0,0,0,0.1);
            }
            .button {
                background-color: #056b10;
                color: #ffffff;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                display: inline-block;
            }
            h2, h4 {
                color: #333333;
            }
            .resetPass{
              color:#ffff;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <h2>Reset Your Password</h2>
            <p>If you requested a password reset, use the button below to proceed. If you did not make this request, please ignore this email.</p>
            <p><a href="${data.url}" class="button"><span class="resetPass">Reset Password</span></a></p>
            <p>This link will expire in 15 minutes. If you did not request a password reset, no further action is required.</p>
        </div>
    </body>
    </html>`;

    const mailData = {
        from: process.env.MAIL_USER,
        to: data.email,
        subject: "Password Reset Request",
        html: emailHTML,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailData, (error, info) => {
            if (error) {
                console.log("Error occurred while sending the password reset email", error);
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
};
