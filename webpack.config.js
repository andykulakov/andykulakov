const Path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: [
    './src/js/index.js',
    './src/scss/index.scss'
  ],
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, './src/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: './css/style.bundle.css'
    }),
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, './src/public'), to: './public' }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: Path.resolve(__dirname, 'src/js'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.s?css/i,
        use : [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              // minimize: true,
              url: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer()
              ],
              // config: {
              //   path: 'postcss.config.js'
              // },
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: './js/bundle.js'
  }
};
