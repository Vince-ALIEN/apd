import { sendEmail } from "../../../utils/email.js";

export default {
  async send(ctx) {
    const { name, email, phone, subject, message } = ctx.request.body;

    if (!name || !email || !message) {
      return ctx.badRequest("Les champs nom, email et message sont requis.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return ctx.badRequest("Email invalide.");
    }

    try {
      const existing = await strapi.entityService.findOne(
        "api::contact.contact",
        1
      );
      const data = { name, email, phone, subject, message };

      if (!existing) {
        await strapi.entityService.create("api::contact.contact", { data });
      } else {
        await strapi.entityService.update("api::contact.contact", 1, { data });
      }

      await sendEmail({
        to: "eglise.aules@gmail.com",
        subject: subject || "Nouveau message de contact",
        text: `
Nom : ${name}
Email : ${email}
Téléphone : ${phone || "—"}
Sujet : ${subject || "—"}

Message :
${message}
        `.trim(),
      });

      ctx.send({ success: true });
    } catch (err) {
      console.error("Erreur dans contact.send :", err);
      ctx.internalServerError("Erreur lors de l'envoi.");
    }
  },
};
