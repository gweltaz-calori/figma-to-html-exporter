const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const autoprefixer = require("autoprefixer");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const baseConf = require("./config.base");
const userConfig = require("../user.config");

const config = {
  mode: "production",
  ...baseConf,
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false
          },
          output: {
            comments: false
          }
        }
      })
    ]
  },
  module: {
    rules: [
      ...baseConf.module.rules,
      {
        test: /\.(s)?css$|\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: function() {
                  return [
                    autoprefixer("last 10 versions", "Firefox >= 18", "ie 10")
                  ];
                }
              }
            },
            {
              loader: "sass-loader",
              options: {
                minimize: true
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: `${userConfig.assetsDirectoryName}/${
        userConfig.cssDirectoryName
      }/style.css`
    }),
    new CopyWebpackPlugin([
      {
        from: userConfig.staticDirectoryPath,
        to: path.resolve(
          __dirname,
          `../dist/${userConfig.staticDirectoryName}`
        ),
        ignore: [".*"]
      }
    ]),

    ...baseConf.plugins
  ]
};

module.exports = config;
