const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: "https://localhost:7264",
  },
  pages: {
    index: {
      entry: "src/main.js",
      title: "臺中清潔車車輛管理系統",
    },
  },
});
