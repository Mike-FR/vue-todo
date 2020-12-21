module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: { port: 8081 },

  pluginOptions: {
    i18n: {
      locale: "fr",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true
    }
  }
};
