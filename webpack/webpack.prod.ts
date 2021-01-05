import * as webpack from 'webpack'
import webpackMerge from 'webpack-merge'
import commonConfig from './webpack.common'

const config: webpack.Configuration = webpackMerge(commonConfig, {
  mode: 'production',
})

export default config
