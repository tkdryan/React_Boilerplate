const path = require('path');

//webpack.config.js file creates bundle.js file to be served in production environment
module.exports = {
  entry: {
    app: './src/index.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    hot: true,
    publicPath: '/build/',
    proxy: {
      '/':
      {
        target: 'http://localhost:3000',
        secure: false
      }
    },
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(css)|(scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|otf|jpg|gif)$/,
        use: ['url-loader?limit=10000']
      },
    ]
  }
};