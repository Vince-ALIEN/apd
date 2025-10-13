import { sendEmail } from "../utils/sendEmail";
import type { Strapi } from "@strapi/strapi";

export default {
  async create(ctx: Strapi.Context) {
    try {
      const { name, email, phone, subject, message } = ctx.request.body;

      // Validation des champs requis
      if (!name || !email || !message) {
        return ctx.badRequest({
          success: false,
          message: "Nom, email et message requis.",
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return ctx.badRequest({ success: false, message: "Email invalide." });
      }

      if (name.length > 100 || email.length > 100) {
        return ctx.badRequest({
          success: false,
          message: "Nom ou email trop long (max 100 caractères).",
        });
      }

      if (message.length > 5000) {
        return ctx.badRequest({
          success: false,
          message: "Message trop long (max 5000 caractères).",
        });
      }

      const timestamp = new Date().toLocaleString("fr-FR", {
        timeZone: "Europe/Paris",
      });

      const emailSubject = subject
        ? `${subject} - Message de ${name}`
        : `Nouveau message de contact - ${name}`;

      const textContent = `
Nom : ${name}
Email : ${email}
${phone ? `Téléphone : ${phone}` : ""}
${subject ? `Sujet : ${subject}` : ""}
Message :
${message}
Date : ${timestamp}
      `.trim();

      const htmlContent = `
        <h2>📬 Nouveau message de contact</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
        ${phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : ""}
        ${subject ? `<p><strong>Sujet :</strong> ${subject}</p>` : ""}
        <hr>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p style="font-size: 12px; color: #666;">
          Ce message a été envoyé depuis le formulaire de contact.<br>
          Date : ${timestamp}
        </p>
      `;

      // Envoi à l'administrateur
      await sendEmail({
        to: process.env.GMAIL_USER!,
        subject: emailSubject,
        text: textContent,
        html: htmlContent,
        replyTo: email,
      });

      // Envoi d’un accusé de réception à l’expéditeur
      await sendEmail({
        to: email,
        subject: "📬 Accusé de réception - Église Aules",
        text: `Bonjour ${name},\n\nNous avons bien reçu votre message. Nous vous répondrons dès que possible.\n\nMerci pour votre confiance.\n\n— Église Aules`,
        html: `
          <p>Bonjour ${name},</p>
          <p>Nous avons bien reçu votre message :</p>
          <blockquote style="border-left: 4px solid #ccc; padding-left: 1em; color: #555;">
            ${message.replace(/\n/g, "<br>")}
          </blockquote>
          <p>Nous vous répondrons dès que possible.</p>
          <p style="margin-top: 2em;">Merci pour votre confiance,<br><strong>— Église Aules</strong></p>
        `,
      });

      // Enregistrement en base
      const entry = await strapi.entityService.create("api::contact.contact", {
        data: { name, email, phone, subject, message, isRead: false },
      });

      return ctx.send({
        success: true,
        message: "Message enregistré et envoyé avec succès.",
        data: entry,
      });
    } catch (error) {
      strapi.log.error("❌ Erreur lors de la création du contact :", error);
      return ctx.internalServerError({
        success: false,
        message: "Une erreur est survenue lors de l'envoi du message.",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  },
};
