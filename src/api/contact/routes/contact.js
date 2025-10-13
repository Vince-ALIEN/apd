export default {
  routes: [
    {
      method: "POST",
      path: "/contact/send",
      handler: "api::contact.contact.send",
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};
