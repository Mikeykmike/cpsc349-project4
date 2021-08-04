const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  output: {
    clean: true
  },
  entry:{
    post: path.resolve(__dirname, './src/post.js'),
    home: path.resolve(__dirname, './src/home.js'),
    public: path.resolve(__dirname, './src/public.js'),
    user: path.resolve(__dirname, './src/user.js'),
    index: path.resolve(__dirname, './src/index.js'),
    about: path.resolve(__dirname, './src/aboutus.js')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'aboutus.html',
      template: path.resolve(__dirname, 'src/aboutus.html'),
      chunks: ['about']
    }),
    new HtmlWebpackPlugin({
      filename: 'home.html',
      template: path.resolve(__dirname, 'src/home.html'),
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      filename: 'post.html',
      template: path.resolve(__dirname, 'src/post.html'),
      chunks: ['post']
    }),
    new HtmlWebpackPlugin({
      filename: 'public.html',
      template: path.resolve(__dirname, 'src/public.html'),
      chunks: ['public']
    }),
    new HtmlWebpackPlugin({
      filename: 'user.html',
      template: path.resolve(__dirname, 'src/user.html'),
      chunks: ['user']
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/i,
        loader: 'standard-loader',
        options: {
          env: {
            browser: true
          }
        }
      }
    ]
  },
  mode: 'development',
  devtool: 'inline-source-map',
}
