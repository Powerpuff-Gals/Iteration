const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './client/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    // publicPath: '/',
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env', '@babel/preset-react'
              ],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'client'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset'
      },
      {
        test: /\.(mov|mp4)$/,
        type: 'asset'
      },    
    ],   
  },
   
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, 'build'),
      publicPath: '/build',
    },    
    port: 8080,
    proxy:[
      {
        context: ['/'],
        target: 'http://localhost:3000'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: '/client/index.html',

    }),
    new Dotenv()
  ]
};

