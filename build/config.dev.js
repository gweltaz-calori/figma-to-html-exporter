const express = require("express");
const path = require("path");
const baseConf = require("./config.base");
const userConfig = require("../user.config");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
  mode: "development",
  ...baseConf,
  module: {
    rules: [
      ...baseConf.module.rules,
      {
        test: /\.(s)?css$|\.sass$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              minimize: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              minimize: true
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: userConfig.publicDirectory,
    watchContentBase: true,
    compress: true,
    port: userConfig.devServerPort,
    before: function(app) {
      app.use(
        `/${userConfig.staticDirectoryName}`,
        express.static(userConfig.staticDirectoryPath)
      );
    }
  },
  plugins: baseConf.plugins
};

module.exports = config;
