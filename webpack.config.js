const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')


module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/main.js')
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.join(__dirname, 'build')
  },
  devServer: {
    contentBase: path.resolve(__dirname, './build'),
    port: 8080,
    open: true,
    compress: true,
    hot: true
  },
  module: {
    rules: [

    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['./build']),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      title: 'webpack study',
      hash: true,
      chunks: ['index'],
      // minify: {
      //   removeAttributeQuotes: true,  // 删除引号
      //   collapseWhitespace: true,  // 折叠
      // }
    }),
  ],
  mode: 'development',
  resolve: {

  }
}