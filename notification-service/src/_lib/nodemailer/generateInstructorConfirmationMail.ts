import nodemailer from "nodemailer";

export const generateInstructorConfirmationMail = async (data: {
  email: string;
}) => {
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
            h2, h4 {
                color: #333333;
            }
        </style>
    </head>
    <body>
    <div class="email-container">
    <h2>Congratulations on Becoming an Instructor!</h2>
    <p>Dear Aspiring Instructor,</p>
    <p>We are pleased to inform you that your application to become an instructor has been accepted. Welcome to the LearnWise team! We are excited to have you with us, and we look forward to your contributions to our learning community.</p>
    <p>Should you have any questions or require further information, please do not hesitate to contact us.</p>
    <p>Best regards,</p>
    <p>The LearnWise Team</p>
</div>
    </body>
    </html>`;

  const mailData = {
    from: process.env.MAIL_USER,
    to: data.email,
    subject: "Instructor Application Accepted",
    html: emailHTML,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (error, info) => {
      if (error) {
        console.log(
          "Error occurred while sending the password reset email",
          error
        );
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};
