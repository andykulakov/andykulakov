const Path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    index: ['./src/js/index.js', './src/scss/pages/index.scss'],
    vk: ['@babel/polyfill', './src/js/vk.js', './src/scss/pages/vk.scss']
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      '/public': Path.resolve(__dirname, '/src/public/')
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, './src/index.html'),
      inject: true,
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'vk.html',
      template: Path.resolve(__dirname, './src/vk.html'),
      inject: true,
      chunks: ['vk']
    }),
    new MiniCssExtractPlugin({
      filename: './css/[name].[hash:20].css',
      path: Path.resolve(__dirname, 'dist')
    }),
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, './src/public'), to: './public' }
    ]),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
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
              autoprefixer: {
                browsers: ['last 2 version', '> 2%', 'IE 10']
              },
              plugins: [
                autoprefixer()
              ],
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
    filename: './js/[name].[hash:20].js',
    path: Path.resolve(__dirname, 'dist')
  }
};
