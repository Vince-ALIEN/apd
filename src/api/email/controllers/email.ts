import { send } from "../../../services/email";

export default {
  async send(ctx) {
    const { name, email, phone, subject, message } = ctx.request.body;

    if (!name || !email || !message) {
      return ctx.badRequest("Champs requis manquants.");
    }

    try {
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

      strapi.log.info(
        `📨 Email envoyé à ${process.env.CONTACT_RECEIVER} depuis ${name} <${email}>`
      );
      ctx.send({ success: true });
    } catch (err) {
      strapi.log.error("❌ Erreur Gmail :", err);
      ctx.internalServerError("Échec de l’envoi du message.");
    }
  },
};
