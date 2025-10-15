import nodemailer from "nodemailer";

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}) {
  // Vérification des champs obligatoires
  if (!to || !subject || (!text && !html)) {
    throw new Error("Champs requis manquants pour l'envoi de l'email.");
  }

  // Création du transporteur SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp.resend.com",
    port: 587,
    secure: false, // TLS automatique sur le port 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: true, // Sécurise la connexion
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || "eglise.aules@gmail.com",
      to,
      subject,
      text,
      html,
    });
    console.log("Email envoyé avec succès à", to);
  } catch (error) {
    console.error("Échec de l'envoi de l'email :", error);
    throw error;
  }
}
