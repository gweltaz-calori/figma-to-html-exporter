const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");
const userConfig = require("../user.config");

module.exports = {
  entry: ["babel-polyfill", userConfig.entryPoint],
  output: {
    path: userConfig.buildDirectory,
    filename: `${userConfig.assetsDirectoryName}/${
      userConfig.jsDirectoryName
    }/${userConfig.bundleName}`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },

      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: `${userConfig.assetsDirectoryName}/${
                userConfig.imagesDirectoryName
              }/[name].[ext]`,
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|otf|woff2?)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: `${userConfig.assetsDirectoryName}/${
                userConfig.fontsDirectoryName
              }/[name].[ext]`,
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      "@": userConfig.srcDirectory
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${userConfig.publicDirectory}/${userConfig.templateName}`,
      inject: true,
      filename: "index.html",
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ]
};
