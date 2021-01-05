import copyWebpackPlugin from 'copy-webpack-plugin'
import * as path from 'path'
import * as webpack from 'webpack'

const srcDir = '../src/'
const config: webpack.Configuration = {
  entry: {
    popup: path.join(__dirname, srcDir + 'popup.tsx'),
    background: path.join(__dirname, srcDir + 'background.ts'),
  },
  output: {
    path: path.join(__dirname, '../dist/js'),
    filename: '[name].js',
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|png|svg|ttf|woff2?)$/,
        loader: 'url-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    // exclude locale files in moment
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new copyWebpackPlugin({
      patterns: [{ from: '.', to: '../', context: 'public' }],
    }),
  ],
}

export default config
