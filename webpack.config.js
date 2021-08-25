const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// export
module.exports = {
  // 파일을 읽어들이기 시작하는 진입점 설정
  entry: {
    makeHeader: './JS/Board/makeHeader.js',
    makePost: './JS/Board/makePost.js',
    makePostUI: './JS/Board/makePostUI.js',
    loginController: './JS/Header/loginController.js',
    Header: './JS/Header/Header.js',
    createAndUpdatePost: './JS/Board/createAndUpdatePost.js',
    detailBoard: './JS/Board/detailBoard.js',
    index: './JS/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js/,
        use: ['babel-loader'],
      },
    ],
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플로그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
    new HtmlPlugin({
      template: './HTML/Board/detailBoard.html',
      filename: 'detailBoard.html',
    }),
    new HtmlPlugin({
      template: './HTML/createboard.html',
      filename: 'createboard.html',
    }),
    new CopyPlugin({
      patterns: [{ from: 'static' }],
    }),
  ],

  devServer: {
    host: 'localhost',
  },
};
