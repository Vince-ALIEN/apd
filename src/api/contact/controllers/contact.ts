import { sendEmail } from "../utils/email";

export default {
  async create(ctx) {
    try {
      const { name, email, phone, subject, message } = ctx.request.body;

      if (!name || !email || !message) {
        return ctx.badRequest({
          success: false,
          message: "Le nom, l'email et le message sont requis",
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return ctx.badRequest({ success: false, message: "Email invalide" });
      }

      if (name.length > 100 || email.length > 100) {
        return ctx.badRequest({
          success: false,
          message: "Les champs nom et email sont trop longs",
        });
      }

      if (message.length > 5000) {
        return ctx.badRequest({
          success: false,
          message: "Le message est trop long (maximum 5000 caractères)",
        });
      }

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
Date : ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}
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
          Date : ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}
        </p>
      `;

      await sendEmail({
        to: process.env.GMAIL_USER,
        subject: emailSubject,
        text: textContent,
        html: htmlContent,
        replyTo: email,
      });

      const entry = await strapi.entityService.create("api::contact.contact", {
        data: { name, email, phone, subject, message },
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
