const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = {
  async send({ to, subject, html }) {
    return await resend.emails.send({
      from: process.env.SMTP_FROM || "eglise.aules@gmail.com",
      to,
      subject,
      html,
    });
  },
};
