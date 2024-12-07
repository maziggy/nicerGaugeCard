module.exports = {
  mode: 'production',
  entry: './src/index.js', // Entry point for your code
  output: {
    path: __dirname,
    filename: 'nicer-gauge-card.js', // Output file name
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