export default {
  routes: [
    {
      method: "POST",
      path: "/contacts",
      handler: "api::contact.contact.create",
      config: {
        auth: false, // ou true selon ton besoin
        policies: [],
        middlewares: [],
      },
    },
  ],
};
