import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USERNAME, // ex: eglise.aules@gmail.com
    pass: process.env.SMTP_PASSWORD, // mot de passe d'application
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
  return await transporter.send({
    from: process.env.GMAIL_USER,
    to,
    subject,
    html,
  });
}
