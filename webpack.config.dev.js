const merge = require("webpack-merge");
const common = require("./webpack.config.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    host: "0.0.0.0",
    port: 3000,
    disableHostCheck: true,
  },
});
