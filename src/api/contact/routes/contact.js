export default {
  routes: [
    {
      method: "POST",
      path: "/contact/send",
      handler: "contact.send",
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};
