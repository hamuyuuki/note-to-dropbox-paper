import * as path from 'path'
import * as webpack from 'webpack'

const config = {
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  stories: ['../src/**/*.stories.tsx'],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
        },
        // Optional
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        },
      ],
    })
    config.resolve.extensions.push('.ts', '.tsx')

    config.plugins = [
      ...config.plugins,
      new webpack.NormalModuleReplacementPlugin(
        /webextension-polyfill-ts/,
        (resource) => {
          // Gets absolute path to mock `webextension-polyfill-ts` package
          // NOTE: this is required beacuse the `webextension-polyfill-ts`
          // package can't be used outside the environment provided by web extensions
          const absRootMockPath = path.resolve(
            __dirname,
            '../src/__mocks__/webextension-polyfill-ts.ts'
          )

          // Updates the `resource.request` to reference our mocked module instead of the real one
          resource.request = absRootMockPath
        }
      ),
    ]

    return config
  },
}

export default config
