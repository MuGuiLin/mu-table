const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",

  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    port: 8080,
    // open: true,
    compress: true,

    proxy: {
      "/api": {
        target: "https:www.xxx.com",
        secure: true,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
});
