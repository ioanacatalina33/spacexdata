const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx', // Entry point (TypeScript file)
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'], // this will make imports relative to the 'src' folder
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Add .ts and .tsx to resolve
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Match .ts and .tsx files
        exclude: /node_modules/,
        use: 'ts-loader', // Use TypeScript loader
      },
      {
        test: /\.css$/, // For CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath: 'images/', // Where images will be outputted
              publicPath: '/images/', // Public URL for images
            },
          },
          {
            loader: 'image-webpack-loader', // Then image-webpack-loader for optimization
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65, // Adjust the quality for JPEGs
              },
              optipng: {
                enabled: false, // You can disable certain optimizers if not needed
              },
              pngquant: {
                quality: [0.65, 0.9], // Minimize PNGs
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
            },
          },
        ],
      },
    ],
  },
  devServer: {
    static: {
      // Replace contentBase with static
      directory: path.resolve(__dirname, 'public'),
    },
    hot: true, // Enable Hot Module Replacement (HMR)
    open: true, // Open the browser automatically
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Create HTML from template
    }),
  ],
};
