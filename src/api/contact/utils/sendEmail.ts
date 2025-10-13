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

type EmailPayload = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
};

export const sendEmail = async ({
  to,
  subject,
  text,
  html,
  replyTo,
}: EmailPayload): Promise<void> => {
  try {
    await transporter.sendMail({
      from: `"Église Aules" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      text,
      html,
      replyTo,
    });
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi de l'email :", error);
    throw new Error("Échec de l'envoi de l'email.");
  }
};
