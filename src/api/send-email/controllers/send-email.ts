import { send } from "../../../services/email";

export default {
  async send(ctx) {
    const { name, email, phone, subject, message } = ctx.request.body;

    // Validation des champs requis
    if (!name || !email || !message) {
      return ctx.badRequest("Champs requis manquants.");
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return ctx.badRequest("Adresse email invalide.");
    }

    try {
      // Envoi de l'email via Nodemailer
      await send({
        to: process.env.CONTACT_RECEIVER || process.env.SMTP_USERNAME,
        subject: subject || `Message de ${name}`,
        html: `
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Téléphone :</strong> ${phone || "Non renseigné"}</p>
          <p><strong>Message :</strong><br/>${message}</p>
        `,
      });

      // Log narratif
      strapi.log.info(
        `🎬 Email envoyé à ${process.env.CONTACT_RECEIVER || process.env.SMTP_USERNAME} depuis ${name} <${email}>`
      );

      // Réponse au frontend
      ctx.send({ success: true });
    } catch (err) {
      strapi.log.error("❌ Erreur lors de l'envoi de l'email :", err);
      ctx.internalServerError("Échec de l’envoi du message.");
    }
  },
};
