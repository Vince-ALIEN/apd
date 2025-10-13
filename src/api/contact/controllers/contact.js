import { sendEmail } from "../../../utils/email.js";

export default {
  async send(ctx) {
    const { name, email, message } = ctx.request.body;

    if (!name || !email || !message) {
      return ctx.badRequest("Tous les champs sont requis.");
    }

    // Validation simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return ctx.badRequest("Email invalide.");
    }

    try {
      // Enregistrement dans le singleton
      await strapi.entityService.update("api::contact.contact", 1, {
        data: { name, email, message },
      });

      // Envoi de l'email
      await sendEmail({
        to: "eglise.aules@gmail.com",
        subject: "Nouveau message de contact",
        text: `Nom: ${name}\nEmail: ${email}\nMessage:\n${message}`,
      });

      ctx.send({ success: true });
    } catch (err) {
      ctx.internalServerError("Erreur lors de l'envoi", err);
    }
  },
};
