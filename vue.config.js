module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:54972",
        changeOrigin: true
      }
    }
  },

  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false
    }
  },

  transpileDependencies: ["quasar"]
};
