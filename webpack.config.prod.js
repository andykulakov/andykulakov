const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.config.common.js");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
});
