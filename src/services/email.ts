import nodemailer from "nodemailer";

export async function send({ to, subject, html }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  return transporter.sendMail({
    from: process.env.SMTP_USERNAME,
    to,
    subject,
    html,
  });
}
