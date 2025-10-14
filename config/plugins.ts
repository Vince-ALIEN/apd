export default ({ env }) => ({
  email: {
    config: {
      provider: "sendmail",
      providerOptions: {
        from: env("GMAIL_USER"),
        response_email: env("GMAIL_USER"),
      },
    },
  },

  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: { resource_type: "auto" },
        delete: {},
      },
    },
  },
});
