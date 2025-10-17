import { resend } from "../../../utils/resend";
import { Context } from "koa";

export default {
  async send(ctx: Context) {
    const { name, email, phone, subject, message } = ctx.request.body;

    if (!name || !email || !message) {
      return ctx.badRequest("Champs requis manquants.");
    }

    try {
      await resend.emails.send({
        from: process.env.SMTP_FROM || "eglise.aules@gmail.com",
        to: process.env.CONTACT_RECEIVER || "eglise.aules@gmail.com",
        subject: subject || `Message de ${name}`,
        html: `
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Téléphone :</strong> ${phone || "Non renseigné"}</p>
          <p><strong>Message :</strong><br/>${message}</p>
        `,
      });

      ctx.send({ success: true });
    } catch (err) {
      strapi.log.error("Erreur Resend :", err);
      ctx.internalServerError("Échec de l’envoi du message.");
    }
  },
};
