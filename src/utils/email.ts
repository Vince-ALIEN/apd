import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendEmail = async ({ to, subject, text, html, replyTo }) => {
  return transporter.sendMail({
    from: `"Église Aules" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    text,
    html,
    replyTo,
  });
};
