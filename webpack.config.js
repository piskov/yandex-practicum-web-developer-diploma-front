const isDev = process.env.NODE_ENV === 'development';

const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {
  entry: {
    index: './src/index.js',
    saved: './src/saved.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].[chunkhash].js'
  },
  devServer: {
    historyApiFallback: {
      index: 'index.html',
      rewrites: [
        { from: /\/saved/, to: '/saved.html' }
      ]
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg|ico)$/,
        exclude: [
          path.resolve(__dirname, "src/favicons")
        ],
        use: [
          'file-loader?name=./images/[name].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true,
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              }
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg|ico)$/,
        exclude: [
          path.resolve(__dirname, "src/images")
        ],
        loader: 'file-loader?name=./favicons/[name].[ext]'
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/saved.html',
      filename: 'saved.html'
    }),
    new MiniCssExtractPlugin({
      filename: './css/[name].[contenthash].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/favicons/browserconfig.xml',
      filename: 'browserconfig.xml'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/favicons/site.webmanifest',
      filename: 'site.webmanifest'
    }),
    new HtmlWebpackPlugin({
      template: './src/favicons/android-chrome-192x192.png',
      filename: './favicons/android-chrome-192x192.png'
    }),
    new HtmlWebpackPlugin({
      template: './src/favicons/android-chrome-512x512.png',
      filename: './favicons/android-chrome-512x512.png'
    }),

    new HtmlWebpackPlugin({
      template: './src/favicons/mstile-70x70.png',
      filename: './favicons/mstile-70x70.png'
    }),
    new HtmlWebpackPlugin({
      template: './src/favicons/mstile-144x144.png',
      filename: './favicons/mstile-144x144.png'
    }),
    new HtmlWebpackPlugin({
      template: './src/favicons/mstile-150x150.png',
      filename: './favicons/mstile-150x150.png'
    }),
    new HtmlWebpackPlugin({
      template: './src/favicons/mstile-310x150.png',
      filename: './favicons/mstile-310x150.png'
    }),
    new HtmlWebpackPlugin({
      template: './src/favicons/mstile-310x310.png',
      filename: './favicons/mstile-310x310.png'
    }),

    new WebpackMd5Hash(),
  ]
}
