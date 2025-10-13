export default ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: env("GMAIL_USER"),
          pass: env("GMAIL_APP_PASSWORD"),
        },
      },
      settings: {
        defaultFrom: `"Église Aules" <${env("GMAIL_USER")}>`,
        defaultReplyTo: env("GMAIL_USER"),
      },
    },
  },
});
