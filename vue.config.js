const webpack = require("webpack");

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:54972",
        changeOrigin: true
      }
    }
  },

  chainWebpack: config => {
    config.module.rules.delete("vue");
    config.module
      .rule("vue")
      .test(/\.vue$/)
      .use("vue-loader")
      .loader("vue-loader");
  },

  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 25000,
        maxSize: 250000
      }
    },
    devtool: "none",
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      })
    ]
  },
  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false
    }
  },

  transpileDependencies: ["quasar"]
};
