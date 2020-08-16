const Dotenv = require("dotenv-webpack"); //APIなどの環境変数をローカルに保存、process.env.OOOで取得可能

module.exports = {
  publicPath: "./",
  outputDir: "www",
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    plugins: [new Dotenv()],
  },
};
