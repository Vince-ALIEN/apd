import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // ex: eglise.aules@gmail.com
    pass: process.env.GMAIL_APP_PASSWORD, // mot de passe d'application
  },
});

export async function send({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  return await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to,
    subject,
    html,
  });
}
