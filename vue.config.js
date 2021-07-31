module.exports = {
  devServer: {
    proxy: "https://espace.nush.app"
  },
  lintOnSave: false,
  transpileDependencies: [
    "vuetify",
  ],
  chainWebpack: (config) => {
    config.module
      .rule("ts")
      .use("ts-loader")
      .loader("ts-loader");
  },
};
