// For Vue + Electron + Typescript, https://hdevstudy.tistory.com/193


const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true
    }
  }
});
