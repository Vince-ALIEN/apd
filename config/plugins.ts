export default ({ env }) => ({
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {
          resource_type: "auto",
        },
        delete: {},
      },
    },
  },

  email: {
    config: {
      provider: "strapi-provider-email-nodemailer", // ✅ nom du provider correct
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
        defaultFrom: env("GMAIL_USER"),
        defaultReplyTo: env("GMAIL_USER"),
      },
    },
  },
});
