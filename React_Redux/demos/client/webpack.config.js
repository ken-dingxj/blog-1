const path = require('path');
const root = __dirname;
console.log('--------------', root);
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
//const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // entries
  entry: [
    "react-hot-loader/patch",
    path.resolve(root, 'src/main.jsx')
  ],
  mode:'development',
  // output
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(root, 'dist'),
    devtoolModuleFilenameTemplate: './[resource-path]'
  },
  resolve: {
    modules: [path.resolve(root, "src"), "node_modules"],
    extensions: [".js", ".jsx"]
  },
  devtool: 'source-map',
  // loaders
  module: {
    rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['react', 'es2015']
          }
        },
        {
          test: /\.(s)?css$/,
          exclude: /node_modules/,
          loader: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "sass-loader"
          ]
        },
        { test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, loader: "file-loader" }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Demo',
      template: path.resolve(root, 'template.html')
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })//,
    //commonsPlugin
  ],
  optimization: {
    splitChunks: {
       chunks: 'all',
       name: 'common',
    },
    runtimeChunk: {
      name: 'runtime',
    }
 },
  devServer: {
    hot: true,
    inline: true,
    clientLogLevel: "none",
    port: 666
  }
}