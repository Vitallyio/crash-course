const webpack = require('webpack');
const path = require('path');

const src = path.resolve(__dirname, './src');
const node_modules = path.resolve(__dirname, './node_modules');

// Webpack config for local web development
export default {
  devtool: 'source-map',
  context: src,
  resolve: {
    modules: [
      src,
      node_modules
    ],
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      // We need to also tell Webpack what the 'Interfaces/' import prefix
      // means and where it maps to. Again, this is helpful in development,
      // but we won't rely on this in production
      Interfaces: path.resolve(__dirname, '../interfaces/src/')
    }
  },
  target: 'web',
  entry: {
    // note that it reloads the page if hot module reloading fails.
    app: ['./index.tsx', 'webpack-hot-middleware/client?reload=true']
  },
  output: {
    path: path.resolve(__dirname, './dist'), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: node_modules,
        use: ['awesome-typescript-loader']
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre'
      }
    ]
  }
};
