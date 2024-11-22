const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js', // Entry point for your code
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'custom-gauge-card.js', // Output file name
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Support for React and modern JS
          },
        },
      },
    ],
  },
};