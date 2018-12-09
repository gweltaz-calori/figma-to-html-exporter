const path = require("path");

module.exports = {
  entryPoint: path.resolve(__dirname, "./src/index.js"),
  bundleName: "webgl.js",

  srcDirectory: path.resolve(__dirname, "./src"),
  publicDirectory: path.resolve(__dirname, "./public"),
  buildDirectory: path.resolve(__dirname, "./dist"),

  assetsDirectoryName: "assets",
  jsDirectoryName: "js",
  cssDirectoryName: "css",
  fontsDirectoryName: "fonts",
  imagesDirectoryName: "images",

  staticDirectoryPath: path.resolve(__dirname, "./static"),
  staticDirectoryName: "static",

  devServerPort: 3001,
  templateName: "index.html"
};
