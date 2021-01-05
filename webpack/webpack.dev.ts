import * as webpack from 'webpack'
import webpackMerge from 'webpack-merge'
import commonConfig from './webpack.common'

const config: webpack.Configuration = webpackMerge(commonConfig, {
  devtool: 'inline-source-map',
  mode: 'development',
  watchOptions: {
    ignored: /node_modules/,
  },
})

export default config
